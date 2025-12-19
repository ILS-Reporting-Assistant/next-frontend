'use client'

import { useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import { Markdown } from '@tiptap/markdown'
import { useCallback, useEffect } from 'react'
import { useCopyToClipboard } from './copy-to-clipboard-button'
import { Notification } from '@app/components'
import type { UseReportEditorOptions, UseReportEditorReturn } from '@app/types'
import type { Editor } from '@tiptap/react'

export function useReportEditor(options?: UseReportEditorOptions): UseReportEditorReturn {
  const {
    content = '',
    editable = false,
    onUpdate,
    immediatelyRender = false,
    enableCopyToClipboard = false,
    onCopied,
  } = options || {}

  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (onUpdate) {
        const markdown = editor.getMarkdown() || ''
        onUpdate(markdown)
      }
    },
    [onUpdate],
  )

  const editor = useEditor({
    extensions: [StarterKit, Underline, HorizontalRule, Markdown],
    content: content || '',
    editable,
    immediatelyRender,
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
    onUpdate: onUpdate ? handleUpdate : undefined,
  })

  // Sync editor content when content prop changes
  useEffect(() => {
    if (editor && content !== undefined) {
      const currentContent = editor.getMarkdown() || ''
      if (currentContent !== content) {
        editor.commands.setContent(content || '', { contentType: 'markdown' })
      }
    }
  }, [editor, content])

  // Set up copy to clipboard if enabled
  const { handleCopyToClipboard: copyHandler } = useCopyToClipboard(
    enableCopyToClipboard
      ? {
          editor,
          copyWithFormatting: true,
          hideWhenUnavailable: false,
          onCopied:
            onCopied ||
            (() => {
              Notification({
                message: 'Copied to clipboard',
                type: 'success',
              })
            }),
        }
      : undefined,
  )

  return {
    editor,
    handleCopyToClipboard: enableCopyToClipboard ? copyHandler : undefined,
  }
}
