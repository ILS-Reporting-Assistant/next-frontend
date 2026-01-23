export interface PaymentMethod {
  id: string
  name: string
  last4Digit: string
  expDate: string
  cardBrand: string
  isDefault: boolean
}

export interface CreatePaymentMethodPayload {
  token: string
  organizationId?: string
}

export interface CreatePaymentMethodResponse {
  id: string
}

export interface UpdatePaymentMethodPayload {
  exp_month: number
  exp_year: number
  name?: string
}

export interface UpdatePaymentMethodResponse {
  id: string
}

export type SubscriptionPlanPeriod = 'monthly' | 'yearly'

export type AccountType = 'individual' | 'organization'

export interface Plan {
  _id: string
  name: string
  description: string
  planId: string
  active: boolean
  amount: number
  amountDecimal: string
  billingScheme: string
  currency: string
  period: SubscriptionPlanPeriod
  accountType: AccountType
  intervalCount: number
  maxSeat: number
  maxActiveClients: number
  maxReports: number
  features: string[]
  product: {
    productId: string
    active: boolean
    default_price: string
    metadata?: Record<string, any>
    name: string
    type: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface SubscriptionUsage {
  maxSeats: number
  maxActiveClients: number
  maxReports: number
  usedSeats: number
  usedActiveClients: number
  usedReports: number
  totalReports: number
  usedTrialReports: number
  remainingSeats: number
  remainingActiveClients: number
  remainingReports: number
  hasTrialReportsRemaining: boolean
  remainingInitialAssessmentReports: number
  remainingProgressReports: number
  remainingISPReviewReports: number
  isTrialActive: boolean
  plan: Plan
  extraSeats?: number
  extraActiveClients?: number
  subscription: {
    _id: string
    user: string
    plan: string
    stripePlanId: string
    periodEnd: string
    periodStart: string
    subscription: string
    status: string
    cancelAtPeriodEnd: boolean
    usedSeat: number
    usedActiveClients: number
    usedReports: number
    usedTrialReports: number
    extraSeats: number
    extraActiveClients: number
    createdAt: string
    updatedAt: string
  }
}
