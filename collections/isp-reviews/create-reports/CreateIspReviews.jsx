import { Icon, Progress } from '@app/components'
import { ROUTE, sampleIspReviewContent } from '@app/data'
import { Fragment, useState } from 'react'
import {
  ComplianceNotice,
  Skills,
  UploadDocument,
  ReviewRevice,
  Success,
} from 'collections/progress-reports/create-reports'
import {
  StyledBackIcon,
  StyledBackIconInner,
  StyledBackLink,
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledContainer,
  StyledContentWrapper,
  StyledGoBackButton,
  StyledNextButton,
  StyledProgressBarWrapper,
  StyledProgressTitle,
  StyledStep3StepText,
  StyledStepContentWrapper,
  StyledStepText,
} from 'collections/progress-reports/create-reports/elements'

export const CreateIspReviews = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const totalSteps = 4
  const progressPercent = showSuccess ? 100 : (currentStep / totalSteps) * 100

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Compliance Notice'
      case 2:
        return 'Select Skills'
      case 3:
        return 'Upload Documents'
      case 4:
        return 'Review & Revise'
      default:
        return ''
    }
  }

  const handleNext = () => {
    if (currentStep === 3) {
      setShowSuccess(true)
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleGoBack = () => {
    if (showSuccess) {
      setShowSuccess(false)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      window.history.back()
    }
  }

  const handleSuccessComplete = () => {
    setShowSuccess(false)
    setCurrentStep(4)
  }

  const renderStepContent = () => {
    if (showSuccess) {
      return <Success onComplete={handleSuccessComplete} />
    }

    switch (currentStep) {
      case 1:
        return <ComplianceNotice />
      case 2:
        return <Skills />
      case 3:
        return <UploadDocument />
      case 4:
        return (
          <ReviewRevice
            onGoBack={handleGoBack}
            defaultReportName="Annual ISP Review 11/25"
            defaultReportContent={sampleIspReviewContent}
          />
        )
      default:
        return null
    }
  }

  return (
    <Fragment>
      <StyledContainer>
        <StyledContentWrapper>
          <StyledBackLink href={ROUTE.ISP_REVIEWS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink>

          <StyledProgressTitle level={2}>Annual ISP Review</StyledProgressTitle>

          {!showSuccess && (
            <StyledProgressBarWrapper>
              <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="black"
                trailColor="#e5e5e5"
                strokeWidth={4}
              />
            </StyledProgressBarWrapper>
          )}

          {!showSuccess && currentStep === 4 ? null : !showSuccess && currentStep === 3 ? (
            <StyledStep3StepText>
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </StyledStep3StepText>
          ) : !showSuccess ? (
            <StyledStepText>
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </StyledStepText>
          ) : null}

          {((currentStep === 4 || currentStep === 3))? (
            renderStepContent()
          ) : (
            <StyledStepContentWrapper>{renderStepContent()}</StyledStepContentWrapper>
          )}

          {!showSuccess && currentStep !== 4 && (
            <StyledButtonWrapper>
              <StyledButtonContainer>
                <StyledButtonContainerWrapper>
                  <StyledGoBackButton onClick={handleGoBack}>Go Back</StyledGoBackButton>
                  <StyledNextButton type="primary" onClick={handleNext}>
                    {currentStep === 3 ? 'Generate My Report' : 'Next'}
                  </StyledNextButton>
                </StyledButtonContainerWrapper>
              </StyledButtonContainer>
            </StyledButtonWrapper>
          )}
        </StyledContentWrapper>
      </StyledContainer>
    </Fragment>
  )
}

