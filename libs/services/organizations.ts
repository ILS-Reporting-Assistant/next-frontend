import { ApiResponse } from '../types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'
import { Organization, UpdateOrganizationPayload } from '@app/types'

export const organizationsService = {
  async getOrganization(organizationId: string) {
    const { data } = await httpClient.get<ApiResponse<Organization>>(ENDPOINT.ORGANIZATIONS.GET(organizationId))
    return data
  },

  async updateOrganization(payload: UpdateOrganizationPayload) {
    const { data } = await httpClient.put<ApiResponse<Organization>>(ENDPOINT.ORGANIZATIONS.UPDATE, payload)
    return data
  },
}
