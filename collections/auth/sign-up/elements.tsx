import { Box, Button, Col, Link, Row, Text, Title } from '@app/components'
import { maxComputer, maxMobile, maxTablet } from '@app/styles'
import { BoxProps, ButtonProps, ColProps, LinkProps, RowProps, TextProps } from '@app/types'
import { TitleProps } from 'antd/es/typography/Title'
import styled from 'styled-components'

export const StyledRow = styled((props: RowProps) => <Row {...props} />)`
  align-items: center;
  justify-content: center;
`

export const StyledTitle = styled((props: TitleProps) => <Title {...props} />)`
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
  width: 100%;
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
