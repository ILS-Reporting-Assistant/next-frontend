import { Box, Button, Icon, TipTap, Upload } from '@app/components'
import { UploadFile } from '@app/types'
import { useReportEditor } from '@app/hooks'
import React, { useEffect, useState } from 'react'
import CSSMotion from 'rc-motion'

import {
  StyledDailyNotesHeading,
  StyledEditorWrapper,
  StyledFileTypesText,
  StyledOrDivider,
  StyledOrText,
  StyledPaperClipIcon,
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
  uploadedFiles: propUploadedFiles,
  onFileChange,
  onFilesChange,
  notes: propNotes,
  onNotesChange,
  allowMultiple = false,
}: UploadDocumentProps) => {
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(propUploadedFile || null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>(propUploadedFiles || [])
  const [editorContent, setEditorContent] = useState<string>(propNotes || '')

  const { editor } = useReportEditor({
    content: editorContent,
    editable: true,
    onUpdate: (markdown) => {
      setEditorContent(markdown)
      onNotesChange?.(markdown)
    },
  })

  useEffect(() => {
    setUploadedFile(propUploadedFile || null)
  }, [propUploadedFile])

  useEffect(() => {
    setUploadedFiles(propUploadedFiles || [])
  }, [propUploadedFiles])

  useEffect(() => {
    setEditorContent(propNotes || '')
  }, [propNotes])

  const handleFileChange = (info: any) => {
    const { fileList } = info

    if (allowMultiple) {
      const allowedTypes = ['.txt', '.doc', '.docx', '.md', '.pdf', '.png', '.jpeg', '.jpg']
      const validFiles = fileList
        .map((file: any) => {
          const ext = '.' + file.name.split('.').pop()?.toLowerCase()
          return allowedTypes.includes(ext) ? file : null
        })
        .filter((file: any) => file !== null)

      setUploadedFiles(validFiles)
      onFilesChange?.(validFiles)
    } else {
      if (fileList.length > 0) {
        const file = fileList[0]
        const allowedTypes = ['.txt', '.doc', '.docx', '.md', '.pdf', '.png', '.jpeg', '.jpg']
        const ext = '.' + file.name.split('.').pop()?.toLowerCase()

        if (allowedTypes.includes(ext)) {
          setUploadedFile(file)
          onFileChange?.(file)
        }
      } else {
        setUploadedFile(null)
        onFileChange?.(null)
      }
    }
  }

  const handleRemoveFile = (e: React.MouseEvent, fileToRemove?: UploadFile) => {
    e.stopPropagation()
    if (allowMultiple && fileToRemove) {
      const updatedFiles = uploadedFiles.filter((file) => file.uid !== fileToRemove.uid)
      setUploadedFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    } else {
      setUploadedFile(null)
      onFileChange?.(null)
    }
  }

  const beforeUpload = () => false

  const hasFiles = allowMultiple ? uploadedFiles.length > 0 : uploadedFile !== null
  const showEditor = !hasFiles
  const showUploadArea = editorContent.trim() === '' || hasFiles
  const showUploadBox = allowMultiple || !hasFiles

  return (
    <StyledStep3ContentWrapper>
      <StyledStep3Heading level={3}>Upload Documents & Provide Information</StyledStep3Heading>

      <StyledStep3Description>
        Upload documents or enter your notes manually. I'll organize everything into a beautiful narrative.
      </StyledStep3Description>

      <Box>
        <StyledDailyNotesHeading>Daily Notes & Observations</StyledDailyNotesHeading>

        <CSSMotion visible={showEditor} motionName="fade-slide" removeOnLeave>
          {({ className, style }) => (
            <div className={className} style={style}>
              <StyledEditorWrapper>
                <TipTap editor={editor} value={editorContent} showToolbar />
              </StyledEditorWrapper>
            </div>
          )}
        </CSSMotion>

        {showEditor && showUploadArea && (
          <StyledOrDivider>
            <StyledOrText>Or</StyledOrText>
          </StyledOrDivider>
        )}

        <CSSMotion visible={showUploadArea} motionName="fade-slide" removeOnLeave>
          {({ className, style }) => (
            <div className={className} style={style}>
              <StyledUploadWrapper>
                {/* Show uploaded files list when files exist */}
                {allowMultiple && uploadedFiles.length > 0 && (
                  <>
                    {uploadedFiles.map((file) => (
                      <StyledUploadedFileContainer key={file.uid || file.name}>
                        <StyledPaperClipIcon>
                          <Icon.PaperClipOutlined />
                        </StyledPaperClipIcon>

                        <StyledUploadedFileName>{file.name}</StyledUploadedFileName>

                        <Button danger onClick={(e) => handleRemoveFile(e, file)}>
                          Remove
                        </Button>
                      </StyledUploadedFileContainer>
                    ))}
                  </>
                )}

                {!allowMultiple && uploadedFile && (
                  <StyledUploadedFileContainer>
                    <StyledPaperClipIcon>
                      <Icon.PaperClipOutlined />
                    </StyledPaperClipIcon>

                    <StyledUploadedFileName>{uploadedFile.name}</StyledUploadedFileName>

                    <Button danger onClick={handleRemoveFile}>
                      Remove
                    </Button>
                  </StyledUploadedFileContainer>
                )}

                {/* Show upload box when: allowMultiple is true OR (allowMultiple is false and no file selected) */}
                {showUploadBox && (
                  <Upload
                    beforeUpload={beforeUpload}
                    onChange={handleFileChange}
                    showUploadList={false}
                    accept=".png,.jpeg,.jpg,.txt,.doc,.docx,.md,.pdf"
                    maxCount={allowMultiple ? undefined : 1}
                    multiple={allowMultiple}
                    fileList={allowMultiple ? uploadedFiles : uploadedFile ? [uploadedFile] : []}
                  >
                    <StyledUploadBox>
                      <StyledUploadIcon>
                        <StyledUploadIconInner>
                          <Icon.UploadOutlined />
                        </StyledUploadIconInner>
                      </StyledUploadIcon>

                      <StyledUploadText>
                        {allowMultiple && uploadedFiles.length > 0
                          ? 'Upload More Documents'
                          : `Upload Document${allowMultiple ? 's' : ''}`}
                      </StyledUploadText>

                      <StyledFileTypesText>.png, .jpeg, .jpg, .txt, .doc, .docx, .md, .pdf</StyledFileTypesText>
                    </StyledUploadBox>
                  </Upload>
                )}
              </StyledUploadWrapper>
            </div>
          )}
        </CSSMotion>
      </Box>
    </StyledStep3ContentWrapper>
  )
}
