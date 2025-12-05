import { Box } from '@app/components'
import { BoxProps } from '@app/types'
import styled from 'styled-components'

export const StyledFormItem = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 8px !important;
  margin-top: 16px !important;
  padding: 0 !important;
  
  .ant-form-item-control {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .ant-form-item-control-input {
    min-height: auto !important;
  }
  
  .ant-form-item-control-input-content {
    margin: 0 !important;
    padding: 0 !important;
  }
`

export const StyledForgotPasswordFormItem = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 26px !important;
  font-size: 14px !important;
  margin-top: 0 !important;
  padding: 0 !important;
  
  .ant-form-item-control {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .ant-form-item-control-input {
    min-height: auto !important;
  }
  
  .ant-form-item-control-input-content {
    margin: 0 !important;
    padding: 0 !important;
  }
`

export const StyledSignUpLinkFormItem = styled((props: BoxProps) => <Box {...props} />)`
  margin-bottom: 20px !important;
  margin-top: 16px !important;
  padding: 0 !important;
  
  .ant-form-item-control {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .ant-form-item-control-input {
    min-height: auto !important;
  }
  
  .ant-form-item-control-input-content {
    margin: 0 !important;
    padding: 0 !important;
  }
`

export const StyledLinkWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: inline-block;
  margin: 0;
  padding: 0;
`
