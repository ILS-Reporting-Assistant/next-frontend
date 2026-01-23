import { CreditCardOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons'
import { Spacer, TabPane } from '@app/components'
import { AccountType, UserRole } from '@app/enums'
import { IStore } from '@app/redux'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledContainer, StyledTabLabel, StyledTabs, StyledTitle } from './elements'
import { MyProfileTab } from './my-profile'
import { PaymentMethodsTab } from './payment-methods'
import { SubscriptionPlansTab } from './subscription-plans'

export const AccountSetting: React.FC = () => {
  const router = useRouter()
  const { tab } = router.query
  const [activeTab, setActiveTab] = useState('profile')
  const { user } = useSelector((state: IStore) => state)
  const isOrganizationMember =
    user?.type === AccountType.ORGANIZATION &&
    !!user?.currentOrganizationRole &&
    user.currentOrganizationRole !== UserRole.OWNER

  useEffect(() => {
    if (isOrganizationMember && (tab === 'subscription' || tab === 'payment')) {
      setActiveTab('profile')
    } else if (tab === 'subscription') {
      setActiveTab('subscription')
    } else if (tab === 'payment') {
      setActiveTab('payment')
    } else if (tab === 'profile') {
      setActiveTab('profile')
    } else if (tab === 'password') {
      setActiveTab('password')
    }
  }, [isOrganizationMember, tab])

  return (
    <StyledContainer>
      <StyledTitle>Account</StyledTitle>
      <Spacer value={16} />
      <StyledTabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={<StyledTabLabel>My Profile</StyledTabLabel>} icon={<UserOutlined />} key="profile">
          <MyProfileTab />
        </TabPane>
        {/* <TabPane tab={<StyledTabLabel>Change Password</StyledTabLabel>} icon={<LockOutlined />} key="password">
          <ChangePasswordTab />
        </TabPane> */}
        {!isOrganizationMember && (
          <TabPane tab={<StyledTabLabel>Subscription Plans</StyledTabLabel>} icon={<DollarOutlined />} key="subscription">
            <SubscriptionPlansTab />
          </TabPane>
        )}
        {!isOrganizationMember && (
          <TabPane tab={<StyledTabLabel>Payment Methods</StyledTabLabel>} icon={<CreditCardOutlined />} key="payment">
            <PaymentMethodsTab />
          </TabPane>
        )}
      </StyledTabs>
    </StyledContainer>
  )
}
