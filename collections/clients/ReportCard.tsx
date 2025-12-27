import React, { useState } from 'react'
import { DateText, Footer, Header, StyledCard, Title, UserName, StyledBadgeRibbon } from './elements'
import { Box, Dropdown, Icon, Menu, MenuItem, Notification, Popover, Spin, Tag, Text } from '@app/components'
import moment from 'moment'
import { getFullName, getFileTypeFromContent, truncateFileName } from '@app/utils'
import { ReportCardProps } from '@app/types'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { ReportType, UserRole } from '@app/enums'
import { useRouter } from 'next/router'
import { ROUTE } from '@app/data'
import { extractErrorMessage, reportService, storageService } from '@app/services'

export const ReportCard: React.FC<ReportCardProps> = ({ report, kind }) => {
  const router = useRouter()
  const { color, user } = useSelector((state: IStore) => state)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  // Support both old fileId and new fileIds for backward compatibility
  const firstFile = report.fileIds && report.fileIds.length > 0 ? report.fileIds[0] : report.fileId || null
  const fileType = getFileTypeFromContent(firstFile?.contentType, firstFile?.name)

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

  const reportContent = report?.content
  const reportName = report?.reportName

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

  // Get all files from report (supports both fileIds and fileId for backward compatibility)
  const getFilesFromReport = () => {
    const files: Array<{ _id: string; name: string; key?: string; contentType?: string; sizeBytes?: number }> = []
    if (report.fileIds && report.fileIds.length > 0) {
      files.push(...report.fileIds)
    } else if (report.fileId) {
      files.push(report.fileId)
    }
    return files
  }

  const FileItem: React.FC<{
    file: { _id: string; name: string; key?: string; contentType?: string; sizeBytes?: number }
  }> = ({ file }) => {
    const [loading, setLoading] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const handleView = async () => {
      setLoading(true)
      try {
        const { signedUrl } = await storageService.getSignedUrl(file._id, 'inline')
        window.open(signedUrl, '_blank')
      } catch (error) {
        Notification({
          message: 'Failed to open file',
          description: extractErrorMessage(error as Error),
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    const handleDownload = async () => {
      setDownloading(true)
      try {
        const { signedUrl } = await storageService.getSignedUrl(file._id, 'attachment')
        window.open(signedUrl, '_blank')
      } catch (error) {
        Notification({
          message: 'Failed to download file',
          description: extractErrorMessage(error as Error),
          type: 'error',
        })
      } finally {
        setDownloading(false)
      }
    }

    return (
      <DateText style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <Text type="secondary" style={{ fontSize: '12px', color: '#8c8c8c' }}>
          {file.name}
        </Text>
        <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Icon.EyeOutlined onClick={handleView} style={{ cursor: 'pointer', fontSize: '14px', color: '#8c8c8c' }} />
          )}
          {downloading ? (
            <Spin size="small" />
          ) : (
            <Icon.DownloadOutlined
              onClick={handleDownload}
              style={{ cursor: 'pointer', fontSize: '14px', color: '#8c8c8c' }}
            />
          )}
        </Box>
      </DateText>
    )
  }

  const files = kind === 'notes' ? getFilesFromReport() : []

  const renderCardContent = () => (
    <>
      <Popover content={reportName}>
        <Title>{truncateFileName(reportName)}</Title>
      </Popover>

      {firstFile && <Tag color="red">{fileType}</Tag>}

      {kind === 'notes' && files.length > 0 && (
        <Box style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {files.map((file) => (
            <FileItem key={file._id} file={file} />
          ))}
        </Box>
      )}

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
