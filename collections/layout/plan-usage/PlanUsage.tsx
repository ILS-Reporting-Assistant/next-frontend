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
  StyledRefreshIcon,
  StyledReportsUsed,
  StyledResetInfo,
  StyledResetInfoContainer,
  StyledViewAllButton,
  StyledViewAllButtonContainer,
} from './elements'

import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { usePlanUsage } from './PlanUsageContext'

export const PlanUsage: React.FC<PlanUsageProps> = ({ isCollapsed = false }) => {
  const router = useRouter()
  const { reportsUsed, totalReports, isLoading, refresh } = usePlanUsage()
  const percentUsed = totalReports > 0 ? (reportsUsed / totalReports) * 100 : 0
  const resetDate = 'Nov 30, 2025'

  const handleViewAllPlans = () => {
    router.push(`${ROUTE.ACCOUNT_SETTING}?tab=subscription`)
  }

  const handleRefresh = () => {
    refresh()
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
          Starter Plan
        </StyledPlanTitle>
        <StyledRefreshIcon onClick={handleRefresh} style={{ cursor: 'pointer' }}>
          {isLoading ? <Icon.LoadingOutlined spin /> : <Icon.SyncOutlined />}
        </StyledRefreshIcon>
      </StyledPlanHeader>

      <StyledReportsUsed>
        Reports Used {reportsUsed}/{totalReports}
      </StyledReportsUsed>
      <StyledProgressContainer>
        <Progress percent={percentUsed} showInfo={false} strokeColor="#fff" trailColor="rgba(255, 255, 255, 0.3)" />
      </StyledProgressContainer>

      <StyledResetInfo>
        <StyledResetInfoContainer>
          <StyledCalendarIcon>
            <Icon.CalendarOutlined />
          </StyledCalendarIcon>
          <span>Resets: {resetDate}</span>
        </StyledResetInfoContainer>
        <StyledActiveChip>Active</StyledActiveChip>
      </StyledResetInfo>

      <StyledViewAllButtonContainer>
        <StyledViewAllButton type="default" block onClick={handleViewAllPlans}>
          View All Plans
        </StyledViewAllButton>
      </StyledViewAllButtonContainer>
    </StyledPlanUsageContainer>
  )
}
