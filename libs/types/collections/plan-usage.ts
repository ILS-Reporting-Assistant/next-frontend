import { Plan, SubscriptionUsage } from '../api'

export interface PlanUsageProps {
  isCollapsed?: boolean
}

export interface MonthlyPlansProps {
  plans: Plan[]
  addons?: Plan[]
  isLoading?: boolean
  usage?: SubscriptionUsage | null
  organizationId?: string
  onPlanSwitch?: () => void
  onPaymentMethodRequired?: (retryFn: () => Promise<void>) => void
}
