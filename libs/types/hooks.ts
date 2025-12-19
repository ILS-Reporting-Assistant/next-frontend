import { Editor } from '@tiptap/react'

export interface UseDownloadReportOptions {
  showSuccessNotification?: boolean
  onDownloadStart?: () => void
  onDownloadSuccess?: () => void
  onDownloadError?: (error: Error) => void
}

export interface UseDownloadReportReturn {
  downloadDocx: (content: string, fileName?: string) => Promise<void>
  downloadPdf: (content: string, fileName?: string) => Promise<void>
  isDownloadingDocx: boolean
  isDownloadingPdf: boolean
  isDownloading: boolean
}

export interface UseReportEditorOptions {
  content?: string
  editable?: boolean
  onUpdate?: (markdown: string) => void
  immediatelyRender?: boolean
  enableCopyToClipboard?: boolean
  onCopied?: () => void
}

export interface UseReportEditorReturn {
  editor: Editor | null
  handleCopyToClipboard?: () => Promise<boolean>
}
