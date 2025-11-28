import { Box } from '@app/components'
import { BoxProps } from '@app/types'
import styled from 'styled-components'

export const StyledVerifyingBox = styled((props: BoxProps) => <Box {...props} />)`
  text-align: center;
  padding: 40px 0;
`

