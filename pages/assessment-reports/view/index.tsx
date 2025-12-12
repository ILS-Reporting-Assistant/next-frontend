import { ViewAssessmentReport } from '~collections'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { reportService, extractErrorMessage } from '@app/services'
import { Report } from '@app/types'
import { Notification, Box, Spin } from '@app/components'
import { isValidationError } from '@app/utils'

export default function ViewAssessmentReportPage() {
  const router = useRouter()
  const { reportId } = router.query
  const [report, setReport] = useState<Report | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      if (!reportId || typeof reportId !== 'string') {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const fetchedReport = await reportService.getReportById(reportId)
        setReport(fetchedReport)
      } catch (error) {
        if (isValidationError(error)) return

        Notification({
          message: 'Failed to fetch report',
          description: extractErrorMessage(error as Error),
          type: 'error',
        })
        router.replace('/assessment-reports')
      } finally {
        setLoading(false)
      }
    }

    fetchReport()
  }, [reportId, router])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Spin size="large" />
      </Box>
    )
  }

  if (!report) {
    return null
  }

  return <ViewAssessmentReport report={report} />
}
