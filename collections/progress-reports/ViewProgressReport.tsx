import { useDownloadReport, useReportEditor } from '@app/hooks'
import { Box, Button, Dropdown, Icon, Menu, MenuItem, Notification } from '@app/components'
import { ROUTE } from '@app/data'
import { ViewProgressReportProps } from '@app/types'
import {
  StyledBackIcon,
  StyledBackIconInner,
  StyledBackLink,
  StyledButton,
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledContainer,
  StyledContentWrapper,
  StyledCopyDownloadContainer,
  StyledFullscreenModal,
  StyledFullscreenModalContent,
  StyledFullscreenReadOnlyTipTap,
  StyledFullscreenReportName,
  StyledGoBackButton,
  StyledIconWithRightMargin,
  StyledReadOnlyTipTap,
  StyledReportContentLabel,
  StyledReportContentLabelWrapper,
  StyledReportContentWrapper,
  StyledReportNameInput,
  StyledReportNameLabel,
  StyledStep4ReviewContentWrapper,
  StyledStep4ReviewDescription,
  StyledStep4ReviewHeading,
} from 'collections/progress-reports/create-reports/elements'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const ViewProgressReport = ({ report }: ViewProgressReportProps) => {
  const router = useRouter()
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const { downloadDocx, downloadPdf, isDownloadingDocx, isDownloadingPdf } = useDownloadReport()

  const reportName = report?.reportName || ''
  const reportContent = report?.content || ''

  // Main editor for the regular view
  const { editor, handleCopyToClipboard } = useReportEditor({
    content: reportContent || '',
    editable: false,
    enableCopyToClipboard: true,
  })

  // Separate editor for the fullscreen modal
  const { editor: fullscreenEditor } = useReportEditor({
    content: reportContent || '',
    editable: false,
  })

  const handleDownloadDocx = async () => {
    if (!reportContent) return
    await downloadDocx(reportContent, reportName || 'progress-report')
  }

  const handleDownloadPdf = async () => {
    if (!reportContent) return
    await downloadPdf(reportContent, reportName || 'progress-report')
  }

  const handleGoBack = () => {
    router.back()
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
          {/* <StyledBackLink href={ROUTE.PROGRESS_REPORTS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink> */}

          <StyledStep4ReviewContentWrapper>
            <StyledStep4ReviewHeading level={3}>Progress Report</StyledStep4ReviewHeading>

            <StyledStep4ReviewDescription>View your progress report details.</StyledStep4ReviewDescription>

            <Box>
              {/* <StyledFinalReportHeading>
                <StyledIconWithRightMargin>
                  <Icon.FileTextOutlined />
                </StyledIconWithRightMargin>
                Your Final Report
              </StyledFinalReportHeading> */}

              <StyledReportNameLabel>Report Name</StyledReportNameLabel>
              <StyledReportNameInput type="text" value={reportName} readOnly disabled />

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
                <StyledReadOnlyTipTap editor={editor} value={reportContent} showToolbar={false} />
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
          </StyledStep4ReviewContentWrapper>

          <StyledButtonWrapper>
            <StyledButtonContainer>
              <StyledButtonContainerWrapper>
                <StyledGoBackButton onClick={handleGoBack}>Go Back</StyledGoBackButton>
                <StyledCopyDownloadContainer>
                  {/* <StyledCopyButton onClick={handleCopyToClipboard}>Copy To Clipboard</StyledCopyButton>
                  <Dropdown overlay={downloadMenu} trigger={['click']}>
                    <StyledDownloadButton
                      loading={isDownloadingDocx || isDownloadingPdf}
                      disabled={isDownloadingDocx || isDownloadingPdf}
                    >
                      Download Report <Icon.DownOutlined />
                    </StyledDownloadButton>
                  </Dropdown> */}
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
          <StyledFullscreenReadOnlyTipTap editor={fullscreenEditor} value={reportContent} showToolbar={false} />
        </StyledFullscreenModalContent>
      </StyledFullscreenModal>
    </>
  )
}
