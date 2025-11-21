import { Box, Button, Text } from '@app/components'
import { TextProps, BoxProps, ButtonProps } from '@app/types'
import styled from 'styled-components'

export const StyledOnboardingBox = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  text-align: center;
  max-width: 620px;
  width: 100%;
  margin: 0 auto;
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: medium;
`
export const StyledButton = styled((props: ButtonProps) => <Button {...props} />)`
  width: 60%;
`
