import { FlexContainer, Input, Tag } from '@app/components'
import { FlexContainerProps, InputProps, TagProps, StyledAvatarProps } from '@app/types'
import { Avatar as AntAvatar, Form } from 'antd'
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

