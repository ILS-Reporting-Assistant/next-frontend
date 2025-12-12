import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { reportService } from '@app/services'

interface PlanUsageContextType {
  reportsUsed: number
  totalReports: number
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const PlanUsageContext = createContext<PlanUsageContextType | undefined>(undefined)

interface PlanUsageProviderProps {
  children: ReactNode
}

export const PlanUsageProvider: React.FC<PlanUsageProviderProps> = ({ children }) => {
  const [reportsUsed, setReportsUsed] = useState<number>(0)
  const [totalReports, setTotalReports] = useState<number>(5)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const accessToken = useSelector((state: IStore) => state.user?.accessToken)
  const organizationId = useSelector((state: IStore) => state.user?.currentOrganizationId)
  const isLoggedIn = !!accessToken

  const fetchReportCount = useCallback(async () => {
    if (!isLoggedIn) {
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const data = await reportService.getReportCount(organizationId || undefined)
      setReportsUsed(data.reportsUsed)
      setTotalReports(data.totalReports)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report count')
      console.error('Error fetching report count:', err)
    } finally {
      setIsLoading(false)
    }
  }, [isLoggedIn, organizationId])

  useEffect(() => {
    if (isLoggedIn) {
      fetchReportCount()
    }
  }, [isLoggedIn, fetchReportCount])

  return (
    <PlanUsageContext.Provider
      value={{
        reportsUsed,
        totalReports,
        isLoading,
        error,
        refresh: fetchReportCount,
      }}
    >
      {children}
    </PlanUsageContext.Provider>
  )
}

export const usePlanUsage = (): PlanUsageContextType => {
  const context = useContext(PlanUsageContext)
  if (context === undefined) {
    throw new Error('usePlanUsage must be used within a PlanUsageProvider')
  }
  return context
}
