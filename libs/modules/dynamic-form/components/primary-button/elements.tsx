import { Button, FormItem } from '@app/components'
import { ButtonProps, FormItemProps } from '@app/types'
import styled from 'styled-components'

export const StyledButton = styled((props: ButtonProps) => <Button {...props} type={props.type} />)`
  padding: 13px 56px;
  line-height: 0px;
  border-radius: 4px !important;
  
  &.ant-btn {
    border-radius: 4px !important;
  }
`

export const StyledFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 8px !important;
  margin-top: 0 !important;
`
