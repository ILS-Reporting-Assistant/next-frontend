import { Box, Col, Notification, Progress, Radio, RadioGroup, Spacer, Text, useForm } from '@app/components'
import { ROUTE } from '@app/data'
import { SIGN_UP_FORM } from '@app/forms'
import { DynamicForm, EDynamicFormField } from '@app/modules'
import { login, setCurrentOrganization } from '@app/redux'
import { authService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
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
  StyledProgressBarWrapper,
  StyledStepText,
  StyledStepContentWrapper,
  StyledButtonWrapper,
  StyledGoBackButton,
  StyledNextButton,
  StyledNavigationBox,
} from './elements'
import { AccountType } from '../../../libs/enums'

export const SignUp: React.FC = () => {
  const [form] = useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [accountType, setAccountType] = useState('individual')
  const [currentStep, setCurrentStep] = useState(1)
  const [formValues, setFormValues] = useState<Record<string, any>>({}) // Store all form values
  const totalSteps = accountType === AccountType.ORGANIZATION ? 4 : 3
  const progressPercent = (currentStep / totalSteps) * 100

  useEffect(() => {
    if (currentStep > 1) {
      const stepFields = getStepFields()
      if (stepFields.length > 0) {
        const stepFieldNames = stepFields.map((field) => field.name)
        const stepValues: Record<string, any> = {}
        stepFieldNames.forEach((fieldName) => {
          if (formValues[fieldName] !== undefined) {
            stepValues[fieldName] = formValues[fieldName]
          }
        })
        if (Object.keys(stepValues).length > 0) {
          form.setFieldsValue(stepValues)
        }
      }
    }
  }, [currentStep, accountType])

  const getStepTitle = () => {
    if (accountType === AccountType.INDIVIDUAL) {
      switch (currentStep) {
        case 1:
          return 'Select Account Type'
        case 2:
          return 'Personal Information'
        case 3:
          return 'Create Password'
        default:
          return ''
      }
    } else {
      switch (currentStep) {
        case 1:
          return 'Select Account Type'
        case 2:
          return 'Organization Details'
        case 3:
          return 'Contact Information'
        case 4:
          return 'Create Password'
        default:
          return ''
      }
    }
  }

  const getStepFields = () => {
    if (accountType === AccountType.INDIVIDUAL) {
      switch (currentStep) {
        case 1:
          return []
        case 2:
          return SIGN_UP_FORM.filter(
            (field) => field.name === 'firstName' || field.name === 'lastName' || field.name === 'email',
          ).map((field) => {
            if (field.name === 'email') {
              return { ...field, label: 'Email*' }
            }
            if (field.name === 'firstName') {
              return { ...field, label: 'First Name*' }
            }
            if (field.name === 'lastName') {
              return { ...field, label: 'Last Name*' }
            }
            return field
          })
        case 3:
          return SIGN_UP_FORM.filter(
            (field) => field.name === 'password' || field.name === 'confirmPassword',
          )
        default:
          return []
      }
    } else {
      switch (currentStep) {
        case 1:
          return [] 
        case 2:
          return SIGN_UP_FORM.filter((field) => field.name === 'orgName' || field.name === 'address').map((field) => {
            return { ...field, hidden: false }
          })
        case 3:
          return SIGN_UP_FORM.filter(
            (field) => field.name === 'email' || field.name === 'firstName' || field.name === 'lastName',
          ).map((field) => {
            if (field.name === 'email') {
              return { 
                ...field, 
                label: 'Email*',
                hidden: false,
                rules: [
                  {
                    message: 'Please enter email',
                    required: true,
                  },
                  {
                    message: 'Please enter a valid email',
                    type: 'email' as const,
                  },
                ] as any
              }
            }
            if (field.name === 'firstName') {
              return { ...field, label: 'First Name*' }
            }
            if (field.name === 'lastName') {
              return { ...field, label: 'Last Name*' }
            }
            return { ...field, hidden: false }
          })
        case 4:
          return SIGN_UP_FORM.filter(
            (field) => field.name === 'password' || field.name === 'confirmPassword',
          )
        default:
          return []
      }
    }
  }

  const handleNext = async () => {
    try {
      const stepFields = getStepFields()
      
      if (currentStep === 1) {
        setCurrentStep(2)
        return
      }

      if (stepFields.length > 0) {
        const fieldNames = stepFields.map((field) => field.name)
        await form.validateFields(fieldNames)
        
        const currentStepValues = form.getFieldsValue(fieldNames)
        setFormValues((prev) => ({ ...prev, ...currentStepValues }))
      }

      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      } else {
        await handleFormSubmit()
      }
    } catch (error) {
      if (isValidationError(error)) return
    }
  }

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFormSubmit = async () => {
    try {
      setIsSubmitting(true)

      const stepFields = getStepFields()
      const currentStepValues = stepFields.length > 0 
        ? form.getFieldsValue(stepFields.map((field) => field.name))
        : {}
      
      const allFormValues = { ...formValues, ...currentStepValues }
      
      const allFields = accountType === AccountType.INDIVIDUAL
        ? ['firstName', 'lastName', 'email', 'password', 'confirmPassword']
        : ['orgName', 'email', 'firstName', 'lastName', 'address', 'password', 'confirmPassword']
      
      form.setFieldsValue(allFormValues)
      await form.validateFields(allFields)
      
      const email = allFormValues.email
      const firstName = allFormValues.firstName
      const lastName = allFormValues.lastName
      const password = allFormValues.password
      const confirmPassword = allFormValues.confirmPassword
      const orgName = allFormValues.orgName
      const address = allFormValues.address

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

  const handleAccountTypeChange = (value: string) => {
    setAccountType(value)
    form.resetFields(['orgName', 'address', 'firstName', 'lastName', 'email', 'password', 'confirmPassword'])
    setFormValues({}) 
    setCurrentStep(1) 
  }

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <Box>
          <Text>Sign up as</Text>
          <Spacer value={10} />
          <RadioGroup
            onChange={(e) => handleAccountTypeChange(e.target.value)}
            value={accountType}
            style={{ width: '100%' }}
          >
            <OptionCard
              $selected={accountType === 'individual'}
              onClick={() => handleAccountTypeChange('individual')}
            >
              <Radio value="individual">
                <span className="title">Individual</span>
              </Radio>
              <div className="subtitle">Create an account for individual use only</div>
            </OptionCard>

            <OptionCard
              $selected={accountType === 'organization'}
              onClick={() => handleAccountTypeChange('organization')}
            >
              <Radio value="organization">
                <span className="title">Organization</span>
              </Radio>
              <div className="subtitle">Create an account for an organization</div>
            </OptionCard>
          </RadioGroup>
        </Box>
      )
    }

    const stepFields = getStepFields()
    
    return (
      <DynamicForm
        fields={stepFields}
        form={form}
        onSubmit={handleNext}
        disabled={isSubmitting}
        isLoading={false}
      />
    )
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

            <StyledProgressBarWrapper>
              <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="black"
                trailColor="#e5e5e5"
                strokeWidth={4}
              />
            </StyledProgressBarWrapper>

            <StyledStepText>
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </StyledStepText>

            <StyledStepContentWrapper>{renderStepContent()}</StyledStepContentWrapper>

            <StyledButtonWrapper>
              {currentStep > 1 && (
                <StyledGoBackButton onClick={handleGoBack} disabled={isSubmitting}>
                  Go Back
                </StyledGoBackButton>
              )}
              <StyledNextButton
                type="primary"
                onClick={handleNext}
                disabled={isSubmitting}
                loading={isSubmitting && currentStep === totalSteps}
              >
                {currentStep === totalSteps ? 'Create Account' : 'Next'}
              </StyledNextButton>
            </StyledButtonWrapper>

            <Spacer value={16} />
            <StyledNavigationBox>
              <DynamicForm
                fields={[
                  {
                    align: 'center',
                    href: ROUTE.AUTH.SIGN_IN,
                    name: 'signUpLink',
                    placeholder: '',
                    rules: [
                      {
                        required: false,
                      },
                    ],
                    title: 'Already have an account? ',
                    linkText: 'Login here',
                    type: EDynamicFormField.NAVIGATION,
                  },
                ]}
                form={form}
                onSubmit={() => {}}
                disabled={false}
                isLoading={false}
              />
            </StyledNavigationBox>
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12}>
        {/* <SignupImage /> */}
      </StyledRightCol>
    </StyledContainer>
  )
}
