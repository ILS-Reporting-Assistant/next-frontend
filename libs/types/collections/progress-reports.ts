import { Report } from '../api/reports'

export interface SuccessProps {
  onComplete?: () => void
}

export interface ProgressStep {
  id: number
  text: string
  completed: boolean
}

export interface ViewProgressReportProps {
  report: Report
}
