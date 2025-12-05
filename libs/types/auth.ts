import { UserRole } from '../enums'

export interface ApiResponse<T> {
  data: T
  message?: string
  description?: string
}

export interface VerifyOtpPayload {
  otp: string
}

export interface AuthUser {
  _id: string
  emailAddress: string
  firstName: string
  lastName: string
  role: string
  type: string
  emailVerifiedAt: string
}

export interface UserOrganizations {
  _id: string
  organizationId: string
  userId: string
  role: UserRole
  status: string
}

export interface AuthPayload {
  accessToken: string
  refreshToken: string
  user: AuthUser
  userOrganizations?: UserOrganizations
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignUpPayload {
  type: string
  email: string
  password: string
  firstName: string
  lastName: string
  organizationName?: string
  address?: string
}

export type ResetPasswordPayload = {
  token: string
  newPassword: string
}

export type ForgotPasswordPayload = {
  email: string
}
