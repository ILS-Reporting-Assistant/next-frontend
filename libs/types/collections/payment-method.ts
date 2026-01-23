import { PaymentMethod } from '../api/subscriptions'

export interface AddPaymentMethodModalProps {
  open: boolean
  onCancel: () => void
  onSuccess: () => void
  organizationId?: string
}

export interface PaymentMethodFormProps {
  onSuccess: () => void
  organizationId?: string
}

export interface StripeElementState {
  error: string | null
  complete: boolean
}

export interface EditPaymentMethodFormProps {
  onSuccess: () => void
  paymentMethodId: string
  paymentMethod: PaymentMethod
  organizationId?: string
}

export interface EditPaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  paymentMethod: PaymentMethod
  organizationId?: string
}
