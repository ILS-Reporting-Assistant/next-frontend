import { Box, Drawer, Spacer, TabPane, Tabs, Text } from '@app/components'
import { IStore } from '@app/redux'
import { ViewClientProps } from '@app/types'
import { getAvatarText, getClientName } from '@app/utils'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledClientAvatar } from './elements'
import { Notes } from './Notes'
import { Reports } from './Reports'
import { StatusTimeline } from './StatusTimeline'

export const ViewClient = ({ open, setOpen, client }: ViewClientProps) => {
  const { color } = useSelector((state: IStore) => state)
  const router = useRouter()
  const { tab } = router.query
  const [activeTab, setActiveTab] = useState('status')

  useEffect(() => {
    if (tab === 'status') {
      setActiveTab('status')
    } else if (tab === 'notes') {
      setActiveTab('notes')
    } else if (tab === 'reports') {
      setActiveTab('reports')
    }
  }, [tab])

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-'
    return moment(dateString).format('MM-DD-YYYY')
  }

  const handleClose = () => {
    setOpen(false)
    setActiveTab('status')
  }

  return (
    <Drawer title="View Client Detail" open={open} onClose={handleClose} footer={null}>
      <Box display="flex" alignItems="center">
        <StyledClientAvatar $backgroundColor={color.primary} $textColor={color.white} size={48}>
          {getAvatarText(client)}
        </StyledClientAvatar>
        <Text>{getClientName(client)}</Text>
      </Box>
      {/* <Divider /> */}
      <Spacer value={8} />
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={'Status'} key="status">
          <StatusTimeline clientId={client?._id} />
        </TabPane>
        <TabPane tab={'Notes'} key="notes">
          <Notes clientId={client?._id} />
        </TabPane>
        <TabPane tab={'Reports'} key="Reports">
          <Reports clientId={client?._id} />
        </TabPane>
      </Tabs>
    </Drawer>
  )
}
