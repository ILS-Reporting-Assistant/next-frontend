import { FlexContainer, Input, Tag, Text, Box, Card } from '@app/components'
import { FlexContainerProps, InputProps, TagProps, StyledAvatarProps, CardProps, BoxProps, TextProps } from '@app/types'
import { Avatar as AntAvatar, Badge, Form } from 'antd'
import styled from 'styled-components'

export const StyledFlexContainer = styled((props: FlexContainerProps) => <FlexContainer {...props} />)`
  justify-content: space-between;
  text-align: center;
  align-items: end;
`

export const StyledSearch = styled((props: InputProps) => <Input {...props} />)`
  max-width: 450px;
  height: 40px;
`

export const StyledTag = styled((props: TagProps) => <Tag {...props} />)`
  border-radius: 6;
  padding: 6px 12px;
  border: none;
  font-size: 14;
`

export const StyledFormInput = styled((props: InputProps) => <Input {...props} />)`
  &&.ant-input {
    height: 40px !important;
  }
  height: 40px !important;
`

export const StyledFormSelect = styled((props: any) => <Input {...props} />)`
  &&.ant-input {
    height: 40px !important;
  }
  height: 40px !important;
`

export const StyledDatePicker = styled((props: any) => <Input {...props} />)`
  &&.ant-input {
    height: 40px !important;
  }
  height: 40px !important;
`

export const StyledClientAvatar = styled(AntAvatar)<StyledAvatarProps>`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.$backgroundColor || '#000000'} !important;
  color: ${(props) => props.$textColor || '#ffffff'} !important;
  margin-right: 8px;
  font-size: 14px;
`

export const StyledFooterContainer = styled((props: FlexContainerProps) => <FlexContainer {...props} />)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 0 !important;
  margin-left: -24px !important;
`

export const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 12px !important;
  }

  .ant-form-item-label {
    padding-bottom: 0px !important;
    margin-bottom: 0 !important;
  }

  .ant-form-item-explain-error {
    font-size: 11px !important;
    line-height: 1.4 !important;
  }
`

export const StyledViewContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const StyledFieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const StyledLabel = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
`

export const StyledValue = styled(Text)`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
`
export const StyledCard = styled((props: CardProps) => <Card {...props} />)`
  border-radius: 12px;
`

export const Header = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
`

export const Footer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  margin-top: 12px;
  gap: 8px;
`

export const Title = styled((props: TextProps) => <Text {...props} />)`
  margin: 0;
  padding-right: 8px;
  font-size: 14px;
  font-weight: 600;
`

export const DateText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 12px;
  color: #8c8c8c;
`

export const UserName = styled((props: TextProps) => <Text {...props} />)`
  font-size: 14px;
  font-weight: 300;
`

export const StyledLoadingContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

export const StyledEmptyStateContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

export const StyledReportTypeText = styled((props: TextProps) => <Text {...props} />)`
  text-transform: capitalize;
`

export const StyledTimelineMetaText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 12px;
`

export const StyledPaginationContainer = styled(Box)`
  display: flex;
  justify-content: center;
`

export const StyledBadgeRibbon = styled(Badge.Ribbon)`
  text-transform: capitalize;
`
