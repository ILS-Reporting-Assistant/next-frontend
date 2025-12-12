import { Icon, Progress, Notification } from '@app/components'
import { ROUTE } from '@app/data'
import { Fragment, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import {
  ComplianceNotice,
  Skills,
  UploadDocument,
  ReviewRevice,
  Success,
} from 'collections/progress-reports/create-reports'
import {
  StyledBackIcon,
  StyledBackIconInner,
  StyledBackLink,
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
import { clientsService, reportService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { ReportType } from '@app/enums'

export const CreateProgressReports = () => {
  const { user } = useSelector((state) => state)
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
  const [fileId, setFileId] = useState(null)
  const [reportName, setReportName] = useState('Progress Report')
  const [isExtracting, setIsExtracting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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
    // Validate that at least one of file or notes is provided
    if (!uploadedFile && !notes) {
      Notification({
        message: 'No input provided',
        description: 'Please upload a document or enter notes',
        type: 'error',
      })
      return
    }

    // Notes are already plain text from UploadDocument component
    const notesText = notes || undefined

    // Get the actual file object (antd Upload provides originFileObj) if file is provided
    const file = uploadedFile ? uploadedFile.originFileObj || uploadedFile : undefined

    setIsExtracting(true)
    try {
      const clientId = selectedClient?._id || selectedClient?.id || null
      const result = await reportService.uploadProgressDocument(
        file,
        organizationId,
        selectedSkills,
        clientId,
        notesText,
      )
      setReportContent(result.content)
      setOriginalContent(result.originalContent || '')
      setFileId(result.fileId || null)
      setShowSuccess(true)
    } catch (error) {
      if (isValidationError(error)) return
      Notification({
        message: 'Failed to extract document',
        description: extractErrorMessage(error),
        type: 'error',
      })
    } finally {
      setIsExtracting(false)
    }
  }, [uploadedFile, notes, organizationId, selectedSkills, selectedClient])

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
        reportType: ReportType.PROGRESS,
        reportName,
        fileId: fileId || undefined,
        originalContent,
        content: reportContent,
        skills: selectedSkills,
      }

      const result = await reportService.saveReport(payload)
      Notification({
        message: 'Report saved successfully',
        type: 'success',
      })
      // Navigate to first step after successful save
      setCurrentStep(1)
      setShowSuccess(false)
      // Reset form state
      setReportContent('')
      setOriginalContent('')
      setFileId(null)
      setReportName('Progress Report')
      setUploadedFile(null)
      setNotes('')
      setSelectedSkills([])
      setSelectedClient(null)
      return result
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
  }, [selectedClient, fileId, reportName, reportContent, originalContent, organizationId, selectedSkills])

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
      return <Success onComplete={handleSuccessComplete} />
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
            uploadedFile={uploadedFile}
            onFileChange={handleFileUpload}
            notes={notes}
            onNotesChange={setNotes}
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
            reportType={ReportType.PROGRESS}
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
          <StyledBackLink href={ROUTE.PROGRESS_REPORTS}>
            <StyledBackIcon>
              <StyledBackIconInner>
                <Icon.LeftOutlined />
              </StyledBackIconInner>
            </StyledBackIcon>
            Back to Reports
          </StyledBackLink>

          <StyledProgressTitle level={2}>Progress Report</StyledProgressTitle>

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
                    loading={currentStep === 3 && isExtracting}
                    disabled={currentStep === 3 && isExtracting}
                  >
                    {currentStep === 3 ? (isExtracting ? 'Extracting...' : 'Generate My Report') : 'Next'}
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
