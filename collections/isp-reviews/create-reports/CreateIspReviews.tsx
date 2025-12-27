import { Box, Button, Icon, Notification, Progress, Radio, RadioGroup } from '@app/components'
import { InputType, ReportType } from '@app/enums'
import { IStore } from '@app/redux'
import { clientsService, extractErrorMessage, reportService } from '@app/services'
import { Report } from '@app/types'
import { isValidationError } from '@app/utils'
import {
  ComplianceNotice,
  ReviewRevice,
  Skills,
  Success,
  UploadDocument,
} from 'collections/progress-reports/create-reports'
import {
  StyledButtonContainer,
  StyledButtonContainerWrapper,
  StyledButtonWrapper,
  StyledContainer,
  StyledContentWrapper,
  StyledEmptyProgressReportsMessage,
  StyledGoBackButton,
  StyledNextButton,
  StyledPaperClipIcon,
  StyledProgressBarWrapper,
  StyledProgressReportSelect,
  StyledProgressTitle,
  StyledRadioGroupWrapper,
  StyledSelectLabel,
  StyledSelectWrapper,
  StyledStep3StepText,
  StyledStepContentWrapper,
  StyledStepText,
  StyledUploadedFileContainer,
  StyledUploadedFileName,
} from 'collections/progress-reports/create-reports/elements'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const CreateIspReviews = () => {
  const { user } = useSelector((state: IStore) => state)
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState([])
  const [uploadedFile, setUploadedFile] = useState(null)
  const [notes, setNotes] = useState('')
  const [reportContent, setReportContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [fileIds, setFileIds] = useState<string[]>([])
  const [reportName, setReportName] = useState('Annual ISP Review')
  const [isExtracting, setIsExtracting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [apiSuccess, setApiSuccess] = useState(false)
  const [inputType, setInputType] = useState<InputType>(InputType.PROGRESS_REPORT)
  const [selectedProgressReport, setSelectedProgressReport] = useState<Report | null>(null)
  const [progressReports, setProgressReports] = useState<Report[]>([])
  const [progressReportsLoading, setProgressReportsLoading] = useState(false)
  const totalSteps = 4
  const progressPercent = showSuccess ? 100 : (currentStep / totalSteps) * 100
  const organizationId = user.currentOrganizationId

  // Fetch clients on mount
  useEffect(() => {
    const fetchClients = async () => {
      setClientsLoading(true)
      try {
        const response = await clientsService.getOrganizationClients(organizationId, {
          page: 1,
          limit: 100,
        })
        setClients(response.data?.clients || [])
      } catch (error) {
        if (isValidationError(error)) return
        Notification({
          message: 'Failed to fetch clients',
          description: extractErrorMessage(error),
          type: 'error',
        })
      } finally {
        setClientsLoading(false)
      }
    }
    fetchClients()
  }, [organizationId])

  // Fetch progress reports when input type is 'progress-report' and client is selected
  useEffect(() => {
    const fetchProgressReports = async () => {
      if (inputType !== InputType.PROGRESS_REPORT || !selectedClient) {
        // Reset if input type is not PROGRESS_REPORT or no client selected
        setProgressReports([])
        setSelectedProgressReport(null)
        return
      }

      const clientId = selectedClient?._id || selectedClient?.id
      if (!clientId) {
        setProgressReports([])
        setSelectedProgressReport(null)
        return
      }

      // Reset when client changes before fetching new data
      setSelectedProgressReport(null)
      setProgressReportsLoading(true)
      try {
        const response = await reportService.getReportsByClientId(clientId, {
          reportType: ReportType.PROGRESS,
          limit: 100,
        })
        setProgressReports(response.reports || [])
      } catch (error) {
        if (isValidationError(error)) return
        Notification({
          message: 'Failed to fetch progress reports',
          description: extractErrorMessage(error),
          type: 'error',
        })
        setProgressReports([])
      } finally {
        setProgressReportsLoading(false)
      }
    }

    fetchProgressReports()
  }, [inputType, selectedClient])

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Compliance Notice'
      case 2:
        return 'Select Skills'
      case 3:
        return 'Upload Documents'
      case 4:
        return 'Review & Revise'
      default:
        return ''
    }
  }

  const handleFileUpload = useCallback((file) => {
    setUploadedFile(file)
  }, [])

  const handleExtractDocument = useCallback(async () => {
    const clientId = selectedClient?._id || selectedClient?.id || null

    if (inputType === InputType.PROGRESS_REPORT) {
      if (!selectedProgressReport) {
        Notification({
          message: 'No progress report selected',
          description: 'Please select a progress report',
          type: 'error',
        })
        return
      }
    } else if (!uploadedFile && !notes) {
      Notification({
        message: 'No input provided',
        description: 'Please upload a document or enter notes',
        type: 'error',
      })
      return
    }
    setShowSuccess(true)

    let file: File | undefined
    let notesText: string | undefined
    let sourceOriginalContent: string | undefined
    let sourceFileIds: string[] = []

    if (inputType === InputType.PROGRESS_REPORT) {
      notesText = selectedProgressReport?.content
      sourceOriginalContent = selectedProgressReport?.originalContent || ''
      // Support both old fileId and new fileIds for backward compatibility
      if (selectedProgressReport?.fileIds && selectedProgressReport.fileIds.length > 0) {
        sourceFileIds = selectedProgressReport.fileIds.map((f) => f._id)
      } else if (selectedProgressReport?.fileId?._id) {
        sourceFileIds = [selectedProgressReport.fileId._id]
      }
    } else {
      notesText = notes || undefined
      file = uploadedFile ? uploadedFile.originFileObj || uploadedFile : undefined
    }

    setIsExtracting(true)
    setApiSuccess(false)

    try {
      const result = await reportService.uploadIspDocument(file, organizationId, selectedSkills, clientId, notesText)
      setReportContent(result.content)

      if (inputType === InputType.PROGRESS_REPORT) {
        setOriginalContent(sourceOriginalContent || '')
        setFileIds(sourceFileIds)
      } else {
        setOriginalContent(result.originalContent || '')
        setFileIds(result.fileIds || [])
      }

      setApiSuccess(true)
    } catch (error) {
      if (isValidationError(error)) return

      setShowSuccess(false)
      setApiSuccess(false)

      Notification({
        message: inputType === InputType.PROGRESS_REPORT ? 'Failed to generate report' : 'Failed to extract document',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsExtracting(false)
    }
  }, [inputType, selectedProgressReport, uploadedFile, notes, organizationId, selectedSkills, selectedClient])

  const handleSaveReport = useCallback(async () => {
    if (!selectedClient) {
      Notification({
        message: 'Client is required',
        description: 'Please select a client first',
        type: 'error',
      })
      return
    }

    if (!reportName || !reportContent) {
      Notification({
        message: 'Report data is incomplete',
        description: 'Please ensure report name and content are filled',
        type: 'error',
      })
      return
    }

    setIsSaving(true)
    try {
      const payload = {
        organizationId: organizationId || undefined,
        clientId: selectedClient?._id,
        reportType: ReportType.ISP,
        reportName,
        fileIds: fileIds.length > 0 ? fileIds : undefined,
        originalContent,
        content: reportContent,
        skills: selectedSkills,
        parentReportId:
          inputType === InputType.PROGRESS_REPORT && selectedProgressReport ? selectedProgressReport._id : undefined,
      }

      await reportService.saveReport(payload)
      Notification({
        message: 'Report saved successfully',
        type: 'success',
      })
      // Navigate to first step after successful save
      // setCurrentStep(1)
      setShowSuccess(false)
      // Reset form state
      setReportContent('')
      setOriginalContent('')
      setFileIds([])
      setReportName('Annual ISP Review')
      setUploadedFile(null)
      setNotes('')
      setSelectedSkills([])
      setSelectedClient(null)
      router.push('/isp-reviews')
    } catch (error) {
      if (isValidationError(error)) return
      Notification({
        message: 'Failed to save report',
        description: extractErrorMessage(error),
        type: 'error',
      })
      throw error
    } finally {
      setIsSaving(false)
    }
  }, [selectedClient, fileIds, reportName, reportContent, originalContent, organizationId, selectedSkills])

  const handleNext = () => {
    if (currentStep === 1 && !selectedClient) {
      Notification({
        message: 'Please select a client',
        type: 'warning',
      })
      return
    }
    if (currentStep === 2 && selectedSkills.length === 0) {
      Notification({
        message: 'Please select at least one skill',
        type: 'warning',
      })
      return
    }
    if (currentStep === 3) {
      if (inputType === InputType.PROGRESS_REPORT && !selectedProgressReport) {
        Notification({
          message: 'Please select a progress report',
          type: 'warning',
        })
        return
      }
      handleExtractDocument()
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleGoBack = () => {
    if (showSuccess) {
      setShowSuccess(false)
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      window.history.back()
    }
  }

  const handleSuccessComplete = () => {
    setShowSuccess(false)
    setCurrentStep(4)
  }

  const renderStepContent = () => {
    if (showSuccess) {
      return <Success onComplete={handleSuccessComplete} isExtracting={isExtracting} apiSuccess={apiSuccess} />
    }

    switch (currentStep) {
      case 1:
        return (
          <ComplianceNotice
            clients={clients}
            clientsLoading={clientsLoading}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
          />
        )
      case 2:
        return <Skills selectedSkills={selectedSkills} onSkillsChange={setSelectedSkills} />
      case 3:
        return (
          <Box>
            <StyledRadioGroupWrapper>
              <RadioGroup
                value={inputType}
                onChange={(e) => {
                  setInputType(e.target.value)
                  setSelectedProgressReport(null)
                }}
              >
                <Radio value={InputType.PROGRESS_REPORT}>Select Progress Report</Radio>
                <Radio value={InputType.UPLOAD}>Enter Daily Notes & Observations</Radio>
              </RadioGroup>
            </StyledRadioGroupWrapper>

            {inputType === InputType.PROGRESS_REPORT ? (
              <Box>
                <StyledSelectWrapper>
                  <StyledSelectLabel>Select Progress Report</StyledSelectLabel>
                  <StyledProgressReportSelect
                    placeholder="Select a progress report"
                    value={selectedProgressReport?._id}
                    onChange={(value) => {
                      const report = progressReports.find((r) => r._id === value)
                      setSelectedProgressReport(report || null)
                    }}
                    loading={progressReportsLoading}
                    showSearch
                    filterOption={(input, option) => {
                      const label = typeof option?.label === 'string' ? option.label : String(option?.label ?? '')
                      return label.toLowerCase().includes(input.toLowerCase())
                    }}
                    options={progressReports.map((report) => ({
                      value: report._id,
                      label: report.reportName,
                    }))}
                  />
                </StyledSelectWrapper>
                {progressReports.length === 0 && !progressReportsLoading && (
                  <StyledEmptyProgressReportsMessage>
                    No progress reports found for this client.
                  </StyledEmptyProgressReportsMessage>
                )}
              </Box>
            ) : (
              <UploadDocument
                uploadedFile={uploadedFile}
                onFileChange={handleFileUpload}
                notes={notes}
                onNotesChange={setNotes}
              />
            )}
          </Box>
        )
      case 4:
        return (
          <ReviewRevice
            onGoBack={handleGoBack}
            defaultReportName={reportName}
            defaultReportContent={reportContent}
            onReportNameChange={setReportName}
            onReportContentChange={setReportContent}
            onSaveReport={handleSaveReport}
            isSaving={isSaving}
            originalContent={originalContent}
            reportType={ReportType.ISP}
          />
        )
      default:
        return null
    }
  }

  return (
    <Fragment>
      <StyledContainer>
        <StyledContentWrapper>
          {/* <StyledBackLink href={ROUTE.ISP_REVIEWS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink> */}

          <StyledProgressTitle level={2}>Annual ISP Review</StyledProgressTitle>

          {!showSuccess && (
            <StyledProgressBarWrapper>
              <Progress
                percent={progressPercent}
                showInfo={false}
                strokeColor="black"
                trailColor="#e5e5e5"
                strokeWidth={4}
              />
            </StyledProgressBarWrapper>
          )}

          {!showSuccess && currentStep === 4 ? null : !showSuccess && currentStep === 3 ? (
            <StyledStep3StepText>
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </StyledStep3StepText>
          ) : !showSuccess ? (
            <StyledStepText>
              Step {currentStep} of {totalSteps}: {getStepTitle()}
            </StyledStepText>
          ) : null}

          {currentStep === 4 || currentStep === 3 ? (
            renderStepContent()
          ) : (
            <StyledStepContentWrapper>{renderStepContent()}</StyledStepContentWrapper>
          )}

          {!showSuccess && currentStep !== 4 && (
            <>
              {currentStep === 3 && inputType === InputType.PROGRESS_REPORT && selectedProgressReport && (
                <StyledButtonContainer>
                  <StyledButtonContainerWrapper>
                    <StyledUploadedFileContainer>
                      <StyledPaperClipIcon>
                        <Icon.PaperClipOutlined />
                      </StyledPaperClipIcon>
                      <StyledUploadedFileName>{selectedProgressReport.reportName}</StyledUploadedFileName>
                      <Button
                        danger
                        onClick={() => {
                          setSelectedProgressReport(null)
                        }}
                      >
                        Remove
                      </Button>
                    </StyledUploadedFileContainer>
                  </StyledButtonContainerWrapper>
                </StyledButtonContainer>
              )}
              <StyledButtonWrapper>
                <StyledButtonContainer>
                  <StyledButtonContainerWrapper>
                    <StyledGoBackButton onClick={handleGoBack}>Go Back</StyledGoBackButton>
                    <StyledNextButton
                      type="primary"
                      onClick={handleNext}
                      loading={currentStep === 3 && isExtracting}
                      disabled={currentStep === 3 && isExtracting}
                    >
                      {currentStep === 3 ? (isExtracting ? 'Extracting...' : 'Generate My Report') : 'Next'}
                    </StyledNextButton>
                  </StyledButtonContainerWrapper>
                </StyledButtonContainer>
              </StyledButtonWrapper>
            </>
          )}
        </StyledContentWrapper>
      </StyledContainer>
    </Fragment>
  )
}
