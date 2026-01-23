import { Icon, Progress } from '@app/components'
import { PlanUsageProps } from '@app/types'
import {
  StyledActiveChip,
  StyledCalendarIcon,
  StyledCrownIcon,
  StyledPlanHeader,
  StyledPlanTitle,
  StyledPlanUsageContainer,
  StyledProgressContainer,
  StyledReportsUsed,
  StyledResetInfo,
  StyledResetInfoContainer,
  StyledViewAllButton,
  StyledViewAllButtonContainer,
} from './elements'

import { ROUTE } from '@app/data'
import { AccountType, SubscriptionStatus, UserRole } from '@app/enums'
import { IStore } from '@app/redux'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { usePlanUsage } from './PlanUsageContext'

export const PlanUsage: React.FC<PlanUsageProps> = ({ isCollapsed = false }) => {
  const router = useRouter()
  const { user } = useSelector((state: IStore) => state)
  const { reportsUsed, totalReports, clientsUsed, totalClients, usage } = usePlanUsage()

  const isOrganization = user?.type === AccountType.ORGANIZATION

  const isOrganizationMember =
    user?.type === AccountType.ORGANIZATION &&
    !!user?.currentOrganizationRole &&
    user.currentOrganizationRole !== UserRole.OWNER

  const displayValue = isOrganization
    ? totalClients
      ? `${clientsUsed}/${totalClients}`
      : clientsUsed
    : totalReports
    ? `${reportsUsed}/${totalReports}`
    : reportsUsed

  const displayLabel = isOrganization ? 'Active Clients' : 'Reports Used'

  const percentUsed = isOrganization
    ? totalClients && totalClients > 0
      ? (clientsUsed / totalClients) * 100
      : 0
    : totalReports && totalReports > 0
    ? (reportsUsed / totalReports) * 100
    : 0

  const handleViewAllPlans = () => {
    router.push(`${ROUTE.ACCOUNT_SETTING}?tab=subscription`)
  }

  if (isCollapsed) {
    return null
  }

  return (
    <StyledPlanUsageContainer isCollapsed={isCollapsed}>
      <StyledPlanHeader>
        <StyledPlanTitle>
          <StyledCrownIcon>
            <Icon.CrownOutlined />
          </StyledCrownIcon>
          {usage?.plan?.name}
        </StyledPlanTitle>
        {/* <StyledRefreshIcon onClick={handleRefresh} style={{ cursor: 'pointer' }}>
          {isLoading ? <Icon.LoadingOutlined spin /> : <Icon.SyncOutlined />}
        </StyledRefreshIcon> */}
      </StyledPlanHeader>

      <StyledReportsUsed>
        {displayLabel} {displayValue}
      </StyledReportsUsed>
      <StyledProgressContainer>
        <Progress percent={percentUsed} showInfo={false} strokeColor="#fff" trailColor="rgba(255, 255, 255, 0.3)" />
      </StyledProgressContainer>

      <StyledResetInfo>
        <StyledResetInfoContainer>
          <StyledCalendarIcon>
            <Icon.CalendarOutlined />
          </StyledCalendarIcon>
          <span>
            Resets:{' '}
            {usage?.subscription?.periodEnd && moment(usage?.subscription?.periodEnd).isValid()
              ? moment(usage?.subscription?.periodEnd).format('MMM D, YYYY')
              : '-'}
          </span>
        </StyledResetInfoContainer>
        {usage?.subscription?.status === SubscriptionStatus.ACTIVE && <StyledActiveChip>Active</StyledActiveChip>}
        {usage?.subscription?.status === SubscriptionStatus.TRIALING && <StyledActiveChip>Trialing</StyledActiveChip>}
        {usage?.subscription?.status === SubscriptionStatus.CANCELED && <StyledActiveChip>Cancelled</StyledActiveChip>}
      </StyledResetInfo>

      {!isOrganizationMember && (
        <StyledViewAllButtonContainer>
          <StyledViewAllButton type="default" block onClick={handleViewAllPlans}>
            View All Plans
          </StyledViewAllButton>
        </StyledViewAllButtonContainer>
      )}
    </StyledPlanUsageContainer>
  )
}
