import { boxProperties } from '@app/styles'
import { BoxProps } from '@app/types'
import { omitCSSProps } from '@app/utils'
import { forwardRef } from 'react'
import styled from 'styled-components'

export const StyledBox = styled(
  forwardRef<HTMLDivElement, BoxProps>(({ children, ...restProps }, ref) => {
    const props = omitCSSProps(restProps)
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  }),
)`
  ${boxProperties};
`
