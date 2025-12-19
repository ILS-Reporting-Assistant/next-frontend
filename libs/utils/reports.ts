import { ReportType } from '@app/enums'

/**
 * Get the color for a report type badge
 * @param reportType - The report type enum
 * @returns The color string for the badge
 */
export const getReportTypeColor = (reportType?: ReportType): string => {
  switch (reportType) {
    case ReportType.ASSESSMENT:
      return 'blue'
    case ReportType.PROGRESS:
      return 'green'
    case ReportType.ISP:
      return 'orange'
    default:
      return 'blue'
  }
}
