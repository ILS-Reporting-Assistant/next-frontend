import React, { useState, useEffect } from 'react'
import { Modal, Form, FormItem, Button, Notification, Input, useForm, Row, Col } from '@app/components'
import { subscriptionsService } from '@app/services'
import { EditPaymentMethodModalProps, EditPaymentMethodFormProps } from '@app/types'

const EditPaymentMethodForm: React.FC<EditPaymentMethodFormProps> = ({
  onSuccess,
  paymentMethodId,
  paymentMethod,
  organizationId,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form] = useForm()

  // Initialize form with current values
  useEffect(() => {
    if (paymentMethod) {
      const currentMonth = paymentMethod.expDate?.split('/')[0] || ''
      const currentYear = paymentMethod.expDate?.split('/')[1] || ''
      // Format month as 2 digits (01-12)
      const formattedMonth = currentMonth ? String(currentMonth).padStart(2, '0') : ''
      // Convert full year to 2-digit year for display
      const currentYear2Digit = currentYear ? String(currentYear).slice(-2) : ''

      form.setFieldsValue({
        name: paymentMethod.name || '',
        exp_month: formattedMonth || undefined,
        exp_year: currentYear2Digit || undefined,
      })
    }
  }, [paymentMethod, form])

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)

    try {
      // Validate form fields
      if (!values.exp_month || !values.exp_year) {
        Notification({
          message: 'Error',
          description: 'Please enter both month and year',
          type: 'error',
        })
        setIsSubmitting(false)
        return
      }

      const exp_month = Number.parseInt(String(values.exp_month), 10)
      const exp_year = 2000 + Number.parseInt(String(values.exp_year), 10)

      if (Number.isNaN(exp_month) || exp_month < 1 || exp_month > 12) {
        Notification({
          message: 'Error',
          description: 'Please enter a valid month',
          type: 'error',
        })
        setIsSubmitting(false)
        return
      }

      const currentDate = new Date()
      const currentYearValue = currentDate.getFullYear()
      const currentMonthValue = currentDate.getMonth() + 1

      if (Number.isNaN(exp_year) || exp_year < currentYearValue || exp_year > currentYearValue + 20) {
        Notification({
          message: 'Error',
          description: 'Please enter a valid expiry year',
          type: 'error',
        })
        setIsSubmitting(false)
        return
      }

      if (exp_year < currentYearValue || (exp_year === currentYearValue && exp_month < currentMonthValue)) {
        Notification({
          message: 'Error',
          description: 'Expiry date cannot be in the past',
          type: 'error',
        })
        setIsSubmitting(false)
        return
      }

      await subscriptionsService.updatePaymentMethod(
        paymentMethodId,
        {
          exp_month,
          exp_year,
          name: values.name,
        },
        organizationId,
      )

      Notification({
        message: 'Success',
        description: 'Payment method updated successfully',
        type: 'success',
      })

      form.resetFields()
      onSuccess()
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to update payment method',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const cardNumber = paymentMethod?.last4Digit ? `**** **** **** ${paymentMethod.last4Digit}` : 'Card Number'

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <FormItem label="Card Number">
        <Input value={cardNumber} disabled style={{ background: '#f5f5f5', cursor: 'not-allowed' }} />
      </FormItem>

      <FormItem name="name" label="Name on card*" rules={[{ required: true, message: 'Please enter name on card' }]}>
        <Input placeholder="Enter name" />
      </FormItem>

      <FormItem label="Expiration Date*" required>
        <Row gutter={8}>
          <Col span={12}>
            <FormItem
              name="exp_month"
              rules={[
                { required: true, message: 'Month required' },
                {
                  pattern: /^(0[1-9]|1[0-2])$/,
                  message: 'Please enter a valid month (01-12)',
                },
              ]}
              noStyle
            >
              <Input placeholder="MM" maxLength={2} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="exp_year"
              rules={[
                { required: true, message: 'Year required' },
                {
                  pattern: /^\d{2}$/,
                  message: 'Please enter a valid 2-digit year (YY)',
                },
              ]}
              noStyle
            >
              <Input placeholder="YY" maxLength={2} />
            </FormItem>
          </Col>
        </Row>
      </FormItem>

      <Button block type="primary" htmlType="submit" loading={isSubmitting}>
        Update Payment Method
      </Button>
    </Form>
  )
}

export const EditPaymentMethodModal: React.FC<EditPaymentMethodModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  paymentMethod,
  organizationId,
}) => {
  if (!paymentMethod) {
    return null
  }

  return (
    <Modal title="Edit Payment Method" open={isOpen} onCancel={onClose} footer={null} width={520}>
      <EditPaymentMethodForm
        onSuccess={onSuccess}
        paymentMethodId={paymentMethod.id}
        paymentMethod={paymentMethod}
        organizationId={organizationId}
      />
    </Modal>
  )
}
