import { Col, Form, Input, Notification, Row, useForm } from '@app/components'
import { AddPaymentMethodModalProps } from '@app/types'
import React from 'react'
import {
  StyledModalButton,
  StyledModalContent,
  StyledModalFooter,
  StyledModalFormItem,
} from './elements'

export const AddPaymentMethodModal: React.FC<AddPaymentMethodModalProps> = ({
  open,
  onCancel,
  onSuccess,
}) => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleCancel = () => {
    form.resetFields()
    onCancel()
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const values = await form.validateFields()
      
      Notification({
        message: 'Success',
        description: 'Payment method added successfully',
        type: 'success',
      })
      
      form.resetFields()
      onSuccess()
    } catch (error) {
      Notification({
        message: 'Unable to process request',
        description: 'Unable to process request',
        type: 'error',
      })
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <StyledModalContent
      open={open}
      title="Add Payment Method"
      onCancel={handleCancel}
      footer={null}
      width={572}
      centered
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row>
          <Col span={24}>
            <StyledModalFormItem
              label="Name on card*"
              name="cardholderName"
              rules={[{ required: true, message: 'Please enter name on card' }]}
            >
              <Input  placeholder="Enter name" />
            </StyledModalFormItem>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <StyledModalFormItem
              label="Card Number*"
              name="cardNumber"
              rules={[
                { required: true, message: 'Please enter card number' },
                { pattern: /^[\d\s]{13,19}$/, message: 'Please enter a valid card number' },
              ]}
            >
              <Input
                placeholder="Enter card number"
                maxLength={19}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value)
                  form.setFieldsValue({ cardNumber: formatted })
                }}
              />
            </StyledModalFormItem>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col span={8}>
            <StyledModalFormItem
              label="Expiration Date*"
              name="expiryDate"
              rules={[
                { required: true, message: 'Please enter expiration date' },
                { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Please enter valid date (MM/YY)' },
              ]}
            >
              <Input
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) => {
                  const formatted = formatExpiryDate(e.target.value)
                  form.setFieldsValue({ expiryDate: formatted })
                }}
              />
            </StyledModalFormItem>
          </Col>
          <Col span={8}>
            <StyledModalFormItem
              label="Security Code*"
              name="cvc"
              rules={[
                { required: true, message: 'Please enter security code' },
                { pattern: /^\d{3,4}$/, message: 'Please enter valid CVC' },
              ]}
            >
              <Input placeholder="CVC" maxLength={4} type="password" />
            </StyledModalFormItem>
          </Col>
          <Col span={8}>
            <StyledModalFormItem
              label="Zip Code*"
              name="zipCode"
              rules={[{ required: true, message: 'Please enter zip code' }]}
            >
              <Input placeholder="Zip code" />
            </StyledModalFormItem>
          </Col>
        </Row>

        <StyledModalFooter>
          <StyledModalButton type="primary" htmlType="submit" loading={isSubmitting} block>
            Add Payment Method
          </StyledModalButton>
        </StyledModalFooter>
      </Form>
    </StyledModalContent>
  )
}

