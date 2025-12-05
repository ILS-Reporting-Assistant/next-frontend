import { AriaAttributes, HTMLAttributes, Ref } from 'react'
import { BoxProperties } from '../css'

type DivElProps = JSX.IntrinsicElements['div'] & AriaAttributes

export interface BoxProps extends HTMLAttributes<HTMLDivElement>, DivElProps, BoxProperties {
  ref?: Ref<HTMLDivElement>
}

export interface StyledBoxProps extends BoxProps {}
