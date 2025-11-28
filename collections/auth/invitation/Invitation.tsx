import { Button, Col, Form, FormItem, InputPassword, Notification, Spacer, Text, useForm } from '@app/components'
import { ROUTE } from '@app/data'
import { INVITATION_FORM } from '@app/forms'
import { EDynamicFormField } from '@app/modules'
import { login, setCurrentOrganization } from '@app/redux'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CompanyLogo } from '~public'
import { usersService, extractErrorMessage } from '@app/services'
import {
  StyledContainer,
  StyledFieldsCol,
  StyledLoginBox,
  StyledRightCol,
  StyledRow,
  StyledTitle,
} from '../sign-in/elements'
import { StyledVerifyingBox } from './elements'
import { isValidationError } from '@app/utils'
import { InvitationData, InvitationFormValues } from '@app/types'
import { Spin } from 'antd'

export const Invitation: React.FC = () => {
  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [invitationData, setInvitationData] = useState<InvitationData | null>(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const { token } = router.query

  useEffect(() => {
    if (token && typeof token === 'string') {
      verifyToken(token)
    }
  }, [token])

  const verifyToken = async (invitationToken: string) => {
    try {
      setIsVerifying(true)
      const response = await usersService.verifyInvitation(invitationToken)
      setInvitationData(response.data)
    } catch (error: any) {
      Notification({
        message: 'Invalid Invitation',
        description: extractErrorMessage(error),
        type: 'error',
      })
      router.replace(ROUTE.AUTH.SIGN_IN)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleFormSubmit = async () => {
    if (!token || typeof token !== 'string') return

    try {
      const values = (await form.validateFields()) as InvitationFormValues
      setIsSubmitting(true)

      const { password, confirmPassword } = values

      if (password !== confirmPassword) {
        Notification({
          message: 'Passwords do not match',
          description: 'Please make sure both password fields are identical.',
          type: 'error',
        })
        return
      }

      const response = await usersService.completeInvitation({
        token,
        password,
        firstName: invitationData?.firstName,
        lastName: invitationData?.lastName,
      })

      const {
        accessToken,
        refreshToken,
        user: { _id, emailAddress, firstName, lastName, type, emailVerifiedAt, role },
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

      // Get organization from invitation data
      if (invitationData?.organization?._id) {
        dispatch(
          setCurrentOrganization({
            organizationId: invitationData.organization._id,
            role: role,
          }),
        )
      }

      Notification({
        message: 'Invitation Accepted',
        description: 'Your account has been set up successfully. You can now access your dashboard.',
        type: 'success',
      })

      router.replace(ROUTE.DASHBOARD)
    } catch (error: any) {
      if (isValidationError(error)) return
      Notification({
        message: 'Unable to complete invitation',
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
              <StyledTitle level={3}>Complete Your Invitation</StyledTitle>
            </StyledRow>
            {isVerifying ? (
              <StyledVerifyingBox>
                <Spin size="large" />
                <Spacer value={16} />
              </StyledVerifyingBox>
            ) : invitationData ? (
              <>
                {invitationData.organization && (
                  <>
                    <Spacer value={16} />
                    <Text>You've been invited to join {invitationData.organization.name}</Text>
                    <Spacer value={16} />
                  </>
                )}
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                  {INVITATION_FORM.filter((field) => field.type !== EDynamicFormField.PRIMARY_BUTTON).map((field) => (
                    <FormItem
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      dependencies={field.name === 'confirmPassword' ? ['password'] : undefined}
                      rules={field.rules}
                    >
                      <InputPassword placeholder={field.placeholder} />
                    </FormItem>
                  ))}

                  <FormItem>
                    <Button type="primary" htmlType="submit" loading={isSubmitting} block>
                      {INVITATION_FORM.find((field) => field.type === EDynamicFormField.PRIMARY_BUTTON)?.title ||
                        'Complete Invitation'}
                    </Button>
                  </FormItem>
                </Form>
              </>
            ) : null}
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12}>
        {/* background image applied via CSS */}
      </StyledRightCol>
    </StyledContainer>
  )
}
