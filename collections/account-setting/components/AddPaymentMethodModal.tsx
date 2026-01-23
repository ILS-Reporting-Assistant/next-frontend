import { Modal, Spin } from '@app/components'
import { AddPaymentMethodModalProps } from '@app/types'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { PaymentMethodForm } from './PaymentMethodForm'

import { StyledCenteredLoader } from './elements'

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({
  open,
  onCancel,
  onSuccess,
  organizationId,
}) => {
  const [stripe, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    const initStripe = async () => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return
      }
      const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      setStripe(stripeInstance)
    }
    initStripe()
  }, [])

  const isLoading = !stripe

  return (
    <Modal title="Add Payment Method" open={open} onCancel={onCancel} footer={null} width={520}>
      {isLoading && (
        <StyledCenteredLoader>
          <Spin />
        </StyledCenteredLoader>
      )}
      {!isLoading && stripe && (
        <Elements stripe={stripe}>
          <PaymentMethodForm onSuccess={onSuccess} organizationId={organizationId} />
        </Elements>
      )}
    </Modal>
  )
}
