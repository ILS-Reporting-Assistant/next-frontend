import { Box, Col, Notification, Radio, RadioGroup, Spacer, Text, useForm } from '@app/components'
import { ROUTE } from '@app/data'
import { SIGN_UP_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { login, setCurrentOrganization } from '@app/redux'
import { authService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CompanyLogo } from '~public'
import {
  OptionCard,
  StyledContainer,
  StyledFieldsCol,
  StyledLoginBox,
  StyledRightCol,
  StyledRow,
  StyledTitle,
} from './elements'
import { AccountType } from '../../../libs/enums'

export const SignUp: React.FC = () => {
  const [form] = useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [accountType, setAccountType] = useState('individual')

  const formFields = useMemo(() => {
    return SIGN_UP_FORM.filter((field) => {
      // Filter out hidden fields based on account type
      if (accountType === AccountType.INDIVIDUAL) {
        if (field.name === 'orgName' || field.name === 'address') {
          return false
        }
      }
      return true
    }).map((field) => {
      // Update labels based on account type
      if (accountType === AccountType.INDIVIDUAL) {
        if (field.name === 'email') {
          return { ...field, label: 'Email*' }
        }
        if (field.name === 'firstName') {
          return { ...field, label: 'First Name*' }
        }
        if (field.name === 'lastName') {
          return { ...field, label: 'Last Name*' }
        }
      } else {
        // Organization account type
        if (field.name === 'email') {
          return { ...field, label: "Contact Person's Email*" }
        }
        if (field.name === 'firstName') {
          return { ...field, label: 'First Name*' }
        }
        if (field.name === 'lastName') {
          return { ...field, label: 'Last Name*' }
        }
        // Show orgName and address for organization
        if (field.name === 'orgName' || field.name === 'address') {
          return { ...field, hidden: false }
        }
      }
      return field
    })
  }, [accountType])

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true)

      const data = await form.validateFields()

      const { email, firstName, lastName, password, confirmPassword, orgName, address } = data

      // Password validation is handled by form rules, but we keep this as a fallback

      const response = await authService.signUp({
        type: accountType,
        email,
        password,
        firstName,
        lastName,
        ...(accountType === AccountType.ORGANIZATION && { organizationName: orgName }),
        ...(accountType === AccountType.ORGANIZATION && { address: address || '' }),
      })

      const {
        accessToken,
        refreshToken,
        user: { _id, emailAddress, firstName: userFirstName, lastName: userLastName, type, emailVerifiedAt, role },
        userOrganizations,
      } = response.data

      dispatch(
        login({
          accessToken,
          refreshToken,
          email: emailAddress,
          uid: _id,
          firstName: userFirstName,
          lastName: userLastName,
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

      Notification({
        message: 'Account created',
        description: response.message ?? 'Welcome! Your account has been created successfully.',
        type: 'success',
      })

      // Redirect based on email verification status
      if (emailVerifiedAt) {
        router.replace(ROUTE.DASHBOARD)
      } else {
        router.replace(ROUTE.AUTH.VERIFY_ACCOUNT)
      }
    } catch (error: any) {
      if (isValidationError(error)) return
      Notification({
        message: 'Unable to create account',
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
              <StyledTitle level={3}>Create an Account</StyledTitle>
            </StyledRow>

            <Box>
              <Text>Sign up as</Text>
              <RadioGroup
                onChange={(e) => {
                  setAccountType(e.target.value)
                  form.resetFields(['orgName', 'address'])
                }}
                value={accountType}
                style={{ width: '100%' }}
              >
                <OptionCard
                  $selected={accountType === 'individual'}
                  onClick={() => {
                    setAccountType('individual')
                    form.resetFields(['orgName', 'address'])
                  }}
                >
                  <Radio value="individual">
                    <span className="title">Individual</span>
                  </Radio>
                  <div className="subtitle">Create an account for individual use only</div>
                </OptionCard>

                <OptionCard
                  $selected={accountType === 'organization'}
                  onClick={() => {
                    setAccountType('organization')
                    form.resetFields(['orgName', 'address'])
                  }}
                >
                  <Radio value="organization">
                    <span className="title">Organization</span>
                  </Radio>
                  <div className="subtitle">Create an account for an organization</div>
                </OptionCard>
              </RadioGroup>
            </Box>

            <Spacer value={20} />

            <DynamicForm
              fields={formFields}
              form={form}
              onSubmit={handleFormSubmit}
              disabled={isSubmitting}
              isLoading={isSubmitting}
            />
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12}>
        {/* <SignupImage /> */}
      </StyledRightCol>
    </StyledContainer>
  )
}
