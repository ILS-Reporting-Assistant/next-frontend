import { ReportType } from '../../enums'

export interface ReportsListQuery {
  page?: number
  limit?: number
  reportType?: ReportType
  organizationId?: string
  clientId?: string
}

export interface Report {
  _id: string
  userId: { _id: string; emailAddress: string; firstName: string; lastName: string }
  organizationId?: string | null
  clientId: string | { _id: string; firstName: string; lastName: string; email?: string }
  reportType: ReportType
  reportName: string
  fileId?: { _id: string; name: string; key: string; contentType: string; sizeBytes: number }
  originalContent: string
  content: string
  createdAt: string
  updatedAt: string
}

export interface ReportsListResponse {
  reports: Report[]
  total: number
  page: number
  totalPages: number
}

export interface ReportsByClientQuery {
  cursor?: string
  limit?: number
  reportType?: ReportType
}

export interface ReportsByClientResponse {
  reports: Report[]
  nextCursor?: string
  hasMore: boolean
  count: number
}
