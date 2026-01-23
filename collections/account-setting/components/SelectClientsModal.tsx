import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Table, Notification, Text, Box } from '@app/components'
import { clientsService, extractErrorMessage } from '@app/services'
import { Client, SelectClientsModalProps } from '@app/types'
import { getClientName, getAvatarText, isValidationError } from '@app/utils'
import { StyledClientAvatar } from '../../clients/elements'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import moment from 'moment'

export const SelectClientsModal: React.FC<SelectClientsModalProps> = ({
  open,
  onCancel,
  onConfirm,
  quantity,
  organizationId,
}) => {
  const { color } = useSelector((state: IStore) => state)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(0)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    try {
      const response = await clientsService.getOrganizationClients(organizationId, {
        page: currentPage,
        limit: 10,
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
  }, [organizationId, currentPage])

  useEffect(() => {
    if (open) {
      fetchClients()
      setSelectedClientIds([])
      setCurrentPage(1)
    }
  }, [open, fetchClients])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return moment(dateString).format('MM-DD-YYYY')
  }

  const handleConfirm = () => {
    if (selectedClientIds.length !== quantity) {
      Notification({
        message: 'Validation Error',
        description: `Please select exactly ${quantity} client${quantity > 1 ? 's' : ''} to delete`,
        type: 'error',
      })
      return
    }
    onConfirm(selectedClientIds)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Client) => (
        <Box display="flex" alignItems="center" gap="8px">
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
  ]

  return (
    <Modal
      open={open}
      title={`Select ${quantity} Client${quantity > 1 ? 's' : ''} to Delete`}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText="Confirm Delete"
      okButtonProps={{ danger: true, disabled: selectedClientIds.length !== quantity }}
      cancelText="Cancel"
      width={800}
    >
      <Text style={{ marginBottom: '16px', display: 'block' }}>
        You need to reduce {quantity} client{quantity > 1 ? 's' : ''}. Please select which clients to delete. This
        action cannot be undone.
      </Text>
      <Box display="flex" alignItems="center" marginBottom="16px">
        <Text>
          Selected: {selectedClientIds.length} / {quantity} client{quantity > 1 ? 's' : ''}
        </Text>
      </Box>
      <Table
        columns={columns}
        dataSource={clients}
        loading={loading}
        rowKey="_id"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedClientIds,
          onSelectAll: (selected, selectedRows, changeRows) => {
            const changeIds = changeRows.map((row) => row._id)
            if (selected) {
              const newSelected = [...selectedClientIds, ...changeIds].slice(0, quantity)
              setSelectedClientIds(newSelected)
            } else {
              setSelectedClientIds((prev) => prev.filter((id) => !changeIds.includes(id)))
            }
          },
          onSelect: (record, selected) => {
            if (selected && selectedClientIds.length < quantity) {
              setSelectedClientIds((prev) => [...prev, record._id])
            } else if (!selected) {
              setSelectedClientIds((prev) => prev.filter((id) => id !== record._id))
            }
          },
          getCheckboxProps: (record) => ({
            disabled: selectedClientIds.length >= quantity && !selectedClientIds.includes(record._id),
          }),
        }}
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: total,
          onChange: setCurrentPage,
        }}
      />
    </Modal>
  )
}
