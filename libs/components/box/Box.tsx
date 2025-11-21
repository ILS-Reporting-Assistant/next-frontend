import { BoxProps } from '@app/types'
import { forwardRef } from 'react'
import { StyledBox } from './elements'

/**
 * @returns - This is a way to create a styled component. It's a function that takes in reference of
 * Html div and returns a new Box component.
 */

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <StyledBox {...props} ref={ref} />
})
