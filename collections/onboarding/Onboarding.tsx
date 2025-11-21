import { StyledText, StyledOnboardingBox, StyledButton } from './elements'
import { Spacer, Title } from '@app/components'
import { CompanyLogo } from '~public'

export const Onboarding = () => {
  return (
    <StyledOnboardingBox>
      <CompanyLogo height={100} />
      <Spacer value={50} />
      <Title level={2}>Welcome to ILS! We’re excited to have you onboard!</Title>
      <Spacer value={16} />
      {/* <StyledText></StyledText> */}
      <Spacer value={50} />
      <StyledButton>Let's Get Started!</StyledButton>
    </StyledOnboardingBox>
  )
}
