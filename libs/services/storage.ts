import { ApiResponse } from '../types'
import { UploadDocumentResponse } from '../types/api'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'

export const storageService = {
  async uploadDocument(file: File, organizationId?: string): Promise<UploadDocumentResponse> {
    const formData = new FormData()
    formData.append('file', file)
    if (organizationId) {
      formData.append('organizationId', organizationId)
    }

    const { data } = await httpClient.post<ApiResponse<UploadDocumentResponse>>(
      ENDPOINT.STORAGE.UPLOAD_DOCUMENT,
      formData,
    )
    return data.data
  },
  async getSignedUrl(
    fileId: string,
    disposition?: 'inline' | 'attachment',
  ): Promise<{ signedUrl: string; fileName: string }> {
    const { data } = await httpClient.get<ApiResponse<{ signedUrl: string; fileName: string }>>(
      ENDPOINT.STORAGE.GET_SIGNED_URL(fileId),
      { params: { disposition } },
    )
    return data.data
  },
}
