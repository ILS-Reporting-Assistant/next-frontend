import { Editor } from '@tiptap/react'

export interface TipTapProps {
  value?: string
  editor?: Editor | null
  showToolbar?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface UseCopyToClipboardConfig {
  editor?: Editor | null
  copyWithFormatting?: boolean
  hideWhenUnavailable?: boolean
  onCopied?: () => void
}
