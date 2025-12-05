import { Col, Notification, Spacer, useForm } from '@app/components'
import { FORGOT_PASSWORD_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { authService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { CompanyLogo } from '~public'
import { StyledContainer, StyledFieldsCol, StyledLoginBox, StyledRightCol, StyledRow, StyledTitle } from './elements'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTE } from '@app/data'

export const ForgotPassword: React.FC = () => {
  const [form] = useForm()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sendResetEmail = async (email: string) => {
    setIsSubmitting(true)
    try {
      const response = await authService.requestPasswordReset({
        email: email,
      })

      Notification({
        message: response?.message || 'Password reset link sent',
        type: 'success',
      })
      form.resetFields()
      router.push(ROUTE.AUTH.SIGN_IN)
    } catch (error) {
      Notification({
        message: 'Unable to process request',
        description: extractErrorMessage(error),
        type: 'error',
      })
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFormSubmit = async () => {
    try {
      const data = await form.validateFields()
      await sendResetEmail(data.email)
    } catch (error) {
      if (isValidationError(error)) return
    }
  }

  return (
    <StyledContainer gutter={[0, 0]}>
      <Col span={12} xs={24} sm={24} md={24} lg={12}>
        <StyledFieldsCol>
          <Spacer value={35} />
          <CompanyLogo height={100} />
          <Spacer value={50} />
          <StyledLoginBox>
            <StyledRow>
              <StyledTitle level={3}>Reset Your Password</StyledTitle>
            </StyledRow>
            <DynamicForm
              fields={FORGOT_PASSWORD_FORM}
              form={form}
              onSubmit={handleFormSubmit}
              isLoading={isSubmitting}
            />
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12} />
    </StyledContainer>
  )
}
