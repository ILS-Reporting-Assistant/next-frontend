import { UserRole } from '../../enums'

export interface User {
  _id: string
  emailAddress: string
  firstName: string
  lastName: string
  role: UserRole | string
  phoneNumber?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Invitation {
  _id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole | string
  status: 'pending' | 'accepted' | 'expired' | 'deleted'
  organizationId: string | null
  organizationName?: string
  invitedBy?: string
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}

export interface UsersListQuery {
  page?: number
  limit?: number
  search?: string
}

export interface UsersListResponse {
  users: User[]
  total: number
  page: number
  totalPages: number
}

export interface InvitationsListResponse {
  invitations: Invitation[]
  total: number
  page: number
  totalPages: number
}

export interface CreateInvitationPayload {
  email: string
  firstName: string
  lastName: string
  role: UserRole | string
}

export interface CreateInvitationResponse {
  token: string
  entityId: string
  type: string
  expires: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ResendInvitationPayload {
  invitationId: string
  organizationId: string
}

export interface ResendInvitationResponse {
  token: string
}

export interface VerifyInvitationQuery {
  token: string
}

export interface VerifyInvitationResponse {
  organization?: {
    _id: string
    name: string
  }
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  isUser: boolean
}

export interface CompleteInvitationPayload {
  token: string
  firstName?: string
  lastName?: string
  password?: string
}

export interface CompleteInvitationResponse {
  accessToken: string
  refreshToken: string
  user: {
    _id: string
    emailAddress: string
    firstName: string
    lastName: string
    role: string
    type: string
    emailVerifiedAt: string
  }
}
