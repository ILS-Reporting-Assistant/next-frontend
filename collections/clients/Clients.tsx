import {
  Box,
  Button,
  Dropdown,
  Icon,
  Notification,
  Spacer,
  Table,
  Text,
  Title,
} from '@app/components'
import React, { useCallback, useEffect, useState } from 'react'
import { StyledFlexContainer, StyledSearch, StyledClientAvatar } from './elements'
import { Client } from '@app/types'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { AddClient } from './AddClient'
import { clientsService, extractErrorMessage } from '@app/services'
import { isValidationError } from '@app/utils'
import { ClientsData } from '@app/data'

export const Clients = () => {
  const { color, user } = useSelector((state: IStore) => state)
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>(ClientsData)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const organizationId = user.currentOrganizationId

  // Filter mock data based on search
  useEffect(() => {
    let filteredData = ClientsData
    if (search) {
      filteredData = ClientsData.filter(
        (client) =>
          client.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          client.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          client.email?.toLowerCase().includes(search.toLowerCase())
      )
    }
    setClients(filteredData)
  }, [search])

  const fetchData = useCallback(async () => {
    // Always use mock data - filter based on search
    let filteredData = ClientsData
    if (search) {
      filteredData = ClientsData.filter(
        (client) =>
          client.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          client.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          client.email?.toLowerCase().includes(search.toLowerCase())
      )
    }
    setClients(filteredData)
    
    // Optional: Try to fetch from API in the background (commented out for now)
    // if (organizationId) {
    //   setLoading(true)
    //   try {
    //     const response = await clientsService.getOrganizationClients(organizationId, {
    //       page: 1,
    //       limit: 100,
    //       search: search || undefined,
    //     })
    //     const apiClients = response.data?.clients || []
    //     if (apiClients.length > 0) {
    //       setClients(apiClients)
    //     }
    //   } catch (error) {
    //     // Keep mock data on error
    //   } finally {
    //     setLoading(false)
    //   }
    // }
  }, [search])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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

  const handleDelete = async (clientId: string) => {
    if (!organizationId) return

    try {
      await clientsService.deleteClient(organizationId, clientId)
      Notification({
        message: 'Client deleted',
        description: 'Client has been deleted successfully.',
        type: 'success',
      })
      fetchData()
    } catch (error: any) {
      if (isValidationError(error)) return

      Notification({
        message: 'Failed to delete client',
        description: extractErrorMessage(error),
        type: 'error',
      })
    }
  }

  const clientColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Client) => (
        <Box display="flex" alignItems="center">
          <StyledClientAvatar
            $backgroundColor={color.primary}
            $textColor={color.white}
           >
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
            onClick: () => handleDelete(record._id),
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
      <Table columns={clientColumns} dataSource={clients} bordered={false} loading={loading} rowKey="_id" />
    </Box>
  )
}

