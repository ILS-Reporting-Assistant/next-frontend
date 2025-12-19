'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { useHotkeys } from 'react-hotkeys-hook'
import type { Transaction } from '@tiptap/pm/state'
import { TextSelection } from '@tiptap/pm/state'
import { Fragment, Slice } from '@tiptap/pm/model'

import { useTiptapEditor } from '@app/hooks'
import type { UseCopyToClipboardConfig } from '@app/types'

export const COPY_TO_CLIPBOARD_SHORTCUT_KEY = 'mod+c'

export async function writeToClipboard(textContent: string, htmlContent?: string): Promise<void> {
  try {
    if (htmlContent && navigator.clipboard && 'write' in navigator.clipboard) {
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const clipboardItem = new ClipboardItem({ 'text/html': blob })
      await navigator.clipboard.write([clipboardItem])
    }
  } catch {
    await navigator.clipboard.writeText(textContent)
  }
}

/**
 * Checks if content can be copied in the current editor state
 */
export function canCopyContent(tr: Transaction): boolean {
  const { selection } = tr
  const { empty } = selection

  if (empty) return false

  return true
}

export function canCopyToClipboard(editor: Editor | null): boolean {
  if (!editor) return false

  // For read-only editors, we can always copy the entire document
  if (!editor.isEditable) return true

  const tr = editor.state.tr
  return canCopyContent(tr)
}

export function extractContent(
  editor: Editor,
  copyWithFormatting = true,
): { textContent: string; htmlContent?: string } {
  const { selection } = editor.state
  const { $anchor } = selection

  if (selection.empty || !editor.isEditable) {
    const textContent = editor.getText()
    const htmlContent = copyWithFormatting ? editor.getHTML() : undefined
    return { textContent, htmlContent }
  }

  let content = selection.content()

  if (selection instanceof TextSelection) {
    const node = $anchor.node(1)

    content = new Slice(Fragment.from(node), 0, 0)
  }

  const textContent = content.content.textBetween(0, content.content.size, '\n')
  const htmlContent = copyWithFormatting ? editor.view.serializeForClipboard(content).dom.innerHTML : undefined

  return { textContent, htmlContent }
}

export async function copyToClipboard(editor: Editor | null, copyWithFormatting = true): Promise<boolean> {
  if (!editor) return false

  try {
    const { textContent, htmlContent } = extractContent(editor, copyWithFormatting)

    await writeToClipboard(textContent, htmlContent)
    return true
  } catch {
    return false
  }
}

export function shouldShowButton(props: { editor: Editor | null; hideWhenUnavailable: boolean }): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor) return false

  if (!editor.isEditable) return true

  if (hideWhenUnavailable && !editor.isActive('code')) {
    return canCopyToClipboard(editor)
  }

  return true
}

export function useCopyToClipboard(config?: UseCopyToClipboardConfig) {
  const { editor: providedEditor, copyWithFormatting = true, hideWhenUnavailable = false, onCopied } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const canCopyToClipboardState = canCopyToClipboard(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on('selectionUpdate', handleSelectionUpdate)

    return () => {
      editor.off('selectionUpdate', handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleCopyToClipboard = useCallback(async () => {
    if (!editor) return false

    const success = await copyToClipboard(editor, copyWithFormatting)
    if (success) {
      onCopied?.()
    }

    return success
  }, [editor, copyWithFormatting, onCopied])

  useHotkeys(
    COPY_TO_CLIPBOARD_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleCopyToClipboard()
    },
    {
      enabled: isVisible && canCopyToClipboardState,
      enableOnFormTags: true,
    },
  )

  return {
    isVisible,
    handleCopyToClipboard,
    canCopyToClipboard: canCopyToClipboardState,
    label: 'Copy to clipboard',
    // shortcutKeys: COPY_TO_CLIPBOARD_SHORTCUT_KEY,
  }
}
