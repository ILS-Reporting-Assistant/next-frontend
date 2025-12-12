import {
  ApiResponse,
  ClientsListQuery,
  ClientsListResponse,
  CreateClientPayload,
  CreateClientResponse,
  UpdateClientPayload,
  UpdateClientResponse,
  Client,
} from '../types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'

export const clientsService = {
  async getOrganizationClients(organizationId?: string, query?: ClientsListQuery) {
    const { data } = await httpClient.get<ApiResponse<ClientsListResponse>>(ENDPOINT.CLIENTS.LIST, {
      params: { ...query, ...(organizationId ? { organizationId } : {}) },
    })
    return data
  },

  async createClient(payload: CreateClientPayload & { userId: string }) {
    const { data } = await httpClient.post<ApiResponse<CreateClientResponse>>(ENDPOINT.CLIENTS.CREATE, payload)
    return data
  },

  async updateClient(organizationId: string, clientId: string, payload: UpdateClientPayload) {
    const { data } = await httpClient.put<ApiResponse<UpdateClientResponse>>(ENDPOINT.CLIENTS.UPDATE(clientId), payload)
    return data
  },

  async deleteClient(organizationId: string, clientId: string) {
    const { data } = await httpClient.delete<ApiResponse<null>>(ENDPOINT.CLIENTS.DELETE(clientId), {
      params: { ...(organizationId ? { organizationId } : {}) },
    })
    return data
  },

  async getClient(organizationId: string, clientId: string) {
    const { data } = await httpClient.get<ApiResponse<Client>>(ENDPOINT.CLIENTS.GET(clientId))
    return data
  },
}
