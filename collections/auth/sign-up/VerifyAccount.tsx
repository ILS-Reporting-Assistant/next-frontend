import React, { useState } from 'react'
import { StyledText, StyledVerifyBox, StyledButton, StyledResendLink } from './elements'
import { Spacer, Title, Notification } from '@app/components'
import { CompanyLogo } from '~public'
import { MultiDigitInput } from '~collections'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'

export const VerifyAccount = () => {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Notification({
        message: 'Invalid OTP',
        description: 'Please enter a valid 6-digit verification code.',
        type: 'error',
      })
      return
    }

    try {
      setIsVerifying(true)
      await new Promise((r) => setTimeout(r, 600))
      Notification({ message: 'Account verified', type: 'success' })
      router.replace(ROUTE.ONBOARDING)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setIsResending(true)
      await new Promise((r) => setTimeout(r, 600))
      Notification({ message: 'Code sent', description: 'A new verification code has been sent to your email.' })
    } finally {
      setIsResending(false)
    }
  }

  return (
    <StyledVerifyBox>
      <Spacer value={84} />
      <CompanyLogo height={100} />
      <Spacer value={50} />
      <Title level={2}>Verify Account</Title>
      <Spacer value={16} />
      <StyledText>A verification code has been sent to your email.</StyledText>
      <Spacer value={1} />
      <StyledText>Enter the code below to proceed with accessing your account!</StyledText>
      <Spacer value={16} />
      <MultiDigitInput lengthOfDigits={6} setCode={setOtp} />
      <Spacer value={32} />
      <StyledText>Didn't receive the code? </StyledText>
      <StyledResendLink onClick={handleResendOtp}>{isResending ? 'Sending…' : 'Resend code'}</StyledResendLink>
      <Spacer value={32} />
      <StyledButton onClick={handleVerifyOtp} disabled={isVerifying}>
        {isVerifying ? 'Verifying...' : 'Verify Account'}
      </StyledButton>
    </StyledVerifyBox>
  )
}
