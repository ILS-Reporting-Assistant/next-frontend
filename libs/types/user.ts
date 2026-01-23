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
  isLoggingOut?: boolean
}

export type RefreshTokensPayload = {
  accessToken: string
  refreshToken: string
}

export interface SelectUsersModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: (userIds: string[], invitedUserIds: string[]) => void
  quantity: number
  organizationId?: string
}

export interface SelectClientsModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: (clientIds: string[]) => void
  quantity: number
  organizationId?: string
}
