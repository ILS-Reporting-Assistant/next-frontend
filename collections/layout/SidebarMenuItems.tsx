import { Icon } from '@app/components'
import { MenuItem } from '@app/types'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AccountType } from '../../libs/enums'
import { IStore } from '../../libs/redux-store'

export const SIDEBAR_MENU_ITEMS = (): MenuItem[] => {
  const router = useRouter()
  const { user } = useSelector((state: IStore) => state)

  const ITEMS = useMemo(() => {
    const items = [
      {
        icon: <Icon.AppstoreOutlined />,
        key: 'dashboard',
        label: 'Dashboard',
        route: '/dashboard',
      },
      {
        icon: <Icon.UserOutlined />,
        key: 'clients',
        label: 'Clients',
        route: '/clients',
      },
      {
        icon: <Icon.FileTextOutlined />,
        key: 'assessment-reports',
        label: 'Initial Assessment Reports',
        route: '/assessment-reports',
      },
      {
        icon: <Icon.LineChartOutlined />,
        key: 'progress-reports',
        label: 'Progress Reports',
        route: '/progress-reports',
      },
      {
        icon: <Icon.ProfileOutlined />,
        key: 'isp-reviews',
        label: 'Annual ISP Review',
        route: '/isp-reviews',
      },
    ]

    if (user.type === AccountType.ORGANIZATION) {
      items.push({
        icon: <Icon.TeamOutlined />,
        key: 'users',
        label: 'Users',
        route: '/users',
      })
    }
    
    items.push({
      icon: <Icon.SettingOutlined />,
      key: 'account-setting',
      label: 'Settings',
      route: '/account-setting',
    })
    
    return items
  }, [user])

  const handleRouteClick = (route: string) => {
    router.push(route)
  }

  return ITEMS.map((item) => ({
    icon: item.icon,
    key: item.key,
    label: item.label,
    onClick: () => {
      handleRouteClick(item.route)
    },
  }))
}
