import { Box, Icon, Dropdown, Menu, MenuItem } from '@app/components'
import { sampleReportContent } from '@app/data'
import { ReviewReviceProps } from '@app/types'
import React, { useState } from 'react'
import {
  StyledStep4StepText,
  StyledStep4ReviewHeading,
  StyledStep4ReviewDescription,
  StyledFinalReportHeading,
  StyledReportNameLabel,
  StyledReportNameInput,
  StyledReportContentLabelWrapper,
  StyledReportContentLabel,
  StyledReportContentWrapper,
  StyledReportContentTextArea,
  StyledFullscreenButton,
  StyledAIRevisionsSection,
  StyledAIRevisionsHeading,
  StyledAIRevisionsInput,
  StyledReviseButtonWrapper,
  StyledReviseButton,
  StyledButtonWrapper,
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledGoBackButton,
  StyledCopyDownloadContainer,
  StyledCopyButton,
  StyledDownloadButton,
  StyledFullscreenModalContent,
  StyledFullscreenReportName,
  StyledFullscreenReportContent,
  StyledStep4ReviewContentWrapper,
  StyledIconWithRightMargin,
  StyledFullscreenModal,
} from './elements'

export const ReviewRevice = ({ onGoBack, defaultReportName = 'Progress Report 11/25', defaultReportContent = sampleReportContent }: ReviewReviceProps) => {
  const [reportName, setReportName] = useState(defaultReportName)
  const [reportContent, setReportContent] = useState(defaultReportContent)
  const [revisionRequest, setRevisionRequest] = useState('')
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const handleSuggestionClick = (suggestion: string) => {
    setRevisionRequest(suggestion)
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(reportContent)
    // You can add a notification here if needed
  }

  const downloadMenu = (
    <Menu>
      <MenuItem key="docx">Word Document (.docx)</MenuItem>
      <MenuItem key="pdf">PDF (.pdf)</MenuItem>
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
          <StyledReportNameInput type="text" value={reportName} onChange={(e) => setReportName(e.target.value)} />

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
            <StyledReportContentTextArea rows={10} value={reportContent} onChange={(e) => setReportContent(e.target.value)} />
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
              onClick={() => {
                // Handle AI revision request
              }}
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
                <StyledDownloadButton>
                  Download Report{' '}
                  <Icon.DownOutlined />
                </StyledDownloadButton>
              </Dropdown>
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
          <StyledFullscreenReportContent rows={15} value={reportContent} onChange={(e) => setReportContent(e.target.value)} />
        </StyledFullscreenModalContent>
      </StyledFullscreenModal>
    </>
  )
}
