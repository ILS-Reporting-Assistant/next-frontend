import React from 'react'
import { PlansProps } from '@app/types'
import { StyledPlansContainer } from './elements'
import { PlanCard } from './PlanCard'

export const Plans: React.FC<PlansProps> = ({ billingPeriod }) => {
  const handleTryFree = (planName: string) => {
    console.log(`Try free for 30 days - ${planName}`)
  }

  const isMonthly = billingPeriod === 'monthly'

  const plans = {
    free: {
      title: 'Free',
      price: '$0',
      priceSubText: isMonthly ? 'usd/month' : 'usd/year',
      description: 'Perfect for individuals',
      buttonText: 'Your Current Plan',
      buttonType: 'default' as const,
      features: [
        { text: '1 user' },
        { text: '2 TB of storage' },
        { text: 'Stay connected across all devices' },
        { text: '30 days to restore deleted files' },
        { text: 'Transfer files up to 50GB' },
      ],
    },
    plus: {
      title: 'Plus',
      price: isMonthly ? '$9.99' : '$99.99',
      priceSubText: isMonthly ? 'usd/month' : 'usd/year',
      description: 'Perfect for individuals with more usage',
      buttonText: 'Try free for 30 days',
      buttonType: 'primary' as const,
      isPopular: true,
      onButtonClick: () => handleTryFree('Plus'),
      features: [
        { text: '1 user' },
        { text: '3 TB of storage' },
        { text: 'Stay connected across all devices' },
        { text: '180 days to restore deleted files' },
        { text: 'Transfer files up to 100GB' },
      ],
    },
    professional: {
      title: 'Professional',
      price: isMonthly ? '$24.99' : '$249.99',
      priceSubText: isMonthly ? 'usd/month' : 'usd/year',
      description: 'Perfect for teams with high usage',
      buttonText: 'Try free for 30 days',
      buttonType: 'primary' as const,
      onButtonClick: () => handleTryFree('Professional'),
      features: [
        { text: '3+ user' },
        { text: '5 TB of storage for the team' },
        { text: 'Stay connected across all devices' },
        { text: '180 days to restore deleted files' },
        { text: 'Transfer files up to 100GB' },
        { text: 'Get team folders for organization' },
        { text: 'Create groups and roles' },
      ],
    },
  }

  return (
    <StyledPlansContainer>
      <PlanCard {...plans.free} />
      <PlanCard {...plans.plus} />
      <PlanCard {...plans.professional} />
    </StyledPlansContainer>
  )
}

