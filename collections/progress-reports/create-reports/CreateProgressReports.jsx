import { Box, Icon, Progress } from '@app/components'
import React, { Fragment, useState } from 'react'
import { ROUTE } from '@app/data'
import {
  StyledContainer,
  StyledContentWrapper,
  StyledBackLink,
  StyledBackIcon,
  StyledBackIconInner,
  StyledProgressTitle,
  StyledProgressBarWrapper,
  StyledStepText,
  StyledStep3StepText,
  StyledButtonContainer,
  StyledGoBackButton,
  StyledNextButton,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledStepContentWrapper,
} from './elements'
import { ComplianceNotice } from './ComplianceNotice'
import { Skills } from './Skills'
import { UploadDocument } from './UploadDocument'
import { ReviewRevice } from './ReviewRevice'
import { Success } from './Success'

export const CreateProgressReports = () => {
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
        return <ReviewRevice onGoBack={handleGoBack} />
      default:
        return null
    }
  }

  return (
    <Fragment>
      <StyledContainer>
        <StyledContentWrapper>
          <StyledBackLink href={ROUTE.PROGRESS_REPORTS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink>

          <StyledProgressTitle level={2}>Progress Report</StyledProgressTitle>

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
