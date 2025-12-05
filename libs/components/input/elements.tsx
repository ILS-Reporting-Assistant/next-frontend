import { boxProperties } from '@app/styles'
import { InputNumberProps, InputPasswordProps, InputProps } from '@app/types'
import { Input, InputNumber } from 'antd'
import styled from 'styled-components'

export const StyledInputNumber = styled((props: InputNumberProps) => <InputNumber {...props} />)`
  ${boxProperties}
  &&.ant-input {
    height: 40px !important;
  }
`
export const StyledInput = styled((props: InputProps) => <Input {...props} />)`
  ${boxProperties}
  &&.ant-input {
    height: 40px !important;
  }
`
export const StyledInputPassword = styled((props: InputPasswordProps) => <Input.Password {...props} />)`
  ${boxProperties}
  &&.ant-input-affix-wrapper {
    height: 40px !important;
  }
`
