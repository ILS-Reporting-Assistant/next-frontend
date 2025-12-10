import { Box, Button, Dropdown, Icon, Select, Spacer, Table, Text, Title } from '@app/components'
import React from 'react'
import { StyledClientAvatar, StyledFlexContainer, StyledSearch } from './elements'
import { ProgressReportsData, ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'

export const ProgressReports = () => {
  const router = useRouter()
  const { color } = useSelector((state: IStore) => state)
  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Client Name',
      dataIndex: 'client',
      key: 'client',
      render: (name, record) => (
        <Box display="flex" alignItems="center">
          <StyledClientAvatar $backgroundColor={color.primary} $textColor={color.white}>
            {name ? name.charAt(0).toUpperCase() : 'A'}
          </StyledClientAvatar>
          <Text>{name}</Text>
        </Box>
      ),
    },
    {
      title: 'Date Created',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => {
        const items = [
          { key: '1', label: 'View' },
          { key: '2', label: 'Download' },
          { key: '3', label: 'Delete' },
        ]

        return (
          <Dropdown menu={{ items }} trigger={['click']}>
            <Icon.EllipsisOutlined style={{ fontSize: 20, cursor: 'pointer' }} />
          </Dropdown>
        )
      },
    },
  ]

  const onChange = (value: string) => {
    // console.log(`selected ${value}`)
  }

  return (
    <Box>
      <StyledFlexContainer>
        <Title level={2}>Progress Reports</Title>
        <Button onClick={() => router.replace(ROUTE.CREATE_PROGRESS_REPORTS)}>Create New Report</Button>
      </StyledFlexContainer>
      <Spacer value={16} />
      <Box display="flex">
        <StyledSearch placeholder="Search" prefix={<Icon.SearchOutlined />} />
        <Select
          marginLeft="16px"
          showSearch
          placeholder="Select a client"
          onChange={onChange}
          options={[
            {
              value: 'chris',
              label: 'Chris Wilson',
            },
            {
              value: 'john',
              label: 'John Smith',
            },
          ]}
        />
      </Box>
      <Spacer value={24} />
      <Table columns={columns} dataSource={ProgressReportsData} bordered={false} />
    </Box>
  )
}
