import React, { useState } from 'react'
import { Form, FormItem, Input, Button, Row, Col, Notification, useForm } from '@app/components'
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { subscriptionsService } from '@app/services'
import { PaymentMethodFormProps, StripeElementState } from '@app/types'
import { StyledStripeElement } from './elements'

export const stripeElementOptions = {
  style: {
    base: {
      fontSize: '14px',
      color: '#000',
      fontWeight: '300',
      '::placeholder': {
        color: '#BFBFBF',
        fontSize: '12px',
        fontWeight: '300',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

export const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ onSuccess, organizationId }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form] = useForm()
  const [cardNumberState, setCardNumberState] = useState<StripeElementState>({ error: null, complete: false })
  const [cardExpiryState, setCardExpiryState] = useState<StripeElementState>({ error: null, complete: false })
  const [cardCvcState, setCardCvcState] = useState<StripeElementState>({ error: null, complete: false })

  const handleSubmit = async (values: any) => {
    if (!stripe || !elements) {
      return
    }

    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    form.setFields([
      { name: 'cardNumber', touched: true },
      { name: 'cardExpiry', touched: true },
      { name: 'cardCvc', touched: true },
    ])

    let hasErrors = false

    if (!cardNumberElement || !cardNumberState.complete || cardNumberState.error) {
      form.setFields([
        {
          name: 'cardNumber',
          errors: [cardNumberState.error || 'Please enter a valid card number'],
          touched: true,
        },
      ])
      hasErrors = true
    }

    if (!cardExpiryElement || !cardExpiryState.complete || cardExpiryState.error) {
      form.setFields([
        {
          name: 'cardExpiry',
          errors: [cardExpiryState.error || 'Please enter a valid expiration date'],
          touched: true,
        },
      ])
      hasErrors = true
    }

    if (!cardCvcElement || !cardCvcState.complete || cardCvcState.error) {
      form.setFields([
        {
          name: 'cardCvc',
          errors: [cardCvcState.error || 'Please enter a valid security code'],
          touched: true,
        },
      ])
      hasErrors = true
    }

    if (hasErrors) {
      return
    }

    setIsSubmitting(true)

    try {
      if (!cardNumberElement) {
        Notification({
          message: 'Error',
          description: 'Please enter card details',
          type: 'error',
        })
        setIsSubmitting(false)
        return
      }

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: values.name,
          address: {
            postal_code: values.zipCode,
          },
        },
      })

      if (error) {
        Notification({
          message: 'Error',
          description: error.message || 'Failed to create payment method',
          type: 'error',
        })
        setIsSubmitting(false)
        return
      }

      if (paymentMethod) {
        await subscriptionsService.createPaymentMethod({
          token: paymentMethod.id,
          ...(organizationId ? { organizationId } : {}),
        })

        Notification({
          message: 'Success',
          description: 'Payment method added successfully',
          type: 'success',
        })

        form.resetFields()
        setCardNumberState({ error: null, complete: false })
        setCardExpiryState({ error: null, complete: false })
        setCardCvcState({ error: null, complete: false })
        onSuccess()
      }
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to add payment method',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCardNumberChange = (event: any) => {
    if (event.error) {
      setCardNumberState({ error: event.error.message, complete: false })
      form.setFields([{ name: 'cardNumber', errors: [event.error.message], touched: true }])
    } else {
      setCardNumberState({ error: null, complete: event.complete })
      if (event.complete) {
        form.setFields([{ name: 'cardNumber', errors: [] }])
      }
    }
  }

  const handleCardExpiryChange = (event: any) => {
    if (event.error) {
      setCardExpiryState({ error: event.error.message, complete: false })
      form.setFields([{ name: 'cardExpiry', errors: [event.error.message], touched: true }])
    } else {
      setCardExpiryState({ error: null, complete: event.complete })
      if (event.complete) {
        form.setFields([{ name: 'cardExpiry', errors: [] }])
      }
    }
  }

  const handleCardCvcChange = (event: any) => {
    if (event.error) {
      setCardCvcState({ error: event.error.message, complete: false })
      form.setFields([{ name: 'cardCvc', errors: [event.error.message], touched: true }])
    } else {
      setCardCvcState({ error: null, complete: event.complete })
      if (event.complete) {
        form.setFields([{ name: 'cardCvc', errors: [] }])
      }
    }
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ name: '', zipCode: '' }}>
      <FormItem name="name" label="Name on card*" rules={[{ required: true, message: 'Please enter name on card' }]}>
        <Input placeholder="Enter name" />
      </FormItem>

      <FormItem
        name="cardNumber"
        label="Card Number*"
        rules={[
          {
            validator: () => {
              if (!cardNumberState.complete || cardNumberState.error) {
                return Promise.reject(new Error(cardNumberState.error || 'Please enter a valid card number'))
              }
              return Promise.resolve()
            },
          },
        ]}
      >
        <StyledStripeElement>
          <CardNumberElement options={stripeElementOptions} onChange={handleCardNumberChange} />
        </StyledStripeElement>
      </FormItem>

      <Row gutter={8}>
        <Col span={8}>
          <FormItem
            name="cardExpiry"
            label="Expiration Date*"
            rules={[
              {
                validator: () => {
                  if (!cardExpiryState.complete || cardExpiryState.error) {
                    return Promise.reject(new Error(cardExpiryState.error || 'Please enter a valid expiration date'))
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <StyledStripeElement>
              <CardExpiryElement options={stripeElementOptions} onChange={handleCardExpiryChange} />
            </StyledStripeElement>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem
            name="cardCvc"
            label="Security Code*"
            rules={[
              {
                validator: () => {
                  if (!cardCvcState.complete || cardCvcState.error) {
                    return Promise.reject(new Error(cardCvcState.error || 'Please enter a valid security code'))
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <StyledStripeElement>
              <CardCvcElement options={stripeElementOptions} onChange={handleCardCvcChange} />
            </StyledStripeElement>
          </FormItem>
        </Col>
        <Col span={8}>
          <FormItem name="zipCode" label="Zip Code*" rules={[{ required: true, message: 'Please enter zip code' }]}>
            <Input placeholder="Zip code" maxLength={10} />
          </FormItem>
        </Col>
      </Row>

      <Button block type="primary" htmlType="submit" loading={isSubmitting}>
        Add Payment Method
      </Button>
    </Form>
  )
}
