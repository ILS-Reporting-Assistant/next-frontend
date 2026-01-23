import { Box, Button, Dropdown, Icon, Modal, Spacer, Table, Text, Title, Notification, Tooltip } from '@app/components'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { StyledClientAvatar, StyledFlexContainer, StyledSearch } from './elements'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { reportService, extractErrorMessage } from '@app/services'
import { isValidationError, getFullName, getAvatarText } from '@app/utils'
import { Report, ReportsListQuery } from '@app/types'
import { ReportType } from '@app/enums'
import { useDownloadReport } from '@app/hooks'
import moment from 'moment'
import { usePlanUsage } from '..'

export const ProgressReports = () => {
  const router = useRouter()
  const { color, user } = useSelector((state: IStore) => state)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null)
  const { usage, refresh } = usePlanUsage()

  const { downloadDocx, downloadPdf, isDownloadingDocx, isDownloadingPdf } = useDownloadReport({
    showSuccessNotification: true,
  })

  const organizationId = user.currentOrganizationId

  const fetchReports = useCallback(async () => {
    setLoading(true)
    try {
      const query: ReportsListQuery = {
        page: currentPage,
        limit: 10,
        reportType: ReportType.PROGRESS,
        ...(organizationId ? { organizationId } : {}),
        // ...(selectedClientId ? { clientId: selectedClientId } : {}),
        ...(debouncedSearchTerm ? { search: debouncedSearchTerm } : {}),
      }
      const response = await reportService.getReports(query)
      setReports(response.reports || [])
      setTotal(response.total || 0)
      refresh()
    } catch (error) {
      if (isValidationError(error)) return

      Notification({
        message: 'Failed to fetch reports',
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [organizationId, currentPage, debouncedSearchTerm])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      if (searchTerm && currentPage !== 1) {
        setCurrentPage(1)
      }
    }, 300) // Debounce search by 300ms

    return () => clearTimeout(timeoutId)
  }, [searchTerm, currentPage])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  useEffect(() => {
    setCurrentPage(1)
    setReports([])
    setTotal(0)
  }, [organizationId])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return moment(dateString).format('MM-DD-YYYY')
  }

  const getClientName = (report: Report) => {
    if (typeof report.clientId === 'object' && report.clientId) {
      return getFullName(report.clientId as { firstName?: string; lastName?: string })
    }
    return '-'
  }

  const getReportAvatarText = (report: Report) => {
    if (typeof report.clientId === 'object' && report.clientId) {
      return getAvatarText(report.clientId as { firstName?: string; lastName?: string })
    }
    return 'A'
  }

  const getCreatedByName = (report: Report) => {
    if (typeof report.userId === 'object' && report.userId) {
      return getFullName(report.userId as { firstName?: string; lastName?: string })
    }
    return '-'
  }

  const openModal = (report: Report) => {
    setSelectedReport(report)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedReport(null)
    setModalLoading(false)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedReport) return

    setModalLoading(true)
    try {
      // await reportService.deleteReport(selectedReport._id)
      Notification({
        message: 'Report deleted',
        description: 'Report has been deleted successfully.',
        type: 'success',
      })
      closeModal()
      fetchReports()
    } catch (error: any) {
      if (isValidationError(error)) {
        setModalLoading(false)
        return
      }

      Notification({
        message: 'Failed to delete report',
        description: extractErrorMessage(error),
        type: 'error',
      })
      setModalLoading(false)
    }
  }

  const handleDownloadDocx = async (report: Report) => {
    if (!report.content) return

    setDownloadingReportId(report._id)
    await downloadDocx(report.content, report.reportName || 'progress-report')
    setDownloadingReportId(null)
  }

  const handleDownloadPdf = async (report: Report) => {
    if (!report.content) return

    setDownloadingReportId(report._id)
    await downloadPdf(report.content, report.reportName || 'progress-report')
    setDownloadingReportId(null)
  }

  const buttonState = useMemo(() => {
    const isFreePlan = usage?.plan?.amount === 0
    const limitReached = usage?.remainingProgressReports === 0
    const disabled = (isFreePlan && limitReached) || limitReached

    let tooltipMessage: string | undefined
    if (isFreePlan && limitReached) {
      tooltipMessage = 'Please upgrade your plan to add more progress reports'
    } else if (limitReached) {
      tooltipMessage = 'You have reached the limit for creating progress reports'
    }

    return { disabled, tooltipMessage }
  }, [usage?.plan?.amount, usage?.remainingProgressReports])

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'reportName',
      key: 'reportName',
      render: (name: string) => <Text>{name || '-'}</Text>,
    },
    {
      title: 'Client Name',
      dataIndex: 'clientId',
      key: 'clientId',
      render: (_: any, record: Report) => {
        const clientName = getClientName(record)
        return (
          <Box display="flex" alignItems="center">
            <StyledClientAvatar $backgroundColor={color.primary} $textColor={color.white}>
              {getReportAvatarText(record)}
            </StyledClientAvatar>
            <Text>{clientName}</Text>
          </Box>
        )
      },
    },
    {
      title: 'Date Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <Text>{formatDate(date)}</Text>,
    },
    {
      title: 'Created By',
      dataIndex: 'userId',
      key: 'userId',
      render: (_: any, record: Report) => <Text>{getCreatedByName(record)}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Report) => {
        const isDownloading = downloadingReportId === record._id && (isDownloadingDocx || isDownloadingPdf)

        const handleMenuClick = ({ key }: { key: string }) => {
          if (key === '1') {
            // View action
            router.push(`${ROUTE.VIEW_PROGRESS_REPORT}?reportId=${record._id}`)
          } else if (key === '2-docx') {
            // Download DOCX
            handleDownloadDocx(record)
          } else if (key === '2-pdf') {
            // Download PDF
            handleDownloadPdf(record)
          } else if (key === '3') {
            // Delete action
            openModal(record)
          }
        }

        const items = [
          { key: '1', label: 'View', icon: <Icon.EyeOutlined /> },
          {
            key: '2',
            label: 'Download',
            icon: <Icon.DownloadOutlined />,
            disabled: isDownloading,
            children: [
              {
                key: '2-docx',
                label:
                  isDownloadingDocx && downloadingReportId === record._id ? 'Downloading...' : 'Word Document (.docx)',
                icon:
                  isDownloadingDocx && downloadingReportId === record._id ? (
                    <Icon.LoadingOutlined />
                  ) : (
                    <Icon.FileWordOutlined />
                  ),
                disabled: isDownloading,
              },
              {
                key: '2-pdf',
                label: isDownloadingPdf && downloadingReportId === record._id ? 'Downloading...' : 'PDF (.pdf)',
                icon:
                  isDownloadingPdf && downloadingReportId === record._id ? (
                    <Icon.LoadingOutlined />
                  ) : (
                    <Icon.FilePdfOutlined />
                  ),
                disabled: isDownloading,
              },
            ],
          },
          // {
          //   key: '3',
          //   label: 'Delete',
          //   danger: true,
          //   icon: <Icon.DeleteOutlined />,
          // },
        ]

        return (
          <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <Box display="flex" alignItems="center" style={{ cursor: 'pointer' }}>
              {isDownloading ? (
                <Icon.LoadingOutlined style={{ fontSize: 20 }} />
              ) : (
                <Icon.EllipsisOutlined style={{ fontSize: 20 }} />
              )}
            </Box>
          </Dropdown>
        )
      },
    },
  ]

  return (
    <Box>
      <StyledFlexContainer>
        <Title level={2}>Progress Reports</Title>
        <Tooltip title={buttonState.tooltipMessage}>
          <Button onClick={() => router.push(ROUTE.CREATE_PROGRESS_REPORTS)} disabled={buttonState.disabled}>
            Create New Report
          </Button>
        </Tooltip>
      </StyledFlexContainer>
      <Spacer value={16} />
      <Box display="flex">
        <StyledSearch
          placeholder="Search"
          prefix={<Icon.SearchOutlined />}
          value={searchTerm}
          onChange={handleSearchChange}
          allowClear
        />
        {/* <Select
          marginLeft="16px"
          showSearch
          placeholder="Select a client"
          onChange={handleClientChange}
          value={selectedClientId}
          allowClear
          loading={clientsLoading}
          options={getClientOptions()}
          style={{ minWidth: 200 }}
          filterOption={(input, option) => {
            const label = String(option?.label ?? '')
            return label.toLowerCase().includes(input.toLowerCase())
          }}
        /> */}
      </Box>
      <Spacer value={24} />
      <Table
        columns={columns}
        dataSource={reports}
        bordered={false}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} reports`,
          onChange: handlePageChange,
        }}
      />
      <Modal
        open={modalOpen}
        title="Delete Report"
        onCancel={closeModal}
        onOk={handleDeleteConfirm}
        confirmLoading={modalLoading}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <Text>
          {selectedReport
            ? `Are you sure you want to delete the report "${selectedReport.reportName}"? This action cannot be undone.`
            : ''}
        </Text>
      </Modal>
    </Box>
  )
}
