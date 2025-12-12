import { UploadFile } from '@app/types'

export interface UploadDocumentProps {
  uploadedFile?: UploadFile | null
  onFileChange?: (file: UploadFile | null) => void
  notes?: string
  onNotesChange?: (notes: string) => void
}
