export interface UploadDocumentResponse {
  bucket: string
  key: string
  originalName: string
  sizeBytes: number
  contentType: string
  fileId: string
}

