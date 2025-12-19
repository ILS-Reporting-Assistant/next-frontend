import { ApiResponse } from '../types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'
import { StatusHistoryByClientQuery, StatusHistoryByClientResponse } from '../types/api/status-history'

export const statusHistoryService = {
  async getStatusHistoriesByClientId(
    clientId: string,
    query?: StatusHistoryByClientQuery,
  ): Promise<StatusHistoryByClientResponse> {
    const { data } = await httpClient.get<ApiResponse<StatusHistoryByClientResponse>>(
      ENDPOINT.STATUS_HISTORY.BY_CLIENT(clientId),
      {
        params: query,
      },
    )
    return data.data
  },
}
