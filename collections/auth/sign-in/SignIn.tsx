import { Col, Notification, Spacer, useForm } from '@app/components'
import { ROUTE } from '@app/data'
import { SIGN_IN_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { login, setCurrentOrganization } from '@app/redux'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { CompanyLogo } from '~public'
import { authService, extractErrorMessage } from '@app/services'
import { StyledContainer, StyledFieldsCol, StyledLoginBox, StyledRightCol, StyledRow, StyledTitle } from './elements'
import { isValidationError } from '@app/utils'

export const SignIn: React.FC = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields()
      setIsSubmitting(true)

      const { email, password } = values

      const response = await authService.login({ email, password })

      const {
        accessToken,
        refreshToken,
        user: { _id, emailAddress, firstName, lastName, type, emailVerifiedAt, role },
        userOrganizations,
      } = response.data

      dispatch(
        login({
          accessToken,
          refreshToken,
          email: emailAddress,
          uid: _id,
          firstName,
          lastName,
          type,
          emailVerifiedAt,
          role,
        }),
      )

      if (userOrganizations) {
        dispatch(
          setCurrentOrganization({ organizationId: userOrganizations.organizationId, role: userOrganizations.role }),
        )
      }

      if (emailVerifiedAt) {
        router.replace(ROUTE.DASHBOARD)
      } else {
        router.replace(ROUTE.AUTH.VERIFY_ACCOUNT)
      }
    } catch (error) {
      if (isValidationError(error)) return
      Notification({
        message: 'Unable to login',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
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
              <StyledTitle level={3}>Login</StyledTitle>
            </StyledRow>

            <DynamicForm
              fields={SIGN_IN_FORM}
              form={form}
              onSubmit={handleFormSubmit}
              disabled={isSubmitting}
              isLoading={isSubmitting}
            />
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12}>
        {/* background image applied via CSS */}
      </StyledRightCol>
    </StyledContainer>
  )
}
