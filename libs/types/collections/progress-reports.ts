import { Report } from '../api/reports'

export interface SuccessProps {
  onComplete?: () => void
  isExtracting?: boolean
  apiSuccess?: boolean
}

export interface ProgressStep {
  id: number
  text: string
  completed: boolean
}

export interface ViewProgressReportProps {
  report: Report
}
