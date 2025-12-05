import { DownOutlined, ExclamationCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Space, Text } from '@app/components'
import { IStore, logout } from '@app/redux'
import type { MenuProps } from '@app/types'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { StyledBadge, StyledButton, StyledText } from './elements'
import { ROUTE } from '@app/data'

export const ProfileMenu: React.FC = () => {
  const { color, trigger, user } = useSelector((state: IStore) => state)
  const dispatch = useDispatch()
  const router = useRouter()

  const logOut = () => {
    dispatch(logout())
    router.replace(ROUTE.AUTH.SIGN_IN)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <Space direction="vertical" size={4}>
            <Text>{user?.firstName || user?.email?.split('@')?.[0]}</Text>
            <Text type="secondary">{user.email}</Text>
          </Space>
        </>
      ),
      onClick: () => {
        return
      },
    },
    {
      type: 'divider',
    },
    {
      icon: <ExclamationCircleOutlined />,
      key: '5',
      label: 'Help Center',
      onClick: () => {
        return
      },
    },
    {
      icon: <LogoutOutlined />,
      key: '6',
      label: 'Log Out',
      onClick: () => logOut(),
    },
  ]
  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <StyledButton type={'default'} style={{ backgroundColor: color.primary }}>
        <Space>
          {trigger.showBadge ? (
            <StyledBadge size="small" count={4}>
              <Avatar style={{ backgroundColor: color.secondary }} icon={<UserOutlined />} size={'small'} />
            </StyledBadge>
          ) : (
            <Avatar icon={<UserOutlined />} size={'small'} style={{ backgroundColor: '#303030' }} />
          )}
          <StyledText>{user?.firstName || user?.email?.split('@')?.[0]}</StyledText>
          <DownOutlined style={{ color: color.white }} />
        </Space>
      </StyledButton>
    </Dropdown>
  )
}
