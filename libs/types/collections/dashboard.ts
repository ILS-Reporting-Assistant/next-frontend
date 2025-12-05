import { BoxProps } from '../components'

export interface AccountBalanceCardProps {
  balanceCard: {
    balance: string
    currency: string
    icon: JSX.Element
  }
  onClick: () => any
}

export interface DashboardCardData {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  disable?: boolean
}

export interface DashboardStyledBoxProps extends BoxProps {
  disabled?: boolean
}
