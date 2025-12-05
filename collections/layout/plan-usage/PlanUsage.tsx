import { Icon, Progress } from '@app/components'
import { PlanUsageProps } from '@app/types'
import { StyledActiveChip, StyledCalendarIcon, StyledCrownIcon, StyledPlanHeader, StyledPlanTitle, StyledPlanUsageContainer, StyledProgressContainer, StyledRefreshIcon, StyledReportsCount, StyledReportsUsed, StyledResetInfo, StyledResetInfoContainer, StyledViewAllButton, StyledViewAllButtonContainer } from './elements'

import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'

export const PlanUsage: React.FC<PlanUsageProps> = ({ isCollapsed = false }) => {
  const router = useRouter()
  const reportsUsed = 2
  const totalReports = 5
  const percentUsed = (reportsUsed / totalReports) * 100
  const resetDate = 'Nov 30, 2025'

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
          Starter Plan
        </StyledPlanTitle>
        <StyledRefreshIcon>
          <Icon.SyncOutlined />
        </StyledRefreshIcon>
      </StyledPlanHeader>

      <StyledReportsUsed>Reports Used</StyledReportsUsed>
      <StyledProgressContainer>
        <Progress percent={percentUsed} showInfo={false} strokeColor="#fff" trailColor="rgba(255, 255, 255, 0.3)" />
        {/* <StyledReportsCount>
          {reportsUsed}/{totalReports}
        </StyledReportsCount> */}
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
