import { ComponentProps } from 'react'

export interface ReactQuillProps {
  theme?: string
  value?: string
  onChange?: (content: string) => void
  placeholder?: string
  modules?: {
    toolbar?: any[]
    [key: string]: any
  }
  formats?: string[]
  readOnly?: boolean
  bounds?: string | HTMLElement
  defaultValue?: string
  id?: string
  className?: string
  style?: React.CSSProperties
}

