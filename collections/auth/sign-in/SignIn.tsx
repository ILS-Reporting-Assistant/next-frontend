import { Col, Notification, Spacer, useForm } from '@app/components'
import { SIGN_IN_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { login } from '@app/redux'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { CompanyLogo } from '~public'
import { StyledContainer, StyledFieldsCol, StyledLoginBox, StyledRightCol, StyledRow, StyledTitle } from './elements'

export const SignIn: React.FC = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true)

      const values = await form.validateFields()
      const { email, password } = values

      await new Promise((resolve) => setTimeout(resolve, 500))
      if (!email || !password) {
        throw new Error('Invalid credentials')
      }

      dispatch(
        login({
          accessToken: 'dev-token',
          email,
          uid: 'dev-uid',
        }),
      )

      Notification({
        message: 'Logged in',
        description: 'Welcome back!',
        type: 'success',
      })

      router.push(ROUTE.DASHBOARD)
    } catch (error: any) {
      Notification({
        message: 'Login failed',
        description: error?.message || 'Please check your credentials and try again.',
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
            <Spacer value={35} />

            <DynamicForm fields={SIGN_IN_FORM} form={form} onSubmit={handleFormSubmit} disabled={isSubmitting} />
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12}>
        {/* background image applied via CSS */}
      </StyledRightCol>
    </StyledContainer>
  )
}
