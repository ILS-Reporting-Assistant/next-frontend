import { Box, Button, Col, Link, Progress, Row, Text, Title } from '@app/components'
import { maxComputer, maxMobile, maxTablet } from '@app/styles'
import { BoxProps, ButtonProps, ColProps, LinkProps, RowProps, TextProps } from '@app/types'
import { TitleProps } from 'antd/es/typography/Title'
import styled from 'styled-components'

export const StyledRow = styled((props: RowProps) => <Row {...props} />)`
  align-items: center;
  justify-content: center;
`

export const StyledTitle = styled((props: TitleProps) => <Title {...props} />)`
margin-bottom:0px !important;
  @media only screen and (max-width: ${maxMobile}) {
    text-align: center;
  }
`
export const StyledContainer = styled((props: RowProps) => <Row {...props} />)`
  background: ${(props) => props.theme.color.background};
  min-height: 100vh;
  display: flex;
  @media only screen and (max-width: ${maxTablet}) {
    min-height: 1vh;
  }
`

export const StyledRightCol = styled((props: ColProps) => <Col {...props} />)`
  border-left: 0.2px solid ${(props) => props.theme.color.grey2};
  /* background: url('/images/signup-image.png') no-repeat center center; */
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex: 1;
  background-color: ${(props) => props.theme.color.secondary};
  @media only screen and (max-width: ${maxTablet}) {
    display: none;
  }
`

export const StyledFieldsCol = styled((props: ColProps) => <Col {...props} />)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 80px 20px 80px;

  @media only screen and (max-width: ${maxComputer}) {
    padding: 50px 50px;
  }
  @media only screen and (max-width: ${maxTablet}) {
    padding: 50px 150px;
  }
  @media only screen and (max-width: ${maxMobile}) {
    padding: 15px;
  }
`

export const StyledCol = styled((props: ColProps) => <Col {...props} />)`
  text-align: right;
  width: 100%;
`
export const StyledBox = styled((props: BoxProps) => <Box {...props} />)`
  border: 1px solid #dddddd;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
`

export const StyledLoginBox = styled((props: BoxProps) => <Box {...props} />)`
  border: 1px solid #dddddd;
  border-radius: 16px;
  padding: 32px;
  width: 500px;
  
  @media only screen and (max-width: ${maxMobile}) {
    width: 100%;
  }
`

export const StyledProgressBarWrapper = styled((props: BoxProps) => <Box {...props} />)`
  margin: 10px 0;

  
  .ant-progress-bg {
    background-color: black !important;
  }
`

export const StyledStepText = styled((props: TextProps) => <Text {...props} />)`
  color: #232323;
  font-weight: 800;
  font-size: 14px;
  line-height: 100%;
  padding-bottom: 20px;
  display: block;
`

export const StyledStepContentWrapper = styled((props: BoxProps) => <Box {...props} />)`
  min-height: 200px;
`

export const StyledButtonWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  
  button:only-child {
    margin-left: auto;
  }
`

export const StyledGoBackButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white !important;
  border-color: black !important;
  color: black !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;
  
  &.ant-btn,
  &.ant-btn-default {
    background: white !important;
    border-color: black !important;
    color: black !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
  
  &:hover,
  &:hover:not(:disabled),
  &.ant-btn:hover,
  &.ant-btn:hover:not(:disabled) {
    background: white !important;
    border-color: black !important;
    color: black !important;
  }
`

export const StyledNextButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border: 1px solid black !important;
  color: white !important;
  height: 40px;
  padding: 0 24px;
  
  &.ant-btn,
  &.ant-btn-primary {
    background: black !important;
    border-color: black !important;
    color: white !important;
    height: 40px;
    padding: 0 24px;
  }
  
  &:hover,
  &:hover:not(:disabled),
  &.ant-btn:hover,
  &.ant-btn-primary:hover,
  &.ant-btn:hover:not(:disabled),
  &.ant-btn-primary:hover:not(:disabled) {
    background: black !important;
    border-color: black !important;
    color: white !important;
  }
`
export const StyledVerifyBox = styled((props: BoxProps) => <Box {...props} />)`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: medium;
`
export const StyledResendLink = styled((props: TextProps) => <Text {...props} />)`
  cursor: pointer;
  color: #1890ff;
  text-decoration: underline;
`
export const StyledButton = styled((props: ButtonProps) => <Button {...props} />)`
  width: 100%;
`

export const StyledNavigationBox = styled((props: BoxProps) => <Box {...props} />)`
  text-align: center;
`
export const StyledLink = styled((props: LinkProps) => <Link {...props} />)`
  font-size: 16px;
  font-weight: medium;
`
export const OptionCard = styled(({ $selected, ...rest }: BoxProps & { $selected: boolean }) => <Box {...rest} />)`
  border: 1px solid ${({ $selected }) => ($selected ? '#000' : '#e5e5e5')};
  padding: 16px;
  border-radius: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    border-color: #000;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
  }

  .subtitle {
    font-size: 13px;
    color: #777;
    margin-top: 4px;
  }
`
