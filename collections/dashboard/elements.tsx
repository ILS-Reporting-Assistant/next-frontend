import { Box, Button, Row, Text, Title } from '@app/components'
import { maxMobile, maxTablet } from '@app/styles'
import { BoxProps, ButtonProps, RowProps, TextProps, DashboardStyledBoxProps } from '@app/types'
import { TitleProps } from 'antd/lib/typography/Title'
import { Badge } from 'antd'
import styled from 'styled-components'

export const Label = styled((props: TextProps) => <Text {...props} />)`
  color: #727272;
  display: block;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  padding-top: 8px;

  
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
    font-size: 14px;
`
export const StyledCardText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 18px;
  line-height: 100%;
  font-weight: 500;

  @media only screen and (max-width: ${maxTablet}) {
    font-size: 18px;
  }

  @media only screen and (max-width: ${maxMobile}) {
    font-size: 16px;
  }
`
export const StyledRow = styled((props: RowProps) => <Row {...props} />)`
  display: flex;
  flex-wrap: wrap;
  
  .ant-col {
    display: flex;
    flex-direction: column;
  }
`

export const StyledBox = styled((props: DashboardStyledBoxProps) => <Box {...props} />)<DashboardStyledBoxProps>`
  border: 1px solid #d3d5d8;
  // padding: 32px;
  border-radius: 8px;
  padding: 40px 28px 28px;
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: opacity 0.3s ease;

  .ant-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }

  .ant-col {
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: ${maxTablet}) {
    padding: 24px;
  }

  @media only screen and (max-width: ${maxMobile}) {
    padding: 16px;
  }
`

export const StyledCardContent = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const StyledButtonWrapper = styled((props: BoxProps) => <Box {...props} />)`
  margin-top: auto;
  padding-top: 24px;
`
export const StyledButton = styled((props: ButtonProps) => <Button {...props} />)`
  // width: 100%;
  background: #000 !important;
  color: #fff !important;
  border-color: #000 !important;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 14px;
  padding: 0 24px;
  border-radius: 3px;

  &:disabled,
  &.ant-btn-disabled {
    background: #000 !important;
    color: #fff !important;
    border-color: #000 !important;
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled):not(.ant-btn-disabled) {
    background: #333 !important;
    border-color: #333 !important;
    color: #fff !important;
  }

  @media only screen and (max-width: ${maxTablet}) {
    font-size: 14px;
    height: 40px;
    padding: 0 24px;
  }

  @media only screen and (max-width: ${maxMobile}) {
    width: 100%;
    font-size: 14px;
    height: 40px;
    padding: 0 24px;
  }
`

export const StyledRibbon = styled(Badge.Ribbon)`
  // Add Figma styles here when provided
  padding: 4px 10px;
  height: 28px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
`

export const StyledRibbonText = styled((props: TextProps) => <Text {...props} />)`
  color: #313c77;
  font-weight: 800;
    font-size: 12px;
`

export const StyledRibbonIcon = styled((props: TextProps) => <Text {...props} />)`
  margin-right: 4px;

  .anticon {
    color: #313c77 !important;
  }
`

export const StyledCardIcon = styled((props: BoxProps) => <Box {...props} />)`
  font-size: 30px;
`

export const StyledBackIconInner = styled((props: TextProps) => <Text {...props} />)`
  font-size: 10px;
  width: 10px;
  height: 9px;
`

export const StyledWelcomeTitle = styled((props: TitleProps) => <Title {...props} />)`
  font-size: 28px !important;
  
  @media only screen and (max-width: ${maxTablet}) {
    font-size: 24px !important;
  }

  @media only screen and (max-width: ${maxMobile}) {
    font-size: 20px !important;
  }
`
