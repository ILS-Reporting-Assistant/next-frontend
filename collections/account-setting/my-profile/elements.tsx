import { Box, Button, FormItem, Text } from '@app/components'
import { maxMobile } from '@app/styles'
import { BoxProps, ButtonProps, FormItemProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const StyledPageHeader = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;

  @media only screen and (max-width: ${maxMobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

export const StyledButtonGroup = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  gap: 10px;
  justify-content: flex-end;

  @media only screen and (max-width: ${maxMobile}) {
    width: 100%;
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`

export const StyledProfileSection = styled((props: BoxProps) => <Box {...props} />)`
  padding: 0;
  border: none;
  background: transparent;
`

export const StyledFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 20px;

  .ant-form-item-label {
    padding-bottom: 0px !important;

    label {
      font-weight: 500;
      font-size: 14px;
    }
  }

  .ant-input {
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

    &:disabled {
      background-color: ${(props) => props.theme.color.grey2 || '#f5f5f5'};
      cursor: not-allowed;
    }
  }
`

export const StyledCancelButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white !important;
  border-color: black !important;
  color: black !important;
  border-radius: 2px;
  min-width: 105px;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &:hover,
  &:hover:not(:disabled) {
    background: #f5f5f5 !important;
    border-color: black !important;
    color: black !important;
  }
`

export const StyledSaveButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border: 1px solid black !important;
  color: white !important;
  border-radius: 2px;
  min-width: 148px;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;

  &:hover,
  &:hover:not(:disabled) {
    background: black !important;
    border-color: black !important;
    color: white !important;
    opacity: 0.9;
  }
`

export const StyledAccountDeletionSection = styled((props: BoxProps) => <Box {...props} />)`
  padding: 0;
  border: none;
  background: transparent;
`

export const StyledDeleteAccountTitle = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`

export const StyledDeleteAccountDescription = styled((props: TextProps) => <Text {...props} />)`
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  color: #7e7e7e;
`

export const StyledDeleteAccountContent = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${maxMobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`

export const StyledDeleteButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: #ef4444 !important;
  border-color: #ef4444 !important;
  color: white !important;
  border-radius: 2px;
  height: 40px;
  font-size: 16px;
  width: 171px;

  &:hover,
  &:hover:not(:disabled) {
    background: #ff7875 !important;
    border-color: #ff7875 !important;
    color: white !important;
  }
`

