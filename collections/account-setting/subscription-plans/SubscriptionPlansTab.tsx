import React, { useState } from 'react'
import { RadioGroup, RadioButton, Spacer } from '@app/components'
import { BillingPeriod } from '@app/types'
import {
  StyledSubscriptionDescription,
  StyledPricingToggleWrapper,
  StyledPricingToggle,
} from './elements'
import { StyledTabContent, StyledSectionTitle } from '../shared'
import { Plans } from '../components'

export const SubscriptionPlansTab: React.FC = () => {
  const [pricingPeriod, setPricingPeriod] = useState<BillingPeriod>('monthly')

  return (
    <StyledTabContent>
      <StyledSectionTitle>Subscription Plans</StyledSectionTitle>
      <Spacer value={8} />
      <StyledSubscriptionDescription>
        Explore our flexible subscription plans for your photo storage needs!
      </StyledSubscriptionDescription>
      <StyledPricingToggleWrapper>
        <StyledPricingToggle>
          <RadioGroup
            value={pricingPeriod}
            onChange={(e) => setPricingPeriod(e.target.value as BillingPeriod)}
            buttonStyle="solid"
          >
            <RadioButton value="monthly">Monthly</RadioButton>
            <RadioButton value="annually">Annually</RadioButton>
          </RadioGroup>
        </StyledPricingToggle>
      </StyledPricingToggleWrapper>
      <Plans billingPeriod={pricingPeriod} />
    </StyledTabContent>
  )
}

