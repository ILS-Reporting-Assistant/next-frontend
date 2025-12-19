import { Icon, Spin } from '@app/components'
import { SuccessProps } from '@app/types'
import { progressSteps } from '@app/utils'
import { StarsAnimation } from 'public/images'
import React, { useEffect, useState, useRef } from 'react'
import {
  StyledStep4Container,
  StyledStarIconContainer,
  StyledStep4MainHeading,
  StyledStep4Description,
  StyledProgressStepsContainer,
  StyledProgressStep,
  StyledCheckCircle,
  StyledProgressStepText,
} from './elements'

export const Success = ({ onComplete, isExtracting = true, apiSuccess = false }: SuccessProps) => {
  const [steps, setSteps] = useState(progressSteps)
  const sequenceStartedRef = useRef(false)

  useEffect(() => {
    // Reset when component mounts or when extraction starts
    if (isExtracting && !apiSuccess) {
      setSteps(progressSteps)
      sequenceStartedRef.current = false
    }
  }, [isExtracting, apiSuccess])

  useEffect(() => {
    // When API call succeeds, start completing steps sequentially
    if (apiSuccess && !isExtracting && !sequenceStartedRef.current) {
      sequenceStartedRef.current = true

      // Complete first step immediately when API succeeds
      setSteps((prev) => prev.map((step) => (step.id === 1 ? { ...step, completed: true } : step)))

      // Complete second step after delay
      const timer2 = setTimeout(() => {
        setSteps((prev) => prev.map((step) => (step.id === 2 ? { ...step, completed: true } : step)))

        // Complete third step after delay
        const timer3 = setTimeout(() => {
          setSteps((prev) => prev.map((step) => (step.id === 3 ? { ...step, completed: true } : step)))

          // When all steps are completed, call onComplete
          const timer4 = setTimeout(() => {
            if (onComplete) {
              onComplete()
            }
          }, 2000)

          return () => clearTimeout(timer4)
        }, 1000)

        return () => clearTimeout(timer3)
      }, 1000)

      return () => clearTimeout(timer2)
    }
  }, [apiSuccess, isExtracting, onComplete])

  return (
    <StyledStep4Container>
      <StyledStarIconContainer>
        <StarsAnimation />
      </StyledStarIconContainer>

      <StyledStep4MainHeading level={2}>Creating Your Personalized Report</StyledStep4MainHeading>

      <StyledStep4Description>
        Almost there! I'm transforming your observations into a comprehensive, professional narrative that highlights
        your client's strengths and progress.
      </StyledStep4Description>

      <StyledProgressStepsContainer>
        {steps.map((step) => {
          const isFirstStep = step.id === 1
          const isLoading = isFirstStep && isExtracting && !apiSuccess
          return (
            <StyledProgressStep key={step.id}>
              {isLoading ? (
                <Spin size="small" />
              ) : (
                <StyledCheckCircle completed={step.completed}>
                  {step.completed ? <Icon.CheckOutlined /> : null}
                </StyledCheckCircle>
              )}
              <StyledProgressStepText>{step.text}</StyledProgressStepText>
            </StyledProgressStep>
          )
        })}
      </StyledProgressStepsContainer>
    </StyledStep4Container>
  )
}
