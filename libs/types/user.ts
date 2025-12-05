import { AccountType, UserRole } from '../enums'

export type IUser = {
  accessToken: string
  refreshToken: string
  email: string
  uid: string
  firstName: string
  lastName: string
  role: UserRole | string
  type: AccountType | string
  emailVerifiedAt: string | null
  currentOrganizationId?: string | null
  currentOrganizationRole?: UserRole | string
}

export type RefreshTokensPayload = {
  accessToken: string
  refreshToken: string
}
