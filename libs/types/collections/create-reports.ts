import { ReportType } from '../../enums'
import { Client } from '../api/clients'

export interface CreateReportsProps {
  title: string
  backRoute: string
  stepTitles: {
    step1: string
    step2: string
    step3: string
    step4: string
  }
}

export interface GenerateAssessmentReportResponse {
  originalContent: string
  content: string
  fileIds?: string[]
}

export interface SaveReportPayload {
  organizationId?: string
  clientId: string
  reportType: ReportType
  reportName: string
  fileIds?: string[]
  originalContent: string
  content: string
  skills?: string[]
  parentReportId?: string
}

export interface SaveReportResponse {
  _id: string
  userId: string
  organizationId?: string | null
  clientId: string
  reportType: string
  reportName: string
  fileIds?: string[]
  originalContent: string
  content: string
  skills?: string[]
  parentReportId?: string | null
  createdAt: string
  updatedAt: string
}

export interface ComplianceNoticeProps {
  clients?: Client[]
  clientsLoading?: boolean
  selectedClient?: Client | null
  onClientChange?: (client: Client | null) => void
}

export interface ReviewReviceProps {
  onGoBack?: () => void
  defaultReportName?: string
  defaultReportContent?: string
  originalContent?: string
  onReportNameChange?: (name: string) => void
  onReportContentChange?: (content: string) => void
  onSaveReport?: () => Promise<void>
  isSaving?: boolean
  reportType?: ReportType
}

export interface SkillsProps {
  selectedSkills?: string[]
  onSkillsChange?: (skills: string[]) => void
}
