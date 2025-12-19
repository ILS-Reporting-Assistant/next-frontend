import React, { useState } from 'react'
import { DateText, Footer, Header, StyledCard, Title, UserName, StyledBadgeRibbon } from './elements'
import { Box, Dropdown, Icon, Menu, MenuItem, Notification, Popover, Tag, Text } from '@app/components'
import moment from 'moment'
import { getAvatarText, getFullName, getReportTypeColor, getFileTypeFromContent, truncateFileName } from '@app/utils'
import { ReportCardProps } from '@app/types'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { Avatar } from 'antd'
import { ReportType, UserRole } from '@app/enums'
import { useRouter } from 'next/router'
import { ROUTE } from '@app/data'
import { extractErrorMessage, reportService } from '@app/services'

export const ReportCard: React.FC<ReportCardProps> = ({ report, kind }) => {
  const router = useRouter()
  const { color, user } = useSelector((state: IStore) => state)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const fileType = getFileTypeFromContent(report.fileId?.contentType, report.fileId?.name)

  const viewReport = () => {
    if (report?.reportType === ReportType.ASSESSMENT) {
      router.push(`${ROUTE.VIEW_ASSESSMENT_REPORT}?reportId=${report._id}`)
    } else if (report?.reportType === ReportType.ISP) {
      router.push(`${ROUTE.VIEW_ISP_REVIEW}?reportId=${report._id}`)
    } else {
      router.push(`${ROUTE.VIEW_PROGRESS_REPORT}?reportId=${report._id}`)
    }
  }

  const reportTypes = () => {
    if (report.reportType === 'assessment') {
      return 'Initial Assessment Report'
    } else if (report.reportType === 'progress') {
      return 'Progress Report'
    } else {
      return 'Annual ISP Review'
    }
  }

  const reportContent = kind === 'notes' ? report?.originalContent : report?.content
  const reportName = kind === 'notes' ? report?.fileId?.name : report?.reportName

  const handleDownloadDocx = async () => {
    if (!reportContent) return

    setIsDownloadingDocx(true)
    try {
      const blob = await reportService.generateDocument(reportContent)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportName || 'progress-report'}.docx`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      Notification({
        message: 'Failed to download report',
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setIsDownloadingDocx(false)
    }
  }

  const handleDownloadPdf = async () => {
    if (!reportContent) return

    setIsDownloadingPdf(true)
    try {
      const blob = await reportService.generatePDFDocument(reportContent)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportName || 'progress-report'}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      Notification({
        message: 'Failed to download report',
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  const downloadMenu = (
    <Menu>
      <MenuItem key="docx" onClick={() => handleDownloadDocx()} disabled={isDownloadingDocx || isDownloadingPdf}>
        {isDownloadingDocx ? 'Downloading...' : 'Word Document (.docx)'}
      </MenuItem>
      <MenuItem key="pdf" onClick={() => handleDownloadPdf()} disabled={isDownloadingDocx || isDownloadingPdf}>
        {isDownloadingPdf ? 'Downloading...' : 'PDF (.pdf)'}
      </MenuItem>
    </Menu>
  )
  const title = kind === 'notes' ? report?.fileId?.name || 'Untitled Report' : report.reportName || 'Untitled Report'

  const renderCardContent = () => (
    <>
      <Popover content={title}>
        <Title>{truncateFileName(title)}</Title>
      </Popover>

      {report.fileId && <Tag color="red">{fileType}</Tag>}

      <Header>
        <DateText>{moment(report.createdAt).format('DD MMM YYYY')}</DateText>
        <Box>
          <Popover content={'View'}>
            <Icon.EyeOutlined onClick={viewReport} style={{ marginRight: '12px' }} />
          </Popover>
          <Popover content={'Download'}>
            <Dropdown overlay={downloadMenu} trigger={['click']}>
              <Icon.DownloadOutlined />
            </Dropdown>
          </Popover>
        </Box>
      </Header>

      <Footer>
        {user?.role !== UserRole.USER && (
          <>
            <Text>Uploaded By:</Text>
            <UserName>{getFullName(report.userId)}</UserName>
          </>
        )}
      </Footer>
    </>
  )

  return kind === 'notes' ? (
    <StyledBadgeRibbon text={reportTypes() || 'Report'} color={color.primary}>
      <StyledCard>{renderCardContent()}</StyledCard>
    </StyledBadgeRibbon>
  ) : (
    <StyledCard>{renderCardContent()}</StyledCard>
  )
}
