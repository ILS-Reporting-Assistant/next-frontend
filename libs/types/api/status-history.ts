export interface StatusHistory {
  _id: string
  userId: string | { _id: string; emailAddress: string; firstName: string; lastName: string }
  reportId?: string | { _id: string; reportName: string; reportType: string }
  organizationId?: string | null
  clientId: string | { _id: string; firstName: string; lastName: string; email?: string }
  createdAt: string
  updatedAt: string
}

export interface StatusHistoryByClientQuery {
  cursor?: string
  limit?: number
}

export interface StatusHistoryByClientResponse {
  statusHistories: StatusHistory[]
  nextCursor?: string
  hasMore: boolean
  count: number
}
