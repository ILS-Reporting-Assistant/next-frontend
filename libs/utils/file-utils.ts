import { FileType } from '@app/enums'

/**
 * Get the file type from a MIME type (contentType)
 * @param mimetype - The MIME type string (e.g., 'application/pdf')
 * @returns The file type enum value
 */
export const getFileType = (mimetype: string): FileType => {
  switch (mimetype) {
    // PDF
    case 'application/pdf':
      return FileType.PDF

    // Images
    case 'image/jpeg':
      return FileType.JPEG

    case 'image/png':
      return FileType.PNG

    case 'image/tiff':
    case 'image/tif':
      return FileType.TIFF

    // DOCX (all known variants)
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.ms-word.document.12':
      return FileType.DOCX

    // DOC (all known variants)
    case 'application/msword':
    case 'application/vnd.ms-word':
      return FileType.DOC

    // Markdown
    case 'text/markdown':
      return FileType.MD

    // Plain text
    case 'text/plain':
      return FileType.TXT

    default:
      return FileType.FILE
  }
}

/**
 * Get the file type from a filename
 * @param filename - The filename string (e.g., 'document.pdf')
 * @returns The file type enum value
 */
export function getFileTypeFromFilename(filename: string): FileType {
  const parts = filename.split('.')
  const ext = parts.pop()?.toLowerCase()

  if (!ext) {
    return FileType.FILE
  }

  if (ext === 'pdf') return FileType.PDF
  if (['jpg', 'jpeg'].includes(ext)) return FileType.JPEG
  if (ext === 'png') return FileType.PNG
  if (['tif', 'tiff'].includes(ext)) return FileType.TIFF
  if (ext === 'docx') return FileType.DOCX
  if (ext === 'doc') return FileType.DOC
  if (ext === 'md' || ext === 'markdown') return FileType.MD
  if (ext === 'txt' || ext === 'text') return FileType.TXT

  return FileType.FILE
}

/**
 * Get file type from either contentType or filename
 * Prioritizes contentType if available, falls back to filename
 * @param contentType - The MIME type string (optional)
 * @param filename - The filename string (optional)
 * @returns The file type enum value
 */
export const getFileTypeFromContent = (contentType?: string, filename?: string): FileType => {
  if (contentType) {
    return getFileType(contentType)
  }
  if (filename) {
    return getFileTypeFromFilename(filename)
  }
  return FileType.FILE
}
