import { DownOutlined, ExclamationCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Modal, Space, Text } from '@app/components'
import { IStore, logout } from '@app/redux'
import type { MenuProps } from '@app/types'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  StyledBadge,
  StyledButton,
  StyledText,
  StyledModalCancelButton,
  StyledModalConfirmButton,
  StyledModalFooter,
} from './elements'
import { ROUTE } from '@app/data'

export const ProfileMenu: React.FC = () => {
  const { color, trigger, user } = useSelector((state: IStore) => state)
  const dispatch = useDispatch()
  const router = useRouter()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const logOut = () => {
    dispatch(logout())
    router.replace(ROUTE.AUTH.SIGN_IN)
  }

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true)
  }

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false)
    logOut()
  }

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false)
  }

  const handleProfileClick = () => {
    router.push(`${ROUTE.ACCOUNT_SETTING}?tab=profile`)
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
      onClick: handleProfileClick,
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
      onClick: () => showLogoutModal(),
    },
  ]
  const nameInitials = () => {
    let displayName = ''
    if (user?.firstName) {
      const name = user.firstName
      const lastName = user.lastName || ''
      displayName = name[0].charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : '')
    } else {
      displayName = user?.email?.split('@')?.[0] || ''.charAt(0).toUpperCase()
    }
    return displayName
  }
  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <StyledButton type={'default'} style={{ backgroundColor: color.primary }}>
          <Space>
            {trigger.showBadge ? (
              <StyledBadge size="small" count={4}>
                <Avatar style={{ backgroundColor: color.secondary }} icon={<UserOutlined />} size={'small'} />
              </StyledBadge>
            ) : (
              <Avatar size={'small'} style={{ backgroundColor: '#303030' }} name={nameInitials()} />
            )}
            {/* <StyledText>{user?.firstName || user?.email?.split('@')?.[0]}</StyledText> */}
            {/* <DownOutlined style={{ color: color.white }} /> */}
          </Space>
        </StyledButton>
      </Dropdown>
      <Modal open={isLogoutModalOpen} title="Confirm Logout" onCancel={handleLogoutCancel} centered footer={null}>
        <Text>Are you sure you want to logout?</Text>
        <StyledModalFooter>
          <StyledModalCancelButton type="default" onClick={handleLogoutCancel}>
            Cancel
          </StyledModalCancelButton>
          <StyledModalConfirmButton type="primary" onClick={handleLogoutConfirm}>
            Yes
          </StyledModalConfirmButton>
        </StyledModalFooter>
      </Modal>
    </>
  )
}
