import { ButtonProps, PlanUsageProps, BoxProps, TextProps,TagProps } from '@app/types'
import { Button, Box, Text, Tag } from '@app/components'
import styled from 'styled-components'

export const StyledPlanUsageContainer = styled((props: BoxProps & PlanUsageProps) => <Box {...props} />)<PlanUsageProps>`
  padding-top: 12px;
  padding-bottom: 14px;
  margin: 0 24px;
  border-top: 1px solid #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-bottom: 20px;
  // background: ${(props) => props.theme.color.secondary};
`

export const StyledPlanHeader = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-left: 4px;
`

export const StyledPlanTitle = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  gap:4px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`

export const StyledRefreshIcon = styled((props: BoxProps) => <Box {...props} />)`
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 14px;
  &:hover {
    opacity: 0.7;
  }
`

export const StyledReportsUsed = styled((props: TextProps) => <Text {...props} />)`
padding-left: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`

export const StyledProgressContainer = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 4px;
  height: 22px;
`

export const StyledResetInfo = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 22px;
  padding-left: 4px;
`

export const StyledActiveChip = styled((props: TextProps) => <Text {...props} />)`
  background: #477E2C;
  padding: 0px 6px;
   color: #477e2c;
  // padding: 0px 6px;
  height: 17px;
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  border-radius: 2px;
  border: 1px solid #9bd280;
  background: #bad7ab;
`

export const StyledViewAllButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: #fff !important;
  color: #000 !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 4px !important;
  padding: 0 24px !important;
  width: 100%;
  height: 40px;
  margin: 0px auto;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;

  &.ant-btn,
  &.ant-btn-default {
    height: 40px;
    padding: 0 24px !important;
    font-size: 14px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.9) !important;
  }
`

export const StyledViewAllButtonContainer = styled((props: BoxProps) => <Box {...props} />)`
  margin: 0px auto;
  text-align: center;
`

export const StyledCrownIcon = styled((props: TextProps) => <Text {...props} />)`
  margin-right: 4px;
  margin-bottom:2px;
  color: #fff;
  font-size: 16px;
`

export const StyledReportsCount = styled((props: TextProps) => <Text {...props} />)`
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`

export const StyledResetInfoContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
`

export const StyledCalendarIcon = styled((props: TextProps) => <Text {...props} />)`
  margin-right: 6px;
  color: #fff;
`
