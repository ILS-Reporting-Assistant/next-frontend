import { Box, Button, Dropdown, Icon, Modal, Select, Spacer, Table, Text, Title, Notification } from '@app/components'
import { ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { StyledClientAvatar, StyledFlexContainer, StyledSearch } from './elements'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { useState, useEffect, useCallback } from 'react'
import { reportService, clientsService, extractErrorMessage } from '@app/services'
import { isValidationError, getFullName, getAvatarText } from '@app/utils'
import { Report, ReportsListQuery, Client } from '@app/types'
import { ReportType } from '@app/enums'
import moment from 'moment'

export const IspReviews = () => {
  const router = useRouter()
  const { color, user } = useSelector((state: IStore) => state)
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [selectedClientId, setSelectedClientId] = useState<string | undefined>(undefined)
  const [clients, setClients] = useState<Client[]>([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  const organizationId = user.currentOrganizationId

  const fetchReports = useCallback(async () => {
    setLoading(true)
    try {
      const query: ReportsListQuery = {
        page: currentPage,
        limit: 10,
        reportType: ReportType.ISP,
        ...(organizationId ? { organizationId } : {}),
        ...(selectedClientId ? { clientId: selectedClientId } : {}),
      }
      const response = await reportService.getReports(query)
      setReports(response.reports || [])
      setTotal(response.total || 0)
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
  }, [organizationId, currentPage, selectedClientId])

  const fetchClients = useCallback(async () => {
    if (!organizationId) return
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
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setClientsLoading(false)
    }
  }, [organizationId])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  useEffect(() => {
    fetchClients()
  }, [fetchClients])

  useEffect(() => {
    setCurrentPage(1)
    setReports([])
    setTotal(0)
    setSelectedClientId(undefined)
  }, [organizationId])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleClientChange = (value: string) => {
    setSelectedClientId(value || undefined)
    setCurrentPage(1)
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

  const getCreatedByName = (report: Report) => {
    if (typeof report.userId === 'object' && report.userId) {
      return getFullName(report.userId as { firstName?: string; lastName?: string })
    }
    return '-'
  }

  const getReportAvatarText = (report: Report) => {
    if (typeof report.clientId === 'object' && report.clientId) {
      return getAvatarText(report.clientId as { firstName?: string; lastName?: string })
    }
    return 'A'
  }

  const getClientOptions = () => {
    return clients.map((client) => ({
      value: client._id,
      label: `${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email || '-',
    }))
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
        const handleMenuClick = ({ key }: { key: string }) => {
          if (key === '1') {
            // View action
            router.push(`${ROUTE.VIEW_ISP_REVIEW}?reportId=${record._id}`)
          } else if (key === '2') {
            // Download action - implement if needed
            // TODO: Implement download functionality
          } else if (key === '3') {
            // Delete action - implement if needed
            // TODO: Implement delete functionality
          }
        }

        const items = [
          { key: '1', label: 'View' },
          { key: '2', label: 'Download' },
          {
            key: '3',
            label: 'Delete',
            danger: true,
            onClick: () => openModal(record),
          },
        ]

        return (
          <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
            <Icon.EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Dropdown>
        )
      },
    },
  ]

  return (
    <Box>
      <StyledFlexContainer>
        <Title level={2}>Annual ISP Review</Title>
        <Button onClick={() => router.replace(ROUTE.CREATE_ISP_REVIEWS)}>Create New Report</Button>
      </StyledFlexContainer>
      <Spacer value={16} />
      <Box display="flex">
        <StyledSearch placeholder="Search" prefix={<Icon.SearchOutlined />} />
        <Select
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
        />
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
