import {
  ApiResponse,
  UsersListQuery,
  UsersListResponse,
  InvitationsListResponse,
  CreateInvitationPayload,
  CreateInvitationResponse,
  ResendInvitationPayload,
  ResendInvitationResponse,
  VerifyInvitationResponse,
  CompleteInvitationPayload,
  CompleteInvitationResponse,
} from '../types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'

export const usersService = {
  async getOrganizationUsers(organizationId: string, query?: UsersListQuery) {
    const { data } = await httpClient.get<ApiResponse<UsersListResponse>>(
      ENDPOINT.ORGANIZATIONS.USERS(organizationId),
      { params: query }
    )
    return data
  },

  async getOrganizationInvitations(organizationId: string, query?: UsersListQuery) {
    const { data } = await httpClient.get<ApiResponse<InvitationsListResponse>>(
      ENDPOINT.ORGANIZATIONS.INVITATIONS(organizationId),
      { params: query }
    )
    return data
  },

  async createInvitation(organizationId: string, payload: CreateInvitationPayload) {
    const { data } = await httpClient.post<ApiResponse<CreateInvitationResponse>>(
      ENDPOINT.INVITATIONS.CREATE(organizationId),
      payload
    )
    return data
  },

  async resendInvitation(organizationId: string, payload: ResendInvitationPayload) {
    const { data } = await httpClient.post<ApiResponse<ResendInvitationResponse>>(
      ENDPOINT.INVITATIONS.RESEND(organizationId),
      payload
    )
    return data
  },

  async deleteInvitation(organizationId: string, invitationId: string) {
    const { data } = await httpClient.delete<ApiResponse<null>>(
      ENDPOINT.INVITATIONS.DELETE(organizationId, invitationId)
    )
    return data
  },

  async verifyInvitation(token: string) {
    const { data } = await httpClient.get<ApiResponse<VerifyInvitationResponse>>(
      ENDPOINT.INVITATIONS.VERIFY,
      { params: { token } }
    )
    return data
  },

  async completeInvitation(payload: CompleteInvitationPayload) {
    const { data } = await httpClient.post<ApiResponse<CompleteInvitationResponse>>(
      ENDPOINT.INVITATIONS.COMPLETE,
      payload
    )
    return data
  },
}

