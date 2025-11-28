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
        icon: <Icon.LineChartOutlined />,
        key: 'progress-reports',
        label: 'Progress Reports',
        route: '/progress-reports',
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
    return items
  }, [user])

  const onClick = (route: string) => {
    router.push(route)
  }

  return ITEMS.map((item) => ({
    icon: item.icon,
    key: item.key,
    label: item.label,
    onClick: () => {
      onClick(item.route)
    },
    // children: item.children?.map((subMenu) => ({
    //   icon: subMenu.icon,
    //   key: subMenu.key,
    //   label: subMenu.label,
    //   onClick: () => onClick(subMenu.route) as any,
    // })),
  }))
}
