import { Box, Button, Icon, TipTap, Upload } from '@app/components'
import { UploadFile } from '@app/types'
import { useReportEditor } from '@app/hooks'
import React, { useEffect, useState } from 'react'
import {
  StyledDailyNotesHeading,
  StyledEditorWrapper,
  StyledFileTypesText,
  StyledOrDivider,
  StyledOrText,
  StyledPaperClipIcon,
  StyledReportContentTextArea,
  StyledStep3ContentWrapper,
  StyledStep3Description,
  StyledStep3Heading,
  StyledUploadBox,
  StyledUploadedFileContainer,
  StyledUploadedFileName,
  StyledUploadIcon,
  StyledUploadIconInner,
  StyledUploadText,
  StyledUploadWrapper,
} from './elements'
import { UploadDocumentProps } from './types'

export const UploadDocument = ({
  uploadedFile: propUploadedFile,
  onFileChange,
  notes: propNotes,
  onNotesChange,
}: UploadDocumentProps) => {
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(propUploadedFile || null)
  const [editorContent, setEditorContent] = useState<string>(propNotes || '')

  // Main editor for the regular view
  const { editor } = useReportEditor({
    content: editorContent || '',
    editable: true,
    onUpdate: (markdown) => {
      setEditorContent(markdown)
      if (onNotesChange) {
        onNotesChange(markdown)
      }
    },
  })

  // Sync with prop changes
  useEffect(() => {
    setUploadedFile(propUploadedFile || null)
  }, [propUploadedFile])

  useEffect(() => {
    setEditorContent(propNotes || '')
  }, [propNotes])

  const handleFileChange = (info: any) => {
    const { fileList } = info
    if (fileList.length > 0) {
      const file = fileList[0]
      // Check file type
      const allowedTypes = ['.txt', '.doc', '.docx', '.md', '.pdf', '.png', '.jpeg', '.jpg']
      const fileName = file.name || ''
      const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase()

      if (allowedTypes.includes(fileExtension)) {
        setUploadedFile(file)
        if (onFileChange) {
          onFileChange(file)
        }
      }
    } else {
      setUploadedFile(null)
      if (onFileChange) {
        onFileChange(null)
      }
    }
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUploadedFile(null)
    if (onFileChange) {
      onFileChange(null)
    }
  }

  const beforeUpload = () => {
    // Prevent auto upload
    return false
  }

  return (
    <>
      <StyledStep3ContentWrapper>
        <StyledStep3Heading level={3}>Upload Documents & Provide Information</StyledStep3Heading>

        <StyledStep3Description>
          Upload documents or enter your notes manually. I'll organize everything into a beautiful narrative.
        </StyledStep3Description>

        <Box>
          <StyledDailyNotesHeading>Daily Notes & Observations</StyledDailyNotesHeading>
          <StyledEditorWrapper>
            {uploadedFile ? (
              <StyledReportContentTextArea
                rows={10}
                readOnly
                disabled
                style={{ backgroundColor: '#f5f5f5', cursor: 'default' }}
              />
            ) : (
              <TipTap editor={editor} value={editorContent} showToolbar={true} />
            )}
          </StyledEditorWrapper>
          <StyledOrDivider>
            <StyledOrText>Or</StyledOrText>
          </StyledOrDivider>

          <StyledUploadWrapper>
            {uploadedFile ? (
              <StyledUploadedFileContainer>
                <StyledPaperClipIcon>
                  <Icon.PaperClipOutlined />
                </StyledPaperClipIcon>
                <StyledUploadedFileName>{uploadedFile?.name}</StyledUploadedFileName>
                <Button danger onClick={handleRemoveFile}>
                  Remove
                </Button>
              </StyledUploadedFileContainer>
            ) : (
              <Upload
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
                fileList={uploadedFile ? [uploadedFile] : []}
                showUploadList={false}
                accept=".png,.jpeg,.jpg,.txt,.doc,.docx,.md,.pdf"
                maxCount={1}
              >
                <StyledUploadBox>
                  <StyledUploadIcon>
                    <StyledUploadIconInner>
                      <Icon.UploadOutlined />
                    </StyledUploadIconInner>
                  </StyledUploadIcon>
                  <StyledUploadText>Upload Document</StyledUploadText>
                  <StyledFileTypesText>
                    .png, .jpeg, .jpg, .txt, .doc, .docx, .md, .pdf file types only
                  </StyledFileTypesText>
                </StyledUploadBox>
              </Upload>
            )}
          </StyledUploadWrapper>
        </Box>
      </StyledStep3ContentWrapper>
    </>
  )
}
