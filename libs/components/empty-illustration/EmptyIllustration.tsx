import React from 'react'
import { StyledFlexContainer, StyledText } from './elements'
import { Button, Spacer } from '@app/components'
import { EmptyIllustrationProps } from '@app/types'

export const EmptyIllustration: React.FC<EmptyIllustrationProps> = ({
  image,
  text,
  buttonText,
  buttonIcon,
  onClick,
  loading = false,
}) => {
  return (
    <StyledFlexContainer>
      <Spacer value={16} />
      {image}
      <Spacer value={24} />
      <StyledText>{text}</StyledText>
      <Spacer value={32} />
      {buttonText && (
        <Button icon={buttonIcon} onClick={onClick} loading={loading} disabled={loading}>
          {buttonText}
        </Button>
      )}
    </StyledFlexContainer>
  )
}
