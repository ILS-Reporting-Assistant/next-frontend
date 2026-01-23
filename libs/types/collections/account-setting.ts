import { ECardBrand } from '@app/enums'

/**
 * Feature item for plan cards
 */
export interface PlanFeature {
  text: string
}

/**
 * Props for the PlanCard component
 */
export interface PlanCardProps {
  title: string
  price: string
  description: string
  buttonText: string
  priceSubText: string
  buttonType?: 'primary' | 'default'
  features: PlanFeature[]
  isPopular?: boolean
  onButtonClick?: () => void
  disabled?: boolean
  loading?: boolean
  isDanger?: boolean
  isActive?: boolean
}

/**
 * Props for the PaymentMethodCard component
 */
export interface PaymentMethodCardProps {
  cardholderName: string
  cardNumber: string
  expiryDate: string
  cardBrand: ECardBrand
  isDefault?: boolean
  onEdit?: () => void
  onSetAsDefault?: () => void
  onRemove?: () => void
}

/**
 * Billing period type
 */
export type BillingPeriod = 'monthly' | 'annually'

/**
 * Props for the Plans component
 */
export interface PlansProps {
  billingPeriod: BillingPeriod
}
