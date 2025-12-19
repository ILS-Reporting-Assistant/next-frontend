import React, { useEffect, useState, useCallback } from 'react'
import { ReportCard } from './ReportCard'
import { extractErrorMessage, reportService } from '@app/services'
import { Report, NotesProps } from '@app/types'
import { Box, Notification, Spacer, Spin, Text } from '@app/components'
import { useInView } from 'react-intersection-observer'
import { StyledLoadingContainer, StyledEmptyStateContainer, StyledPaginationContainer } from './elements'
import { isValidationError } from '../../libs/utils'

export const Notes: React.FC<NotesProps> = ({ clientId }) => {
  const [reports, setReports] = useState<Report[]>([])
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  })

  const fetchReports = useCallback(
    async (cursor?: string) => {
      if (!clientId || loading) return

      setLoading(true)
      try {
        const response = await reportService.getReportsByClientId(clientId, {
          cursor,
          limit: 10,
        })
        if (cursor) {
          setReports((prev) => [...prev, ...response.reports])
        } else {
          setReports(response.reports)
        }
        setNextCursor(response.nextCursor)
        setHasMore(response.hasMore)
      } catch (error) {
        if (isValidationError(error)) return

        Notification({
          message: 'Failed to fetch notes',
          description: extractErrorMessage(error),
          type: 'error',
        })
      } finally {
        setLoading(false)
        setInitialLoad(false)
      }
    },
    [clientId, loading],
  )

  useEffect(() => {
    // Reset state when clientId changes
    setReports([])
    setNextCursor(undefined)
    setHasMore(false)
    setInitialLoad(true)
  }, [clientId])

  useEffect(() => {
    if (clientId && initialLoad) {
      fetchReports()
    }
  }, [clientId, initialLoad, fetchReports])

  useEffect(() => {
    if (inView && hasMore && !loading && nextCursor) {
      fetchReports(nextCursor)
    }
  }, [inView, hasMore, loading, nextCursor, fetchReports])

  if (!clientId) {
    return null
  }

  if (initialLoad && loading) {
    return (
      <StyledLoadingContainer>
        <Spin />
      </StyledLoadingContainer>
    )
  }

  if (!loading && reports.length === 0) {
    return (
      <StyledEmptyStateContainer>
        <Text type="secondary">No notes available</Text>
      </StyledEmptyStateContainer>
    )
  }

  return (
    <Box>
      {reports.map((report) => (
        <React.Fragment key={report._id}>
          <ReportCard report={report} kind={'notes'} />
          <Spacer value={16} />
        </React.Fragment>
      ))}
      {hasMore && <StyledPaginationContainer ref={ref}>{loading && <Spin />}</StyledPaginationContainer>}
    </Box>
  )
}
