import { Client, Report } from '@app/types'

export interface ViewClientProps {
  open: boolean
  setOpen: (open: boolean) => void
  client: Client | null
}

export interface ReportCardProps {
  report: Report
  kind?: string
}

export interface NotesProps {
  clientId?: string
}

export interface StatusTimelineProps {
  clientId?: string
}
