import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Table, Notification, Text, Avatar, Icon, Tabs, TabPane, Box } from '@app/components'
import { usersService, extractErrorMessage } from '@app/services'
import { User, Invitation, SelectUsersModalProps } from '@app/types'
import { isValidationError } from '@app/utils'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'

export const SelectUsersModal: React.FC<SelectUsersModalProps> = ({
  open,
  onCancel,
  onConfirm,
  quantity,
  organizationId,
}) => {
  const { color, user } = useSelector((state: IStore) => state)
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<User[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [selectedInvitedUserIds, setSelectedInvitedUserIds] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [invitationPage, setInvitationPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [invitationTotal, setInvitationTotal] = useState(0)

  const fetchUsers = useCallback(async () => {
    if (!organizationId) return
    setLoading(true)
    try {
      const response = await usersService.getOrganizationUsers(organizationId, {
        page: currentPage,
        limit: 10,
      })
      setUsers(response.data?.users || [])
      setTotal(response.data?.total || 0)
    } catch (error) {
      if (isValidationError(error)) return

      Notification({
        message: 'Failed to fetch users',
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [organizationId, currentPage])

  const fetchInvitations = useCallback(async () => {
    if (!organizationId) return
    setLoading(true)
    try {
      const response = await usersService.getOrganizationInvitations(organizationId, {
        page: invitationPage,
        limit: 10,
      })
      setInvitations(response.data?.invitations || [])
      setInvitationTotal(response.data?.total || 0)
    } catch (error) {
      if (isValidationError(error)) return

      Notification({
        message: 'Failed to fetch invitations',
        description: extractErrorMessage(error as Error),
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }, [organizationId, invitationPage])

  useEffect(() => {
    if (open) {
      setSelectedUserIds([])
      setSelectedInvitedUserIds([])
      setCurrentPage(1)
      setInvitationPage(1)
      setActiveTab('users')
    }
  }, [open])

  useEffect(() => {
    if (open && activeTab === 'users' && organizationId) {
      fetchUsers()
    }
  }, [open, activeTab, currentPage])

  useEffect(() => {
    if (open && activeTab === 'invited' && organizationId) {
      fetchInvitations()
    }
  }, [open, activeTab, invitationPage])

  const getUserName = (user: User | Invitation) => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || '-'
  }

  const getUserEmail = (user: User | Invitation) => {
    return 'emailAddress' in user ? user.emailAddress : user.email
  }

  const handleConfirm = () => {
    const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
    if (totalSelected !== quantity) {
      Notification({
        message: 'Validation Error',
        description: `Please select exactly ${quantity} user${quantity > 1 ? 's' : ''} to remove`,
        type: 'error',
      })
      return
    }
    onConfirm(selectedUserIds, selectedInvitedUserIds)
  }

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: User) => (
        <Box display="flex" alignItems="center" gap="8px">
          <Avatar
            style={{ backgroundColor: color.primary, marginRight: '8px' }}
            icon={<Icon.UserOutlined />}
            size={34}
          />
          <Text>{getUserName(record)}</Text>
        </Box>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: any, record: User) => <Text>{getUserEmail(record)}</Text>,
    },
  ]

  const invitationColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Invitation) => (
        <Box display="flex" alignItems="center" gap="8px">
          <Avatar
            style={{ backgroundColor: color.primary, marginRight: '8px' }}
            icon={<Icon.UserOutlined />}
            size={34}
          />
          <Text>{getUserName(record)}</Text>
        </Box>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (_: any, record: Invitation) => <Text>{getUserEmail(record)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusLabel = status === 'pending' ? 'Invite Pending' : status.charAt(0).toUpperCase() + status.slice(1)
        return <Text>{statusLabel}</Text>
      },
    },
  ]

  return (
    <Modal
      open={open}
      title={`Select ${quantity} User${quantity > 1 ? 's' : ''} to Remove`}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText="Confirm Remove"
      okButtonProps={{ danger: true, disabled: selectedUserIds.length + selectedInvitedUserIds.length !== quantity }}
      cancelText="Cancel"
      width={800}
    >
      <Text style={{ marginBottom: '16px', display: 'block' }}>
        You need to reduce {quantity} seat{quantity > 1 ? 's' : ''}. Please select which users or invited users to
        remove. This action cannot be undone.
      </Text>
      <Box display="flex" alignItems="center" marginBottom="16px">
        <Text>
          Selected: {selectedUserIds.length + selectedInvitedUserIds.length} / {quantity} user{quantity > 1 ? 's' : ''}
        </Text>
      </Box>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Users" key="users">
          <Table
            columns={userColumns}
            dataSource={users}
            loading={loading}
            rowKey="_id"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedUserIds,
              onSelectAll: (selected, selectedRows, changeRows) => {
                const changeIds = changeRows.map((row) => row._id)
                const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
                if (selected) {
                  const remaining = quantity - totalSelected
                  const newSelected = [...selectedUserIds, ...changeIds].slice(0, remaining)
                  setSelectedUserIds(newSelected)
                } else {
                  setSelectedUserIds((prev) => prev.filter((id) => !changeIds.includes(id)))
                }
              },
              onSelect: (record, selected) => {
                const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
                if (selected && totalSelected < quantity) {
                  setSelectedUserIds((prev) => [...prev, record._id])
                } else if (!selected) {
                  setSelectedUserIds((prev) => prev.filter((id) => id !== record._id))
                }
              },
              getCheckboxProps: (record) => {
                const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
                return {
                  disabled:
                    (totalSelected >= quantity && !selectedUserIds.includes(record._id)) || record._id === user.uid,
                }
              },
            }}
            pagination={{
              current: currentPage,
              pageSize: 10,
              total: total,
              onChange: setCurrentPage,
            }}
          />
        </TabPane>
        <TabPane tab="Invited Users" key="invited">
          <Table
            columns={invitationColumns}
            dataSource={invitations}
            loading={loading}
            rowKey="_id"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: selectedInvitedUserIds,
              onSelectAll: (selected, selectedRows, changeRows) => {
                const changeIds = changeRows.map((row) => row._id)
                const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
                if (selected) {
                  const remaining = quantity - totalSelected
                  const newSelected = [...selectedInvitedUserIds, ...changeIds].slice(0, remaining)
                  setSelectedInvitedUserIds(newSelected)
                } else {
                  setSelectedInvitedUserIds((prev) => prev.filter((id) => !changeIds.includes(id)))
                }
              },
              onSelect: (record, selected) => {
                const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
                if (selected && totalSelected < quantity) {
                  setSelectedInvitedUserIds((prev) => [...prev, record._id])
                } else if (!selected) {
                  setSelectedInvitedUserIds((prev) => prev.filter((id) => id !== record._id))
                }
              },
              getCheckboxProps: (record) => {
                const totalSelected = selectedUserIds.length + selectedInvitedUserIds.length
                return {
                  disabled: totalSelected >= quantity && !selectedInvitedUserIds.includes(record._id),
                }
              },
            }}
            pagination={{
              current: invitationPage,
              pageSize: 10,
              total: invitationTotal,
              onChange: setInvitationPage,
            }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}
