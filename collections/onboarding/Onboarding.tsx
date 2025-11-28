import { Spacer, Title } from '@app/components'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { CompanyLogo } from '~public'
import { StyledButton, StyledOnboardingBox } from './elements'

export const Onboarding = () => {
  const router = useRouter()
  const handleGetStarted = () => {
    router.replace(ROUTE.DASHBOARD)
  }
  return (
    <StyledOnboardingBox>
      <CompanyLogo height={100} />
      <Spacer value={50} />
      <Title level={2}>Welcome to ILS! We’re excited to have you onboard!</Title>
      <Spacer value={16} />
      {/* <StyledText></StyledText> */}
      <Spacer value={50} />
      <StyledButton onClick={handleGetStarted}>Let's Get Started!</StyledButton>
    </StyledOnboardingBox>
  )
}
