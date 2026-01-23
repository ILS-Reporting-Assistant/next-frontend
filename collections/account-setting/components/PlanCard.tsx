import { CheckOutlined } from '@ant-design/icons'
import { PlanCardProps } from '@app/types'
import React from 'react'
import {
  StyledActiveTag,
  StyledPlanButton,
  StyledPlanCard,
  StyledPlanDescription,
  StyledPlanFeature,
  StyledPlanFeatures,
  StyledPlanPrice,
  StyledPlanPriceSubText,
  StyledPlanTitle,
  StyledPopularTag,
} from './elements'

export const PlanCard: React.FC<PlanCardProps> = ({
  title,
  price,
  description,
  buttonText,
  buttonType = 'primary',
  features,
  isPopular = false,
  priceSubText,
  onButtonClick,
  disabled = false,
  loading = false,
  isDanger = false,
  isActive = false,
}) => {
  return (
    <StyledPlanCard>
      {!isActive && isPopular && <StyledPopularTag>Popular</StyledPopularTag>}
      {isActive && <StyledActiveTag>Active</StyledActiveTag>}
      <StyledPlanTitle>{title}</StyledPlanTitle>
      <StyledPlanPrice>
        {price}
        <StyledPlanPriceSubText>{priceSubText}</StyledPlanPriceSubText>
      </StyledPlanPrice>
      <StyledPlanDescription>{description}</StyledPlanDescription>
      <StyledPlanButton
        type={buttonType}
        onClick={onButtonClick}
        disabled={disabled}
        loading={loading}
        danger={isDanger}
      >
        {buttonText}
      </StyledPlanButton>
      <StyledPlanFeatures>
        {features.map((feature, index) => (
          <StyledPlanFeature key={index}>
            <CheckOutlined />
            <span>{feature.text}</span>
          </StyledPlanFeature>
        ))}
      </StyledPlanFeatures>
    </StyledPlanCard>
  )
}
