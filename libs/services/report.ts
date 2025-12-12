import { ApiResponse } from '../types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'
import {
  GenerateAssessmentReportResponse,
  SaveReportPayload,
  SaveReportResponse,
} from '../types/collections/create-reports'
import { ReportsListQuery, ReportsListResponse, Report } from '../types/api/reports'

export const reportService = {
  async uploadDocument(
    file?: File,
    organizationId?: string,
    selectedSkills?: string[],
    clientId?: string,
    notes?: string,
  ): Promise<GenerateAssessmentReportResponse> {
    const formData = new FormData()

    // Add file only if provided
    if (file) {
      formData.append('file', file)
    }

    if (organizationId) {
      formData.append('organizationId', organizationId)
    }
    if (selectedSkills && selectedSkills.length > 0) {
      formData.append('selectedSkills', JSON.stringify(selectedSkills))
    }
    if (clientId) {
      formData.append('clientId', clientId)
    }
    if (notes) {
      formData.append('notes', notes)
    }

    const { data } = await httpClient.post<ApiResponse<GenerateAssessmentReportResponse>>(
      ENDPOINT.REPORTS.GENERATE_ASSESSMENT_REPORT,
      formData,
    )
    return data.data
  },
  async uploadProgressDocument(
    file?: File,
    organizationId?: string,
    selectedSkills?: string[],
    clientId?: string,
    notes?: string,
  ): Promise<GenerateAssessmentReportResponse> {
    const formData = new FormData()

    // Add file only if provided
    if (file) {
      formData.append('file', file)
    }

    if (organizationId) {
      formData.append('organizationId', organizationId)
    }
    if (selectedSkills && selectedSkills.length > 0) {
      formData.append('selectedSkills', JSON.stringify(selectedSkills))
    }
    if (clientId) {
      formData.append('clientId', clientId)
    }
    if (notes) {
      formData.append('notes', notes)
    }

    const { data } = await httpClient.post<ApiResponse<GenerateAssessmentReportResponse>>(
      ENDPOINT.REPORTS.GENERATE_PROGRESS_REPORT,
      formData,
    )
    return data.data
  },
  async generateDocument(content: string): Promise<Blob> {
    const response = await httpClient.post<Blob>(
      ENDPOINT.REPORTS.GENERATE_DOC,
      { content },
      {
        responseType: 'blob',
      },
    )
    return response.data
  },
  async generatePDFDocument(content: string): Promise<Blob> {
    const response = await httpClient.post<Blob>(
      ENDPOINT.REPORTS.GENERATE_PDF,
      { content },
      {
        responseType: 'blob',
      },
    )
    return response.data
  },
  async saveReport(payload: SaveReportPayload): Promise<SaveReportResponse> {
    const { data } = await httpClient.post<ApiResponse<SaveReportResponse>>(ENDPOINT.REPORTS.SAVE, payload)
    return data.data
  },
  async getReports(query?: ReportsListQuery): Promise<ReportsListResponse> {
    const { data } = await httpClient.get<ApiResponse<ReportsListResponse>>(ENDPOINT.REPORTS.LIST, {
      params: query,
    })
    return data.data
  },
  async getReportById(reportId: string): Promise<Report> {
    const { data } = await httpClient.get<ApiResponse<Report>>(ENDPOINT.REPORTS.GET(reportId))
    return data.data
  },
  async getReportCount(organizationId?: string): Promise<{ reportsUsed: number; totalReports: number }> {
    const { data } = await httpClient.get<ApiResponse<{ reportsUsed: number; totalReports: number }>>(
      ENDPOINT.REPORTS.COUNT,
      {
        params: organizationId ? { organizationId } : {},
      },
    )
    return data.data
  },
  async requestAIRevision(
    originalContent: string,
    reportContent: string,
    revisionRequestValue: string,
    reportType?: string,
  ): Promise<{ revisedContent: string }> {
    const { data } = await httpClient.post<ApiResponse<{ revisedContent: string }>>(
      ENDPOINT.REPORTS.REQUEST_AI_REVISION,
      {
        originalContent,
        reportContent,
        revisionRequestValue,
        reportType,
      },
    )
    return data.data
  },
}
