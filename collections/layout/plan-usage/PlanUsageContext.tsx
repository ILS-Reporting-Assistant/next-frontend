import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { subscriptionsService } from '@app/services'
import { SubscriptionUsage } from '@app/types'

interface PlanUsageContextType {
  reportsUsed: number
  totalReports: number | null
  clientsUsed: number
  totalClients: number | null
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  usage: SubscriptionUsage | null
}

const PlanUsageContext = createContext<PlanUsageContextType | undefined>(undefined)

interface PlanUsageProviderProps {
  children: ReactNode
}

export const PlanUsageProvider: React.FC<PlanUsageProviderProps> = ({ children }) => {
  const [reportsUsed, setReportsUsed] = useState<number>(0)
  const [totalReports, setTotalReports] = useState<number | null>(null)
  const [clientsUsed, setClientsUsed] = useState<number>(0)
  const [totalClients, setTotalClients] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usage, setUsage] = useState<SubscriptionUsage | null>(null)
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
      const [usageResponse] = await Promise.all([subscriptionsService.getUsage(organizationId || undefined)])
      setUsage(usageResponse.data)
      setReportsUsed(usageResponse.data.usedReports)
      setTotalReports(usageResponse.data.totalReports)
      setClientsUsed(usageResponse.data.usedActiveClients)
      setTotalClients(usageResponse.data.maxActiveClients)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch report count')
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
        clientsUsed,
        totalClients,
        isLoading,
        error,
        refresh: fetchReportCount,
        usage,
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
