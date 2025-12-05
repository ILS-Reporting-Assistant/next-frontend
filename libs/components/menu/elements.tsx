import { MenuProps } from '@app/types'
import { Menu as AntMenu } from 'antd'
import styled from 'styled-components'

export const StyledSiderMenu = styled((props: MenuProps) => <AntMenu {...props} />)`
  &&.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
    background: ${(props) => props.style.background};
  }
  &&.ant-menu-dark .ant-menu-item-selected {
    background-color: #303030;
  }
`
