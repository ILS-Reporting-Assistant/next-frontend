import { Box, Button, Dropdown, Icon, Spacer, Table, Title } from '@app/components'
import { AssessmentReportsData, ROUTE } from '@app/data'
import { useRouter } from 'next/router'
import { StyledFlexContainer, StyledSearch } from './elements'


export const AssessmentReports = () => {
  const router = useRouter()
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
        <Title level={2}>Initial Assessment Reports</Title>
        <Button onClick={() => router.replace(ROUTE.CREATE_ASSESSMENT_REPORTS)}>Create New Report</Button>
      </StyledFlexContainer>
      <Spacer value={16} />
      <StyledSearch placeholder="Search" prefix={<Icon.SearchOutlined />} />
      <Spacer value={24} />
      <Table columns={columns} dataSource={AssessmentReportsData} bordered={false} />
    </Box>
  )
}

