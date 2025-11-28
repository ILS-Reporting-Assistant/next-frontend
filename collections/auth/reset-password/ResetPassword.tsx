import { Col, Notification, Spacer, useForm } from '@app/components'
import { RESET_PASSWORD_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { ROUTE } from '@app/data'
import { authService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CompanyLogo } from '~public'
import { StyledLoginBox, StyledContainer, StyledFieldsCol, StyledRightCol, StyledRow, StyledTitle } from './elements'

export const ResetPassword: React.FC = () => {
  const [form] = useForm()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetToken, setResetToken] = useState<string | null>(null)

  useEffect(() => {
    if (!router.isReady) return

    const queryToken = router.query.token
    const normalizedToken = Array.isArray(queryToken) ? queryToken[0] : queryToken

    if (!normalizedToken) {
      Notification({
        message: 'Invalid or expired link',
        description: 'Your password reset link is invalid or has expired. Please request a new one.',
        type: 'error',
      })
      router.replace(ROUTE.AUTH.SIGN_IN)
      return
    }

    setResetToken(normalizedToken)
  }, [router.isReady, router.query.token, router])

  const resetPassword = async (newPassword: string) => {
    if (!resetToken) {
      Notification({
        message: 'Invalid or expired link',
        description: 'Your password reset link is invalid or has expired. Please request a new one.',
        type: 'error',
      })
      router.replace(ROUTE.AUTH.FORGOT_PASSWORD)
      return
    }

    setIsSubmitting(true)
    try {
      const response = await authService.resetPassword({
        token: resetToken,
        newPassword,
      })

      Notification({
        message: 'Password updated',
        description:
          response.message ??
          'Great! Your password has been reset successfully. You can now log in with your new password.',
        type: 'success',
      })

      router.replace(ROUTE.AUTH.SIGN_IN)
    } catch (error) {
      Notification({
        message: 'Unable to reset password',
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

      if (data.password !== data.confirmPassword) {
        form.setFields([
          {
            name: 'confirmPassword',
            errors: ['Passwords do not match'],
          },
        ])
        return
      }

      await resetPassword(data.password)
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
              <StyledTitle level={3}>Add New Password</StyledTitle>
            </StyledRow>
            <DynamicForm
              fields={RESET_PASSWORD_FORM}
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
