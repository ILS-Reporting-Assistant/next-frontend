import { UploadFile } from '@app/types'

export interface UploadDocumentProps {
  uploadedFile?: UploadFile | null
  uploadedFiles?: UploadFile[]
  onFileChange?: (file: UploadFile | null) => void
  onFilesChange?: (files: UploadFile[]) => void
  notes?: string
  onNotesChange?: (notes: string) => void
  allowMultiple?: boolean
}
