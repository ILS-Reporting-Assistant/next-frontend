import { Box, Button, Text } from '@app/components'
import { BoxProps, ButtonProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const Label = styled((props: TextProps) => <Text {...props} />)`
  color: #767676;
  height: 44px;
  display: block;
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
`
export const StyledBox = styled((props: BoxProps) => <Box {...props} />)`
  border: 1px solid #d3d5d8;
  padding: 32px;
`
export const StyledButton = styled((props: ButtonProps) => <Button {...props} />)`
  width: 100%;
`
