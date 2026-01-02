import { Box, Button, Dropdown, Icon, Menu, MenuItem, Notification } from '@app/components'
import { useEffect, useState, useRef } from 'react'
import { extractErrorMessage } from '../../../libs/services/auth'
import { reportService } from '../../../libs/services/report'
import { ReviewReviceProps } from '@app/types'
import { ReportType } from '@app/enums'
import { progressSteps } from '@app/utils'
import { StarsAnimation } from 'public/images'
import {
  StyledAIRevisionsHeading,
  StyledAIRevisionsInput,
  StyledAIRevisionsSection,
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledCopyDownloadContainer,
  StyledSaveButton,
  StyledFullscreenModal,
  StyledFullscreenModalContent,
  StyledFullscreenReportName,
  StyledGoBackButton,
  StyledIconWithRightMargin,
  StyledReportContentLabel,
  StyledReportContentLabelWrapper,
  StyledReportContentWrapper,
  StyledReportNameInput,
  StyledReportNameLabel,
  StyledReviseButton,
  StyledReviseButtonWrapper,
  StyledStep4ReviewContentWrapper,
  StyledStep4ReviewDescription,
  StyledStep4ReviewHeading,
  StyledStep4StepText,
  StyledButton,
  StyledReadOnlyTipTap,
  StyledFullscreenReadOnlyTipTap,
  StyledSuccessOverlay,
  StyledSuccessOverlayContent,
  StyledStarIconContainer,
} from './elements'
import { useReportEditor } from '@app/hooks'

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
  const [showRevisionSuccess, setShowRevisionSuccess] = useState(false)
  const [revisionApiSuccess, setRevisionApiSuccess] = useState(false)
  const [steps, setSteps] = useState(progressSteps)
  const sequenceStartedRef = useRef(false)

  // Main editor for the regular view
  const { editor, handleCopyToClipboard } = useReportEditor({
    content: reportContent || '',
    editable: true,
    enableCopyToClipboard: true,
    onUpdate: (markdown) => {
      setReportContent(markdown)
      if (onReportContentChange) {
        onReportContentChange(markdown)
      }
    },
  })

  // Fullscreen editor
  const { editor: fullscreenEditor } = useReportEditor({
    content: reportContent || '',
    editable: true,
    onUpdate: (markdown) => {
      setReportContent(markdown)
      if (onReportContentChange) {
        onReportContentChange(markdown)
      }
    },
  })

  // Update local state when props change
  useEffect(() => {
    setReportName(defaultReportName)
  }, [defaultReportName])

  useEffect(() => {
    setReportContent(defaultReportContent)
  }, [defaultReportContent])

  // Reset steps when extraction starts
  useEffect(() => {
    if (isRequestingRevision && !revisionApiSuccess) {
      setSteps(progressSteps)
      sequenceStartedRef.current = false
    }
  }, [isRequestingRevision, revisionApiSuccess])

  // When API call succeeds, start completing steps sequentially
  useEffect(() => {
    if (revisionApiSuccess && !isRequestingRevision && !sequenceStartedRef.current) {
      sequenceStartedRef.current = true

      // Complete first step immediately when API succeeds
      setSteps((prev) => prev.map((step) => (step.id === 1 ? { ...step, completed: true } : step)))

      // Complete second step after delay
      const timer2 = setTimeout(() => {
        setSteps((prev) => prev.map((step) => (step.id === 2 ? { ...step, completed: true } : step)))

        // Complete third step after delay
        const timer3 = setTimeout(() => {
          setSteps((prev) => prev.map((step) => (step.id === 3 ? { ...step, completed: true } : step)))

          // When all steps are completed, call onComplete
          const timer4 = setTimeout(() => {
            handleRevisionSuccessComplete()
          }, 2000)

          return () => clearTimeout(timer4)
        }, 1000)

        return () => clearTimeout(timer3)
      }, 1000)

      return () => clearTimeout(timer2)
    }
  }, [revisionApiSuccess, isRequestingRevision])

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

    setShowRevisionSuccess(true)
    setIsRequestingRevision(true)
    setRevisionApiSuccess(false)

    try {
      const result = await reportService.requestAIRevision(
        contentToUseAsOriginal,
        reportContent,
        revisionRequest,
        reportType,
        (progress) => {
          if (progress.stage === 'completed') {
            setRevisionApiSuccess(true)
            setIsRequestingRevision(false)
          }
        },
      )

      const revisedContent = result.revisedContent || reportContent
      setReportContent(revisedContent)

      if (onReportContentChange) {
        onReportContentChange(revisedContent)
      }

      if (!revisionApiSuccess) {
        setRevisionApiSuccess(true)
      }
      setIsRequestingRevision(false)

      Notification({
        message: 'Report revised successfully',
        type: 'success',
      })
      setRevisionRequest('')
    } catch (error) {
      setShowRevisionSuccess(false)
      setRevisionApiSuccess(false)
      Notification({
        message: 'Failed to revise report',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsRequestingRevision(false)
    }
  }

  const handleDownloadDocx = async () => {
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
      a.download = `${reportName || 'progress-report'}.pdf`
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

  const handleRevisionSuccessComplete = () => {
    setShowRevisionSuccess(false)
    setRevisionApiSuccess(false)
  }

  return (
    <>
      <StyledStep4StepText>Step 4 of 4: Review & Revise</StyledStep4StepText>

      <StyledStep4ReviewContentWrapper>
        <StyledStep4ReviewHeading level={3}>Review & Perfect Your Report</StyledStep4ReviewHeading>

        <StyledStep4ReviewDescription>
          Need to revise something? I'm here to help make it perfect!
        </StyledStep4ReviewDescription>

        <Box>
          {/* <StyledFinalReportHeading>
            <StyledIconWithRightMargin>
              <Icon.FileTextOutlined />
            </StyledIconWithRightMargin>
            Your Final Report
          </StyledFinalReportHeading> */}

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
            {/* <StyledFullscreenButton
              size="small"
              icon={<Icon.FullscreenOutlined />}
              onClick={() => setIsFullscreenOpen(true)}
            >
              View in Fullscreen
            </StyledFullscreenButton> */}
          </StyledReportContentLabelWrapper>

          <StyledReportContentWrapper>
            <StyledReadOnlyTipTap editor={editor} value={reportContent} showToolbar={true} />
            {showRevisionSuccess && (
              <StyledSuccessOverlay>
                <StyledSuccessOverlayContent>
                  <StyledStarIconContainer>
                    <StarsAnimation />
                  </StyledStarIconContainer>
                </StyledSuccessOverlayContent>
              </StyledSuccessOverlay>
            )}
            <Box marginTop="8px">
              <Button type="default" icon={<Icon.CopyOutlined />} onClick={handleCopyToClipboard} />
              <Dropdown overlay={downloadMenu} trigger={['click']}>
                <StyledButton
                  type="default"
                  icon={<Icon.DownloadOutlined />}
                  loading={isDownloadingDocx || isDownloadingPdf}
                  disabled={isDownloadingDocx || isDownloadingPdf}
                />
              </Dropdown>
              <Button type="default" icon={<Icon.FullscreenOutlined />} onClick={() => setIsFullscreenOpen(true)} />
            </Box>
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
            autoSize={{ minRows: 1, maxRows: 8 }}
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
              {/* <StyledCopyButton onClick={handleCopyToClipboard}>Copy To Clipboard</StyledCopyButton> */}
              {/* <Dropdown overlay={downloadMenu} trigger={['click']}>
                <StyledDownloadButton
                  loading={isDownloadingDocx || isDownloadingPdf}
                  disabled={isDownloadingDocx || isDownloadingPdf}
                >
                  Download Report <Icon.DownOutlined />
                </StyledDownloadButton>
              </Dropdown> */}
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
        width="85%"
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
          <StyledFullscreenReadOnlyTipTap
            editor={fullscreenEditor}
            value={reportContent}
            showToolbar={true}
            style={{ minHeight: '400px' }}
          />
        </StyledFullscreenModalContent>
      </StyledFullscreenModal>
    </>
  )
}
