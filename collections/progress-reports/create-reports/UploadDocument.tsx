import { Box, Icon, ReactQuill, Text, Title, Upload } from '@app/components'
import React, { useState } from 'react'
import { UploadFile } from '@app/types'
import 'react-quill/dist/quill.snow.css'
import {
  StyledStep3Heading,
  StyledStep3Description,
  StyledDailyNotesHeading,
  StyledOrDivider,
  StyledOrText,
  StyledUploadWrapper,
  StyledUploadBox,
  StyledUploadIcon,
  StyledUploadIconInner,
  StyledUploadText,
  StyledFileTypesText,
  StyledUploadedFileContainer,
  StyledUploadedFileName,
  StyledDeleteIcon,
  StyledDeleteIconInner,
  StyledPaperClipIcon,
  StyledEditorWrapper,
  StyledStep3ContentWrapper,
} from './elements'

export const UploadDocument = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadFile | null>(null)
  const [editorContent, setEditorContent] = useState<string>('')

  const handleFileChange = (info: any) => {
    const { fileList } = info
    if (fileList.length > 0) {
      const file = fileList[0]
      // Check file type
      const allowedTypes = ['.txt', '.doc', '.docx', '.md']
      const fileName = file.name || ''
      const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase()

      if (allowedTypes.includes(fileExtension)) {
        setUploadedFile(file)
      }
    } else {
      setUploadedFile(null)
    }
  }

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setUploadedFile(null)
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
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={setEditorContent}
              placeholder="Paste your daily notes, shift summaries, or observations here. Don't worry about formatting - I'll organize everything by skill area and create a professional narrative."
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ align: [] }],
                  ['link', 'image', 'video'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['code-block'],
                  // ['clean']
                ],
              }}
              formats={[
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'color',
                'background',
                'align',
                'link',
                'image',
                'video',
                'list',
                'bullet',
                'code-block',
              ]}
            />
          </StyledEditorWrapper>
          <StyledOrDivider>
            <StyledOrText>Or</StyledOrText>
          </StyledOrDivider>

          <StyledUploadWrapper>
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              fileList={uploadedFile ? [uploadedFile] : []}
              showUploadList={false}
              accept=".txt,.doc,.docx,.md"
              maxCount={1}
            >
              <StyledUploadBox>
                <StyledUploadIcon>
                  <StyledUploadIconInner>
                    <Icon.UploadOutlined />
                  </StyledUploadIconInner>
                </StyledUploadIcon>
                <StyledUploadText>Upload Document</StyledUploadText>
                <StyledFileTypesText>.txt, .doc, .docx, .md file types only</StyledFileTypesText>
              </StyledUploadBox>
            </Upload>

            {uploadedFile && (
              <StyledUploadedFileContainer>
                <StyledPaperClipIcon>
                  <Icon.PaperClipOutlined />
                </StyledPaperClipIcon>
                <StyledUploadedFileName>{uploadedFile.name}</StyledUploadedFileName>
                <StyledDeleteIcon onClick={handleRemoveFile}>
                  <StyledDeleteIconInner>
                    <Icon.DeleteOutlined />
                  </StyledDeleteIconInner>
                </StyledDeleteIcon>
              </StyledUploadedFileContainer>
            )}
          </StyledUploadWrapper>
        </Box>
      </StyledStep3ContentWrapper>
    </>
  )
}
