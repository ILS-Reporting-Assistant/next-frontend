import { CreditCardOutlined, DollarOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Spacer, TabPane } from '@app/components'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { StyledContainer, StyledTabLabel, StyledTabs, StyledTitle } from './elements'
import { ChangePasswordTab } from './change-password'
import { MyProfileTab } from './my-profile'
import { PaymentMethodsTab } from './payment-methods'
import { SubscriptionPlansTab } from './subscription-plans'

export const AccountSetting: React.FC = () => {
  const router = useRouter()
  const { tab } = router.query
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (tab === 'subscription') {
      setActiveTab('subscription')
    } else if (tab === 'payment') {
      setActiveTab('payment')
    } else if (tab === 'profile') {
      setActiveTab('profile')
    } else if (tab === 'password') {
      setActiveTab('password')
    }
  }, [tab])

  return (
    <StyledContainer>
      <StyledTitle >Account</StyledTitle>
      <Spacer value={16} />
      <StyledTabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <StyledTabLabel>
              <UserOutlined />
              My Profile
            </StyledTabLabel>
          }
          key="profile"
        >
          <MyProfileTab />
        </TabPane>
        <TabPane
          tab={
            <StyledTabLabel>
              <LockOutlined />
              Change Password
            </StyledTabLabel>
          }
          key="password"
        >
          <ChangePasswordTab />
        </TabPane>
        <TabPane
          tab={
            <StyledTabLabel>
              <DollarOutlined />
              Subscription Plans
            </StyledTabLabel>
          }
          key="subscription"
        >
          <SubscriptionPlansTab />
        </TabPane>
        <TabPane
          tab={
            <StyledTabLabel>
              <CreditCardOutlined />
              Payment Methods
            </StyledTabLabel>
          }
          key="payment"
        >
          <PaymentMethodsTab />
        </TabPane>
        
      </StyledTabs>
    </StyledContainer>
  )
}

