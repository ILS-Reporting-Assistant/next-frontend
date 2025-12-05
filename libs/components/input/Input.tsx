import { InputProps } from '@app/types'
import { forwardRef } from 'react'
import { StyledInput } from './elements'

export const Input = forwardRef<HTMLInputElement, InputProps>((props) => <StyledInput {...props} />)
