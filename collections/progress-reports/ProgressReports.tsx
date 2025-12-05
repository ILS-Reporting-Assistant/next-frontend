import { Box, Button, Dropdown, Icon, Spacer, Table, Title } from '@app/components'
import React from 'react'
import { StyledFlexContainer, StyledSearch } from './elements'
import { ProgressReportsData } from '@app/data'

export const ProgressReports = () => {
  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
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

  return (
    <Box>
      <StyledFlexContainer>
        <Title level={2}>Progress Reports</Title>
        <Button>Create New Report</Button>
      </StyledFlexContainer>
      <Spacer value={16} />
      <StyledSearch placeholder="Search" prefix={<Icon.SearchOutlined />} />
      <Spacer value={24} />
      <Table columns={columns} dataSource={ProgressReportsData} bordered={false} />
    </Box>
  )
}
