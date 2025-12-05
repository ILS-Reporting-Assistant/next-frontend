import { Button, FormItem } from '@app/components'
import { ButtonProps, FormItemProps } from '@app/types'
import styled from 'styled-components'

export const StyledFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 20px;

  .ant-form-item-label {
    padding-bottom: 0px !important;

    label {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .ant-input-password {
    border-radius: 2px;
    border: 1px solid ${(props) => props.theme.color.grey2 || '#d9d9d9'};

    &:hover {
      border-color: ${(props) => props.theme.color.primary || '#000000'};
    }

    &:focus,
    &.ant-input-focused {
      border-color: ${(props) => props.theme.color.primary || '#000000'};
      box-shadow: 0 0 0 2px ${(props) => props.theme.color.primary || '#000000'}20;
    }
  }
`

export const StyledUpdatePasswordButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: #232323 !important;
  border-color: #232323 !important;
  color: white !important;
  border-radius: 2px;
  height: 40px;
  font-size: 14px;
  font-weight: 500;
  min-width: 148px;

  &:hover,
  &:hover:not(:disabled) {
    background: #232323 !important;
    border-color: #232323 !important;
    color: white !important;
    opacity: 0.9;
  }
`

