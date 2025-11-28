import React, { useState } from 'react'
import { StyledText, StyledVerifyBox, StyledButton, StyledResendLink } from './elements'
import { Spacer, Title, Notification } from '@app/components'
import { CompanyLogo } from '~public'
import { MultiDigitInput } from '~collections'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { authService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { useDispatch } from 'react-redux'
import { logout } from '@app/redux'

export const VerifyAccount = () => {
  const router = useRouter()
  const dispatch = useDispatch()
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
      const data = await authService.verifyOtp({ otp })
      Notification({
        message: 'Email verified successfully',
        description: data.message ?? 'Your email has been verified. You can now access your account.',
        type: 'success',
      })

      router.replace(ROUTE.ONBOARDING)
    } catch (error: any) {
      if (isValidationError(error)) return

      Notification({
        message: 'Verification failed',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    try {
      setIsResending(true)
      await authService.resendOtp()
      Notification({ message: 'Code sent', description: 'A new verification code has been sent to your email.' })
    } catch (error) {
      if (isValidationError(error)) return

      Notification({
        message: 'Failed to resend code',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    router.replace(ROUTE.AUTH.SIGN_IN)
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
      <StyledButton onClick={handleVerifyOtp} disabled={isVerifying} loading={isVerifying}>
        {isVerifying ? 'Verifying...' : 'Verify Account'}
      </StyledButton>
      <Spacer value={16} />
      <StyledButton type="default" onClick={handleLogout}>
        Logout
      </StyledButton>
    </StyledVerifyBox>
  )
}
