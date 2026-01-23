import { ReactNode } from 'react'

export interface EmptyIllustrationProps {
  image: ReactNode
  text: string
  buttonText?: string
  buttonIcon?: ReactNode
  onClick?: () => void
  loading?: boolean
}
