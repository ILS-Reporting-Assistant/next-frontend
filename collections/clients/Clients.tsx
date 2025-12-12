import { Box, Button, Dropdown, Icon, Modal, Notification, Spacer, Table, Text, Title } from '@app/components'
import React, { useCallback, useEffect, useState } from 'react'
import { StyledFlexContainer, StyledSearch, StyledClientAvatar } from './elements'
import { Client } from '@app/types'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { AddClient } from './AddClient'
import { clientsService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import moment from 'moment'

export const Clients = () => {
  const { color, user } = useSelector((state: IStore) => state)
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  const organizationId = user.currentOrganizationId

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const response = await clientsService.getOrganizationClients(organizationId, {
        page: currentPage,
        limit: 10,
        search: search || undefined,
      })
      setClients(response.data?.clients || [])
      setTotal(response.data?.total || 0)
    } catch (error) {
      if (isValidationError(error)) return

      Notification({
        message: 'Failed to fetch clients',
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [organizationId, currentPage, search])

  useEffect(() => {
    if (search && currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [search, currentPage])

  useEffect(() => {
    fetchData()
  }, [currentPage, search])

  useEffect(() => {
    setCurrentPage(1)
    setClients([])
    setTotal(0)
  }, [organizationId])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return moment(dateString).format('MM-DD-YYYY')
  }

  const getClientName = (client: Client) => {
    return `${client.firstName || ''} ${client.lastName || ''}`.trim() || '-'
  }

  const getAvatarText = (client: Client) => {
    const firstName = client.firstName || ''
    const lastName = client.lastName || ''
    const firstLetter = firstName ? firstName.charAt(0).toUpperCase() : ''
    const lastLetter = lastName ? lastName.charAt(0).toUpperCase() : ''

    if (firstLetter && lastLetter) {
      return `${firstLetter}${lastLetter}`
    }
    if (firstLetter) {
      return firstLetter
    }
    if (lastLetter) {
      return lastLetter
    }
    return 'C'
  }

  const openModal = (client: Client) => {
    setSelectedClient(client)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedClient(null)
    setModalLoading(false)
  }

  const handleModalConfirm = async () => {
    if (!selectedClient) return

    setModalLoading(true)
    try {
      await clientsService.deleteClient(organizationId, selectedClient._id)
      Notification({
        message: 'Client deleted',
        description: 'Client has been deleted successfully.',
        type: 'success',
      })
      closeModal()
      fetchData()
    } catch (error: any) {
      if (isValidationError(error)) {
        setModalLoading(false)
        return
      }

      Notification({
        message: 'Failed to delete client',
        description: extractErrorMessage(error),
        type: 'error',
      })
      setModalLoading(false)
    }
  }

  const clientColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Client) => (
        <Box display="flex" alignItems="center">
          <StyledClientAvatar $backgroundColor={color.primary} $textColor={color.white}>
            {getAvatarText(record)}
          </StyledClientAvatar>
          <Text>{getClientName(record)}</Text>
        </Box>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <Text>{email || '-'}</Text>,
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => <Text>{formatDate(date)}</Text>,
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => <Text>{formatDate(date)}</Text>,
    },
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <Text>{formatDate(date)}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Client) => {
        const items = [
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
            onClick: () => openModal(record),
          },
        ]

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Icon.EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Dropdown>
        )
      },
    },
  ]

  return (
    <Box>
      <AddClient open={open} setOpen={setOpen} onSuccess={fetchData} />
      <StyledFlexContainer>
        <Title level={2}>Clients</Title>
        <Button onClick={() => setOpen(true)}>Add Client</Button>
      </StyledFlexContainer>
      <Spacer value={16} />
      <Box display="flex" alignItems="center">
        <StyledSearch
          placeholder="Search"
          prefix={<Icon.SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Spacer value={24} />
      <Table
        columns={clientColumns}
        dataSource={clients}
        bordered={false}
        loading={loading}
        rowKey="_id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} clients`,
          onChange: handlePageChange,
        }}
      />
      <Modal
        open={modalOpen}
        title="Delete Client"
        onCancel={closeModal}
        onOk={handleModalConfirm}
        confirmLoading={modalLoading}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <Text>
          {selectedClient
            ? `Are you sure you want to delete the client ${getClientName(
                selectedClient,
              )}? This action cannot be undone.`
            : ''}
        </Text>
      </Modal>
    </Box>
  )
}
