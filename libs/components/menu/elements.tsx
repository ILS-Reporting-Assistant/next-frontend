import { MenuProps } from '@app/types'
import { Menu as AntMenu } from 'antd'
import styled from 'styled-components'

export const StyledSiderMenu = styled((props: MenuProps) => <AntMenu {...props} />)`
  &&.ant-menu-dark.ant-menu-root.ant-menu-inline {
    overflow: auto;
    height: calc(100vh - 286px);
  }
  &&.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline {
    background: ${(props) => props.style.background};
  }
  &&.ant-menu-dark .ant-menu-item-selected {
    background-color: #303030;
  }
  &&.ant-menu-inline .ant-menu-item {
    height: 50px !important;
    line-height: 50px !important;
  }
`
