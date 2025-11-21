import { MenuProps } from '@app/types'
import { Menu as AntMenu } from 'antd'
import { StyledSiderMenu } from './elements'

export const Menu: React.FC<MenuProps> = (props: MenuProps) => <AntMenu {...props} />
export const SiderMenu: React.FC<MenuProps> = (props: MenuProps) => <StyledSiderMenu {...props} />