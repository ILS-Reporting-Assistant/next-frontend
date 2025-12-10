import { Box, Text } from '@app/components'
import { BoxProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const StyledTabContent = styled((props: BoxProps) => <Box {...props} />)`
  padding: 0;
`

export const StyledSectionTitle = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: 0 !important;
  font-weight: 500;
  font-size: 16px;
`

export const StyledSectionSubTitle = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: 0 !important;
  color: #7e7e7e;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`

export const StyledDivider = styled((props: BoxProps) => <Box {...props} />)`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 12px !important;
  margin-bottom: 28px;
`
