'use client'

import { useState, useCallback } from 'react'
import { Notification } from '@app/components'
import { reportService, extractErrorMessage } from '@app/services'
import type { UseDownloadReportOptions, UseDownloadReportReturn } from '@app/types'

export function useDownloadReport(options?: UseDownloadReportOptions): UseDownloadReportReturn {
  const { showSuccessNotification = false, onDownloadStart, onDownloadSuccess, onDownloadError } = options || {}

  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)

  const downloadDocx = useCallback(
    async (content: string, fileName?: string) => {
      if (!content) return

      setIsDownloadingDocx(true)
      onDownloadStart?.()

      try {
        const blob = await reportService.generateDocument(content)
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${fileName || 'assessment-report'}.docx`
        a.click()
        window.URL.revokeObjectURL(url)

        if (showSuccessNotification) {
          Notification({
            message: 'Download started',
            type: 'success',
          })
        }

        onDownloadSuccess?.()
      } catch (error) {
        const errorMessage = error as Error
        Notification({
          message: 'Failed to download report',
          description: extractErrorMessage(errorMessage),
          type: 'error',
        })
        onDownloadError?.(errorMessage)
      } finally {
        setIsDownloadingDocx(false)
      }
    },
    [showSuccessNotification, onDownloadStart, onDownloadSuccess, onDownloadError],
  )

  const downloadPdf = useCallback(
    async (content: string, fileName?: string) => {
      if (!content) return

      setIsDownloadingPdf(true)
      onDownloadStart?.()

      try {
        const blob = await reportService.generatePDFDocument(content)
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${fileName || 'assessment-report'}.pdf`
        a.click()
        window.URL.revokeObjectURL(url)

        if (showSuccessNotification) {
          Notification({
            message: 'Download started',
            type: 'success',
          })
        }

        onDownloadSuccess?.()
      } catch (error) {
        const errorMessage = error as Error
        Notification({
          message: 'Failed to download report',
          description: extractErrorMessage(errorMessage),
          type: 'error',
        })
        onDownloadError?.(errorMessage)
      } finally {
        setIsDownloadingPdf(false)
      }
    },
    [showSuccessNotification, onDownloadStart, onDownloadSuccess, onDownloadError],
  )

  return {
    downloadDocx,
    downloadPdf,
    isDownloadingDocx,
    isDownloadingPdf,
    isDownloading: isDownloadingDocx || isDownloadingPdf,
  }
}
