import { Box, Icon, Text, Title } from '@app/components'
import { SuccessProps } from '@app/types'
import { progressSteps } from '@app/utils'
import { StarsAnimation } from 'public/images'
import React, { useEffect, useState } from 'react'
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

export const Success = ({ onComplete }: SuccessProps) => {
  const [steps, setSteps] = useState(progressSteps)

  useEffect(() => {
    // Animate steps completion in sequence
    // First check: Analyzing your information
    const timer1 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((step) => (step.id === 1 ? { ...step, completed: true } : step))
      )
    }, 800)

    // Second check: Crafting professional language
    const timer2 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((step) => (step.id === 2 ? { ...step, completed: true } : step))
      )
    }, 1800)

    // Third check: Adding final touches
    const timer3 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((step) => (step.id === 3 ? { ...step, completed: true } : step))
      )
    }, 2800)

    // When all steps are completed, call onComplete callback after a short delay
    const timer4 = setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 3500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <StyledStep4Container>
      <StyledStarIconContainer>
        <StarsAnimation />
      </StyledStarIconContainer>

      <StyledStep4MainHeading level={2}>
        Creating Your Personalized Report
      </StyledStep4MainHeading>

      <StyledStep4Description>
        Almost there! I'm transforming your observations into a comprehensive, professional
        narrative that highlights your client's strengths and progress.
      </StyledStep4Description>

      <StyledProgressStepsContainer>
        {steps.map((step) => (
          <StyledProgressStep key={step.id}>
            <StyledCheckCircle completed={step.completed}>
              {step.completed && <Icon.CheckOutlined />}
            </StyledCheckCircle>
            <StyledProgressStepText>{step.text}</StyledProgressStepText>
          </StyledProgressStep>
        ))}
      </StyledProgressStepsContainer>
    </StyledStep4Container>
  )
}

