import {
  Avatar,
  Box,
  Button,
  Dropdown,
  Icon,
  Modal,
  Notification,
  Tooltip,
  Spacer,
  Table,
  Tabs,
  TabPane,
  Text,
  Title,
} from '@app/components'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyledFlexContainer, StyledSearch, StyledActiveTag, StyledInactiveTag, StyledPendingTag } from './elements'
import { User, Invitation } from '@app/types'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { InviteUser } from './InviteUser'
import { usersService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { ModalAction } from '../../libs/enums'
import { usePlanUsage } from '../layout/plan-usage/PlanUsageContext'

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const { usage, refresh } = usePlanUsage()

  const organizationId = user.currentOrganizationId

  const fetchData = useCallback(async () => {
    if (!organizationId) return

    setLoading(true)
    try {
      refresh()
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
  }, [organizationId, activeTab, fetchData])

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

  const openModal = (action: ModalAction | null, invitation?: Invitation, user?: User) => {
    if (invitation) {
      setSelectedInvitation(invitation)
      setSelectedUser(null)
    } else if (user) {
      setSelectedUser(user)
      setSelectedInvitation(null)
    }
    setModalAction(action)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setModalAction(null)
    setSelectedInvitation(null)
    setSelectedUser(null)
    setModalLoading(false)
  }

  const handleModalConfirm = async () => {
    if (!organizationId || !modalAction) return

    setModalLoading(true)
    try {
      if (modalAction === ModalAction.RESEND && selectedInvitation) {
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
        if (selectedInvitation) {
          const response = await usersService.deleteInvitation(organizationId, selectedInvitation._id)

          Notification({
            message: 'Invitation deleted',
            description: response.message || 'Invitation has been deleted successfully.',
            type: 'success',
          })
        } else if (selectedUser) {
          const response = await usersService.deleteUserFromOrganization(organizationId, selectedUser._id)

          Notification({
            message: 'User removed',
            description: response.message || 'User has been removed from the organization successfully.',
            type: 'success',
          })
        }
      }

      closeModal()
      // Refresh the list
      fetchData()
    } catch (error: any) {
      if (isValidationError(error)) {
        setModalLoading(false)
        return
      }

      const errorMessage =
        modalAction === ModalAction.RESEND
          ? 'Failed to resend invitation'
          : selectedUser
          ? 'Failed to remove user'
          : 'Failed to delete invitation'

      Notification({
        message: errorMessage,
        description: extractErrorMessage(error),
        type: 'error',
      })
      setModalLoading(false)
    }
  }

  const getModalContent = () => {
    if (modalAction === ModalAction.RESEND && selectedInvitation) {
      return `Are you sure you want to resend the invitation to ${getUserName(selectedInvitation)}?`
    } else if (modalAction === ModalAction.DELETE) {
      if (selectedInvitation) {
        return `Are you sure you want to delete the invitation for ${getUserEmail(
          selectedInvitation,
        )}? This action cannot be undone.`
      } else if (selectedUser) {
        return `Are you sure you want to remove ${getUserName(selectedUser)} (${getUserEmail(
          selectedUser,
        )}) from this organization? This action cannot be undone.`
      }
    }
    return ''
  }

  const getModalTitle = () => {
    if (modalAction === ModalAction.RESEND) {
      return 'Resend Invitation'
    } else if (modalAction === ModalAction.DELETE) {
      return selectedUser ? 'Remove User' : 'Delete Invitation'
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
        return isActive ? <StyledActiveTag>{status}</StyledActiveTag> : <StyledInactiveTag>{status}</StyledInactiveTag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => {
        const items = [
          {
            key: 'delete',
            label: 'Delete',
            danger: true,
            onClick: () => openModal(ModalAction.DELETE, undefined, record),
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
        return <StyledPendingTag>{statusLabel}</StyledPendingTag>
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

  const buttonState = useMemo(() => {
    const isFreePlan = usage?.plan?.amount === 0
    const limitReached = usage?.remainingSeats === 0
    const disabled = (isFreePlan && limitReached) || limitReached

    let tooltipMessage: string | undefined
    if (isFreePlan && limitReached) {
      tooltipMessage = 'Please upgrade your plan to invite more users'
    } else if (limitReached) {
      tooltipMessage = 'You have reached the limit for inviting users'
    }

    return { disabled, tooltipMessage }
  }, [usage?.plan?.amount, usage?.remainingSeats])

  return (
    <Box>
      <InviteUser open={open} setOpen={setOpen} onSuccess={fetchData} />
      <StyledFlexContainer>
        <Title level={2}>Users</Title>
        <Tooltip title={buttonState.tooltipMessage}>
          <Button onClick={() => setOpen(true)} disabled={buttonState.disabled}>
            Invite New User
          </Button>
        </Tooltip>
      </StyledFlexContainer>
      <Spacer value={16} />
      <Box display="flex" alignItems="center">
        <StyledSearch
          placeholder="Search"
          prefix={<Icon.SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <StyledFilter
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
        /> */}
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
        okButtonProps={
          modalAction === ModalAction.DELETE
            ? { danger: true, style: { height: '42px' } }
            : { style: { height: '42px', border: 'none', boxShadow: 'none' } }
        }
        cancelButtonProps={{ style: { height: '42px' } }}
        cancelText="Cancel"
      >
        <Text>{getModalContent()}</Text>
      </Modal>
    </Box>
  )
}
