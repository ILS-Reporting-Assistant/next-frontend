import { Box, Dropdown, Icon, Menu, MenuItem, Notification } from '@app/components'
import { useEffect, useState } from 'react'
import { extractErrorMessage } from '../../../libs/services/auth'
import { reportService } from '../../../libs/services/report'
import { ReviewReviceProps } from '@app/types'
import { ReportType } from '@app/enums'
import {
  StyledAIRevisionsHeading,
  StyledAIRevisionsInput,
  StyledAIRevisionsSection,
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledCopyButton,
  StyledCopyDownloadContainer,
  StyledDownloadButton,
  StyledSaveButton,
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
  StyledReviseButton,
  StyledReviseButtonWrapper,
  StyledStep4ReviewContentWrapper,
  StyledStep4ReviewDescription,
  StyledStep4ReviewHeading,
  StyledStep4StepText,
} from './elements'

export const ReviewRevice = ({
  onGoBack,
  defaultReportName = 'Progress Report 11/25',
  defaultReportContent,
  originalContent = '',
  onReportNameChange,
  onReportContentChange,
  onSaveReport,
  isSaving = false,
  reportType = ReportType.PROGRESS,
}: ReviewReviceProps) => {
  const [reportName, setReportName] = useState(defaultReportName)
  const [reportContent, setReportContent] = useState(defaultReportContent)
  const [revisionRequest, setRevisionRequest] = useState('')
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false)
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)
  const [isRequestingRevision, setIsRequestingRevision] = useState(false)

  // Update local state when props change
  useEffect(() => {
    setReportName(defaultReportName)
  }, [defaultReportName])

  useEffect(() => {
    setReportContent(defaultReportContent)
  }, [defaultReportContent])

  const handleRequestAIRevision = async () => {
    if (!revisionRequest.trim()) {
      Notification({
        message: 'Revision request is required',
        description: 'Please enter what you would like to be changed',
        type: 'error',
      })
      return
    }

    if (!reportContent) {
      Notification({
        message: 'Report content is missing',
        description: 'Cannot request revision without report content',
        type: 'error',
      })
      return
    }

    // Use reportContent as fallback for originalContent if not provided
    const contentToUseAsOriginal = originalContent || reportContent

    setIsRequestingRevision(true)
    try {
      const result = await reportService.requestAIRevision(
        contentToUseAsOriginal,
        reportContent,
        revisionRequest,
        reportType,
      )

      const revisedContent = result.revisedContent || reportContent
      setReportContent(revisedContent)

      if (onReportContentChange) {
        onReportContentChange(revisedContent)
      }

      Notification({
        message: 'Report revised successfully',
        type: 'success',
      })

      // Clear the revision request input
      setRevisionRequest('')
    } catch (error) {
      Notification({
        message: 'Failed to revise report',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsRequestingRevision(false)
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reportContent)
    // You can add a notification here if needed
    Notification({
      message: 'Copied to clipboard',
      type: 'success',
    })
  }

  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true)
    try {
      const blob = await reportService.generateDocument(reportContent)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'assessment-report.docx'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      Notification({
        message: 'Failed to download report',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsDownloadingDocx(false)
    }
  }

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true)
    try {
      const blob = await reportService.generatePDFDocument(reportContent)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'assessment-report.pdf'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      Notification({
        message: 'Failed to download report',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsDownloadingPdf(false)
    }
  }

  const handleSaveReport = async () => {
    if (!onSaveReport) return

    try {
      await onSaveReport()
    } catch (error) {
      // Error is already handled in the parent component
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

  return (
    <>
      <StyledStep4StepText>Step 4 of 4: Review & Revise</StyledStep4StepText>

      <StyledStep4ReviewContentWrapper>
        <StyledStep4ReviewHeading level={3}>Review & Perfect Your Report</StyledStep4ReviewHeading>

        <StyledStep4ReviewDescription>
          Need to revise something? I'm here to help make it perfect!
        </StyledStep4ReviewDescription>

        <Box>
          <StyledFinalReportHeading>
            <StyledIconWithRightMargin>
              <Icon.FileTextOutlined />
            </StyledIconWithRightMargin>
            Your Final Report
          </StyledFinalReportHeading>

          <StyledReportNameLabel>Report Name</StyledReportNameLabel>
          <StyledReportNameInput
            type="text"
            value={reportName}
            onChange={(e) => {
              setReportName(e.target.value)
              if (onReportNameChange) {
                onReportNameChange(e.target.value)
              }
            }}
          />

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
              onChange={(e) => {
                setReportContent(e.target.value)
                if (onReportContentChange) {
                  onReportContentChange(e.target.value)
                }
              }}
            />
          </StyledReportContentWrapper>
        </Box>

        <StyledAIRevisionsSection>
          <StyledAIRevisionsHeading>
            <StyledIconWithRightMargin>
              <Icon.EditOutlined />
            </StyledIconWithRightMargin>
            Request AI Revisions
          </StyledAIRevisionsHeading>

          <StyledAIRevisionsInput
            placeholder="Tell me what you'd like to be changed."
            value={revisionRequest}
            onChange={(e) => setRevisionRequest(e.target.value)}
          />

          <StyledReviseButtonWrapper>
            <StyledReviseButton
              type="primary"
              icon={<Icon.BulbOutlined />}
              onClick={handleRequestAIRevision}
              loading={isRequestingRevision}
              disabled={isRequestingRevision || !revisionRequest.trim()}
            >
              Revise with AI
            </StyledReviseButton>
          </StyledReviseButtonWrapper>
        </StyledAIRevisionsSection>
      </StyledStep4ReviewContentWrapper>

      <StyledButtonWrapper>
        <StyledButtonContainer>
          <StyledButtonContainerWrapper>
            <StyledGoBackButton onClick={onGoBack}>Go Back</StyledGoBackButton>
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
              {onSaveReport && (
                <StyledSaveButton
                  type="primary"
                  onClick={handleSaveReport}
                  loading={isSaving}
                  disabled={isSaving}
                  icon={<Icon.SaveOutlined />}
                >
                  Save Report
                </StyledSaveButton>
              )}
            </StyledCopyDownloadContainer>
          </StyledButtonContainerWrapper>
        </StyledButtonContainer>
      </StyledButtonWrapper>

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
          <StyledFullscreenReportContent
            rows={15}
            value={reportContent}
            onChange={(e) => {
              setReportContent(e.target.value)
              if (onReportContentChange) {
                onReportContentChange(e.target.value)
              }
            }}
          />
        </StyledFullscreenModalContent>
      </StyledFullscreenModal>
    </>
  )
}
