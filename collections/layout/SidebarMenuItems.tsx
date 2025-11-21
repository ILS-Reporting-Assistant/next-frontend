import { Icon } from '@app/components'
import { MenuItem } from '@app/types'
import { useRouter } from 'next/router'

const ITEMS = [
  {
    icon: <Icon.AppstoreOutlined />,
    key: 'dashboard',
    label: 'Dashboard',
    route: '/dashboard',
  },
]

export const SIDEBAR_MENU_ITEMS = (): MenuItem[] => {
  const router = useRouter()

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
