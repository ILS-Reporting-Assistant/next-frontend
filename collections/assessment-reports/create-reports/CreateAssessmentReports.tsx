import { Notification, Progress } from '@app/components'
import { ReportType } from '@app/enums'
import { IStore } from '@app/redux'
import { clientsService, extractErrorMessage, reportService } from '@app/services'
import { isValidationError, popularSkills } from '@app/utils'
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
  StyledGoBackButton,
  StyledNextButton,
  StyledProgressBarWrapper,
  StyledProgressTitle,
  StyledStep3StepText,
  StyledStepContentWrapper,
  StyledStepText,
} from 'collections/progress-reports/create-reports/elements'
import { useRouter } from 'next/router'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export const CreateAssessmentReports = () => {
  const { user } = useSelector((state: IStore) => state)
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)
  const [clients, setClients] = useState([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [notes, setNotes] = useState('')
  const [reportContent, setReportContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [fileIds, setFileIds] = useState<string[]>([])
  const [reportName, setReportName] = useState('Initial Assessment Report')
  const [isExtracting, setIsExtracting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [apiSuccess, setApiSuccess] = useState(false)
  const totalSteps = 4
  const progressPercent = showSuccess ? 100 : (currentStep / totalSteps) * 100
  const organizationId = user.currentOrganizationId

  // Fetch clients on mount
  useEffect(() => {
    const fetchClients = async () => {
      //if (!organizationId) return
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

  const handleFilesUpload = useCallback((files) => {
    setUploadedFiles(files)
  }, [])

  const handleExtractDocument = useCallback(async () => {
    // Validate that at least one of files or notes is provided
    if (uploadedFiles.length === 0 && !notes) {
      Notification({
        message: 'No input provided',
        description: 'Please upload a document or enter notes',
        type: 'error',
      })
      return
    }

    // Show success animation immediately when button is clicked
    setShowSuccess(true)

    // Notes are already plain text from UploadDocument component
    const notesText = notes || undefined

    // Get the actual file objects (antd Upload provides originFileObj) if files are provided
    const files =
      uploadedFiles.length > 0 ? uploadedFiles.map((file) => file.originFileObj || file).filter(Boolean) : undefined

    setIsExtracting(true)
    setApiSuccess(false)
    try {
      const clientId = selectedClient?._id || selectedClient?.id || null
      const result = await reportService.uploadDocument(files, organizationId, selectedSkills, clientId, notesText)
      setReportContent(result.content)
      setOriginalContent(result.originalContent || '')
      setFileIds(result.fileIds || [])
      // When API call succeeds, set apiSuccess to true
      setApiSuccess(true)
    } catch (error) {
      if (isValidationError(error)) return
      // Hide success animation on error
      setShowSuccess(false)
      setApiSuccess(false)
      Notification({
        message: 'Failed to extract document',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      // Set isExtracting to false when API response comes (success or error)
      setIsExtracting(false)
    }
  }, [uploadedFiles, notes, organizationId, selectedSkills, selectedClient])

  const handleSaveReport = useCallback(async () => {
    if (!selectedClient) {
      Notification({
        message: 'Client is required',
        description: 'Please select a client first',
        type: 'error',
      })
      return
    }

    // fileId is optional now (can be null if notes were used instead of file)

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
        reportType: ReportType.ASSESSMENT,
        reportName,
        fileIds: fileIds.length > 0 ? fileIds : undefined,
        originalContent,
        content: reportContent,
        skills: selectedSkills,
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
      setReportName('Initial Assessment Report')
      setUploadedFiles([])
      setNotes('')
      setSelectedSkills([])
      setSelectedClient(null)
      router.push('/assessment-reports')
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
          <UploadDocument
            uploadedFiles={uploadedFiles}
            onFilesChange={handleFilesUpload}
            notes={notes}
            onNotesChange={setNotes}
            allowMultiple={true}
          />
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
            reportType={ReportType.ASSESSMENT}
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
          {/* <StyledBackLink href={ROUTE.ASSESSMENT_REPORTS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink> */}

          <StyledProgressTitle level={2}>Initial Assessment Report</StyledProgressTitle>

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
            <StyledButtonWrapper>
              <StyledButtonContainer>
                <StyledButtonContainerWrapper>
                  <StyledGoBackButton onClick={handleGoBack}>Go Back</StyledGoBackButton>
                  <StyledNextButton
                    type="primary"
                    onClick={handleNext}
                    disabled={currentStep === 3 && (isExtracting || showSuccess)}
                  >
                    {currentStep === 3 ? 'Generate My Report' : 'Next'}
                  </StyledNextButton>
                </StyledButtonContainerWrapper>
              </StyledButtonContainer>
            </StyledButtonWrapper>
          )}
        </StyledContentWrapper>
      </StyledContainer>
    </Fragment>
  )
}
