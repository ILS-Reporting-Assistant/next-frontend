import { PageHeaderProps as AntPageHeaderProps } from 'antd-v4'

interface ICustomProps {
  isNavbar?: boolean
  disableBreadcrumb?: boolean
}

export type PageHeaderProps = AntPageHeaderProps & ICustomProps
