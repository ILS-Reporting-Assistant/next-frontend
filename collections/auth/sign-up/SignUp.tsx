import { Col, Notification, Spacer, useForm } from '@app/components'
import { SIGN_UP_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { login } from '@app/redux'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { CompanyLogo } from '~public'
import { StyledContainer, StyledFieldsCol, StyledLoginBox, StyledRightCol, StyledRow, StyledTitle } from './elements'
import { useState } from 'react'

export const SignUp: React.FC = () => {
  const [form] = useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true)

      const data = await form.validateFields()

      const password = data?.password ?? ''
      const reEnterPassword = data?.reEnterPassword ?? ''

      if (password !== reEnterPassword) {
        Notification({
          message: 'Passwords do not match',
          description: 'Please make sure both password fields are identical.',
          type: 'error',
        })
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 600))

      dispatch(
        login({
          accessToken: 'dev-token',
          email: data.email,
          uid: 'dev-uid',
        }),
      )

      Notification({
        message: 'Verification code sent',
        description: 'A verification code has been sent to your email.',
        type: 'success',
      })

      router.replace(ROUTE.AUTH.VERIFY_ACCOUNT)
    } catch (error: any) {
      Notification({
        message: 'Unable to create account',
        description: error?.message || 'Please try again later.',
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
              <StyledTitle level={3}>Create an Account</StyledTitle>
            </StyledRow>
            <Spacer value={35} />

            <DynamicForm fields={SIGN_UP_FORM} form={form} onSubmit={handleFormSubmit} disabled={isSubmitting} />
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12}>
        {/* <SignupImage /> */}
      </StyledRightCol>
    </StyledContainer>
  )
}
