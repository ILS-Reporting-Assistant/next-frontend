import { Box, Dropdown, Icon, Menu, MenuItem, Notification } from '@app/components'
import { ROUTE } from '@app/data'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { extractErrorMessage, reportService } from '@app/services'
import {
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledCopyButton,
  StyledCopyDownloadContainer,
  StyledDownloadButton,
  StyledFinalReportHeading,
  StyledFullscreenButton,
  StyledFullscreenModal,
  StyledFullscreenModalContent,
  StyledFullscreenReportContent,
  StyledFullscreenReportName,
  StyledGoBackButton,
  StyledIconWithRightMargin,
  StyledReportContentLabel,
  StyledReportContentLabelWrapper,
  StyledReportContentTextArea,
  StyledReportContentWrapper,
  StyledReportNameInput,
  StyledReportNameLabel,
  StyledStep4ReviewContentWrapper,
  StyledStep4ReviewDescription,
  StyledStep4ReviewHeading,
  StyledBackLink,
  StyledBackIcon,
  StyledBackIconInner,
  StyledContainer,
  StyledContentWrapper,
} from 'collections/progress-reports/create-reports/elements'
import { ViewAssessmentReportProps } from '@app/types'

export const ViewAssessmentReport = ({ report }: ViewAssessmentReportProps) => {
  const router = useRouter()
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)

  const reportName = report?.reportName || ''
  const reportContent = report?.content || ''

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reportContent)
    Notification({
      message: 'Copied to clipboard',
      type: 'success',
    })
  }

  const handleDownloadDocx = async () => {
    if (!reportContent) return

    setIsDownloadingDocx(true)
    try {
      const blob = await reportService.generateDocument(reportContent)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportName || 'assessment-report'}.docx`
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
      a.download = `${reportName || 'assessment-report'}.pdf`
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

  const handleGoBack = () => {
    router.replace(ROUTE.ASSESSMENT_REPORTS)
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

  return (
    <>
      <StyledContainer>
        <StyledContentWrapper>
          <StyledBackLink href={ROUTE.ASSESSMENT_REPORTS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink>

          <StyledStep4ReviewContentWrapper>
            <StyledStep4ReviewHeading level={3}>Assessment Report</StyledStep4ReviewHeading>

            <StyledStep4ReviewDescription>View your assessment report details.</StyledStep4ReviewDescription>

            <Box>
              <StyledFinalReportHeading>
                <StyledIconWithRightMargin>
                  <Icon.FileTextOutlined />
                </StyledIconWithRightMargin>
                Your Final Report
              </StyledFinalReportHeading>

              <StyledReportNameLabel>Report Name</StyledReportNameLabel>
              <StyledReportNameInput type="text" value={reportName} readOnly disabled />

              <StyledReportContentLabelWrapper>
                <StyledReportContentLabel>Report Content</StyledReportContentLabel>
                <StyledFullscreenButton
                  size="small"
                  icon={<Icon.FullscreenOutlined />}
                  onClick={() => setIsFullscreenOpen(true)}
                >
                  View in Fullscreen
                </StyledFullscreenButton>
              </StyledReportContentLabelWrapper>

              <StyledReportContentWrapper>
                <StyledReportContentTextArea
                  rows={10}
                  value={reportContent}
                  readOnly
                  disabled
                  style={{ backgroundColor: '#f5f5f5', cursor: 'default' }}
                />
              </StyledReportContentWrapper>
            </Box>
          </StyledStep4ReviewContentWrapper>

          <StyledButtonWrapper>
            <StyledButtonContainer>
              <StyledButtonContainerWrapper>
                <StyledGoBackButton onClick={handleGoBack}>Go Back</StyledGoBackButton>
                <StyledCopyDownloadContainer>
                  <StyledCopyButton onClick={handleCopyToClipboard}>Copy To Clipboard</StyledCopyButton>
                  <Dropdown overlay={downloadMenu} trigger={['click']}>
                    <StyledDownloadButton
                      loading={isDownloadingDocx || isDownloadingPdf}
                      disabled={isDownloadingDocx || isDownloadingPdf}
                    >
                      Download Report <Icon.DownOutlined />
                    </StyledDownloadButton>
                  </Dropdown>
                </StyledCopyDownloadContainer>
              </StyledButtonContainerWrapper>
            </StyledButtonContainer>
          </StyledButtonWrapper>
        </StyledContentWrapper>
      </StyledContainer>

      <StyledFullscreenModal
        open={isFullscreenOpen}
        onCancel={() => setIsFullscreenOpen(false)}
        footer={null}
        width="95%"
        centered={true}
        closeIcon={<Icon.FullscreenExitOutlined />}
        title={
          <StyledFullscreenReportName>
            <StyledIconWithRightMargin>
              <Icon.FileTextOutlined />
            </StyledIconWithRightMargin>
            {reportName}
          </StyledFullscreenReportName>
        }
      >
        <StyledFullscreenModalContent>
          <StyledFullscreenReportContent rows={15} value={reportContent} readOnly disabled />
        </StyledFullscreenModalContent>
      </StyledFullscreenModal>
    </>
  )
}
