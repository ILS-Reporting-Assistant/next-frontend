import { AxiosError, AxiosRequestConfig } from 'axios'
import {
  ApiResponse,
  VerifyOtpPayload,
  LoginPayload,
  SignUpPayload,
  AuthPayload,
  ResetPasswordPayload,
  ForgotPasswordPayload,
} from '@app/types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await httpClient.post<ApiResponse<AuthPayload>>(ENDPOINT.AUTH.LOGIN, payload)
    return data
  },

  async signUp(payload: SignUpPayload) {
    const { data } = await httpClient.post<ApiResponse<AuthPayload>>(ENDPOINT.AUTH.SIGNUP, payload)
    return data
  },

  async requestPasswordReset(payload: ForgotPasswordPayload) {
    const { data } = await httpClient.post<ApiResponse<null>>(ENDPOINT.AUTH.REQUEST_PASSWORD_RESET, payload)
    return data
  },

  async resetPassword(payload: ResetPasswordPayload) {
    const { data } = await httpClient.post<ApiResponse<null>>(ENDPOINT.AUTH.RESET_PASSWORD, payload, {
      skipAuthRefresh: true,
    } as AxiosRequestConfig)
    return data
  },

  async verifyOtp(payload: VerifyOtpPayload) {
    const { data } = await httpClient.post<ApiResponse<null>>(ENDPOINT.AUTH.VERIFY_OTP, payload)
    return data
  },

  async resendOtp() {
    const { data } = await httpClient.post<ApiResponse<null>>(ENDPOINT.AUTH.RESEND_OTP)
    return data
  },
}

export const extractErrorMessage = (error: any): string => {
  if (!error) return 'Something went wrong. Please try again.'

  if (error?.status === 500) return 'Something went wrong. Please try again.'
  if (error?.data?.message) return error.data.message

  const axiosError = error as AxiosError<{ message?: string; error?: string }>
  const responseMessage = axiosError.response?.data?.message || axiosError.response?.data?.error
  if (typeof responseMessage === 'string') return responseMessage

  if (axiosError.message) return axiosError.message

  return 'Something went wrong. Please try again.'
}
