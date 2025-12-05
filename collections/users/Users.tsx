import {
  Avatar,
  Box,
  Button,
  Dropdown,
  Icon,
  Modal,
  Notification,
  Spacer,
  Table,
  Tabs,
  TabPane,
  Text,
  Title,
} from '@app/components'
import React, { useCallback, useEffect, useState } from 'react'
import { StyledFilter, StyledFlexContainer, StyledSearch, StyledTag } from './elements'
import { USER_STATUS_COLORS, User, Invitation } from '@app/types'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { InviteUser } from './InviteUser'
import { usersService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { ModalAction } from '../../libs/enums'

export const Users = () => {
  const { color, user } = useSelector((state: IStore) => state)
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<User[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<ModalAction | null>(null)
  const [selectedInvitation, setSelectedInvitation] = useState<Invitation | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  const organizationId = user.currentOrganizationId

  const fetchData = useCallback(async () => {
    if (!organizationId) return

    setLoading(true)
    try {
      if (activeTab === 'users') {
        const response = await usersService.getOrganizationUsers(organizationId, {
          page: 1,
          limit: 100,
          search: search || undefined,
        })
        setUsers(response.data?.users || [])
      } else {
        const response = await usersService.getOrganizationInvitations(organizationId, {
          page: 1,
          limit: 100,
          search: search || undefined,
        })
        setInvitations(response.data?.invitations || [])
      }
    } catch (error) {
      // Handle error silently or show user-friendly message
    } finally {
      setLoading(false)
    }
  }, [organizationId, activeTab, search])

  useEffect(() => {
    if (organizationId) {
      const timeoutId = setTimeout(() => {
        fetchData()
      }, 300) // Debounce search by 300ms

      return () => clearTimeout(timeoutId)
    }
  }, [organizationId, fetchData])

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getUserName = (user: User | Invitation) => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || '-'
  }

  const getUserEmail = (user: User | Invitation) => {
    return 'emailAddress' in user ? user.emailAddress : user.email
  }

  const openModal = (action: ModalAction | null, invitation: Invitation) => {
    setSelectedInvitation(invitation)
    setModalAction(action)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalAction(null)
    setSelectedInvitation(null)
    setModalLoading(false)
  }

  const handleModalConfirm = async () => {
    if (!organizationId || !selectedInvitation || !modalAction) return

    setModalLoading(true)
    try {
      if (modalAction === ModalAction.RESEND) {
        const response = await usersService.resendInvitation(organizationId, {
          invitationId: selectedInvitation._id,
          organizationId: organizationId,
        })

        Notification({
          message: 'Invitation resent',
          description: response.message || 'Invitation has been resent successfully.',
          type: 'success',
        })
      } else if (modalAction === ModalAction.DELETE) {
        const response = await usersService.deleteInvitation(organizationId, selectedInvitation._id)

        Notification({
          message: 'Invitation deleted',
          description: response.message || 'Invitation has been deleted successfully.',
          type: 'success',
        })
      }

      closeModal()
      // Refresh the invitations list
      fetchData()
    } catch (error: any) {
      if (isValidationError(error)) {
        setModalLoading(false)
        return
      }

      Notification({
        message: modalAction === ModalAction.RESEND ? 'Failed to resend invitation' : 'Failed to delete invitation',
        description: extractErrorMessage(error),
        type: 'error',
      })
      setModalLoading(false)
    }
  }

  const getModalContent = () => {
    if (!selectedInvitation) return ''

    if (modalAction === ModalAction.RESEND) {
      return `Are you sure you want to resend the invitation to ${getUserEmail(selectedInvitation)}?`
    } else if (modalAction === ModalAction.DELETE) {
      return `Are you sure you want to delete the invitation for ${getUserEmail(
        selectedInvitation,
      )}? This action cannot be undone.`
    }
    return ''
  }

  const getModalTitle = () => {
    if (modalAction === ModalAction.RESEND) {
      return 'Resend Invitation'
    } else if (modalAction === ModalAction.DELETE) {
      return 'Delete Invitation'
    }
    return 'Confirm Action'
  }

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: User) => (
        <Box display="flex" alignItems="center">
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
    {
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <Text>{formatDate(date)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean) => {
        const status = isActive ? 'Active' : 'Inactive'
        const { bg, color: textColor } = USER_STATUS_COLORS[status] || USER_STATUS_COLORS['Active']
        return (
          <StyledTag
            style={{
              background: bg,
              color: textColor,
            }}
          >
            {status}
          </StyledTag>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => {
        const items = [{ key: '1', label: 'View' }]

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Icon.EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Dropdown>
        )
      },
    },
  ]

  const invitationColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Invitation) => (
        <Box display="flex" alignItems="center">
          <Avatar
            style={{ backgroundColor: color.primary, marginRight: '8px' }}
            icon={<Icon.UserOutlined />}
            size={24}
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
      title: 'Date Added',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <Text>{formatDate(date)}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusLabel = status === 'pending' ? 'Invite Pending' : status.charAt(0).toUpperCase() + status.slice(1)
        const { bg, color: textColor } = USER_STATUS_COLORS[statusLabel] || USER_STATUS_COLORS['Invite Pending']
        return (
          <StyledTag
            style={{
              background: bg,
              color: textColor,
            }}
          >
            {statusLabel}
          </StyledTag>
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Invitation) => {
        const items = [
          {
            key: 'resend',
            label: 'Resend',
            disabled: record.status !== 'pending',
            onClick: () => openModal(ModalAction.RESEND, record),
          },
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
            disabled: record.status !== 'pending',
            onClick: () => openModal(ModalAction.DELETE, record),
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
      <InviteUser open={open} setOpen={setOpen} onSuccess={fetchData} />
      <StyledFlexContainer>
        <Title level={2}>Users</Title>
        <Button onClick={() => setOpen(true)}>Invite New User</Button>
      </StyledFlexContainer>
      <Spacer value={16} />
      <Box display="flex" alignItems="center">
        <StyledSearch
          placeholder="Search"
          prefix={<Icon.SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StyledFilter
          placeholder={
            <>
              <Icon.FilterOutlined style={{ marginRight: '8px' }} />
              Filters
            </>
          }
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'Viewer', value: 'viewer' },
          ]}
        />
      </Box>
      <Spacer value={24} />
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Users" key="users">
          <Table columns={userColumns} dataSource={users} bordered={false} loading={loading} rowKey="_id" />
        </TabPane>
        <TabPane tab="Invited Users" key="invited">
          <Table columns={invitationColumns} dataSource={invitations} bordered={false} loading={loading} rowKey="_id" />
        </TabPane>
      </Tabs>
      <Modal
        open={modalOpen}
        title={getModalTitle()}
        onCancel={closeModal}
        onOk={handleModalConfirm}
        confirmLoading={modalLoading}
        okText={modalAction === ModalAction.DELETE ? 'Delete' : 'Resend'}
        okButtonProps={modalAction === ModalAction.DELETE ? { danger: true } : undefined}
        cancelText="Cancel"
      >
        <Text>{getModalContent()}</Text>
      </Modal>
    </Box>
  )
}
