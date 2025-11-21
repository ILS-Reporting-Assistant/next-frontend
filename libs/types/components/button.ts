import { FloatButtonProps as AntFloatButtonProps } from 'antd'
import { ButtonProps as AntButtonProps } from 'antd/lib/button'
import { LegacyRef } from 'react'

export type ButtonProps = AntButtonProps & { width?: string; type?: string; ref?: LegacyRef<HTMLButtonElement> }
export type FloatButtonProps = AntFloatButtonProps
