import { Box, Button, FormItem, Image, Text } from '@app/components'
import { maxMobile, maxTablet } from '@app/styles'
import { BoxProps, ButtonProps, FormItemProps, ImageProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const StyledTabContent = styled((props: BoxProps) => <Box {...props} />)`
  padding: 0;
`

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

export const StyledSectionTitle = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: 0 !important;
  font-weight: 500;
  font-size: 22px;
  line-height: 100%;
`

export const StyledSectionSubTitle = styled((props: TextProps) => <Text {...props} />)`
  margin-bottom: 0 !important;
  color: #7e7e7e;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
`

export const StyledDivider = styled((props: BoxProps) => <Box {...props} />)`
  width: 100%;
  height: 1px;
  background: #dddddd;
  margin-top: 12px !important;
  margin-bottom: 28px;
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

export const StyledProfilePictureLabel = styled((props: TextProps) => <Text {...props} />)`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 0;
`

export const StyledProfileSection = styled((props: BoxProps) => <Box {...props} />)`
  padding: 0;
  border: none;
  background: transparent;
`

export const StyledProfilePictureWrapper = styled((props: BoxProps) => <Box {...props} />)`
  position: relative;
  display: inline-block;
  cursor: pointer;
`

export const StyledProfilePicture = styled((props: BoxProps) => <Box {...props} />)<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 8px;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.color.grey2 || '#e5e5e5'};
  position: relative;
  font-size: ${(props) => props.size * 0.4}px;
  font-weight: 600;
  color: #666666;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
  }
`

export const StyledProfileImage = styled((props: ImageProps & { size: number }) => <Image {...props} />)`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid ${(props) => props.theme.color.grey2 || '#e5e5e5'};
`

export const StyledEditIcon = styled((props: BoxProps) => <Box {...props} />)`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) => props.theme.color.background || '#ffffff'};
  border: 2px solid ${(props) => props.theme.color.grey2 || '#e5e5e5'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.color.grey2 || '#f5f5f5'};
    border-color: ${(props) => props.theme.color.primary || '#000000'};
  }

  svg {
    font-size: 14px;
    color: ${(props) => props.theme.color.primary || '#000000'};
  }
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

  .ant-input,
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

    &:disabled {
      background-color: ${(props) => props.theme.color.grey2 || '#f5f5f5'};
      cursor: not-allowed;
    }
  }
`

export const StyledEmailFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 20px;
  margin-top: 104px; /* Aligns with Name field (Profile Picture label + 8px + 80px picture + 24px spacer) */

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

export const StyledSectionHeader = styled((props: BoxProps) => <Box {...props} />)`
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

export const StyledCancelButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white !important;
  border-color: black !important;
  color: black !important;
  border-radius: 2px;
  min-width: 105px;
  height: 40px;
  font-size: 16px;

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
  font-size: 16px;

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

export const StyledSubscriptionDescription = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #232323;
  margin-bottom: 0;
`

export const StyledPricingToggleWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  margin-top: 22px;
  margin-bottom: 28px;
`

export const StyledPricingToggle = styled((props: BoxProps) => <Box {...props} />)`
  display: inline-flex;
  border: 1px solid #dddddd;
  border-radius: 2px;
  gap: 0;
  height: 40px;

  .ant-radio-button-wrapper {
    border: none !important;
    background: transparent !important;
    color: #7e7e7e !important;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 24px;
    height: auto;
    line-height: 1.5;
    border-radius: 2px;
    transition: all 0.2s ease;
    margin: 0 !important;
    height: 40px;
    transform: translateY(-1px);

    &:first-child {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    &:last-child {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }

    &.ant-radio-button-wrapper-checked {
      background: white !important;
      color: #232323 !important;
      border: 1px solid #232323 !important;
      box-shadow: none !important;
    }

    &::before {
      display: none;
    }
  }
`

export const StyledPaymentMethodsContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media only screen and (max-width: ${maxTablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: ${maxMobile}) {
    grid-template-columns: 1fr;
  }
`

export const StyledAddPaymentButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: #232323 !important;
  border-color: #232323 !important;
  color: white !important;
  border-radius: 2px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  min-width: 200px;

  &:hover,
  &:hover:not(:disabled) {
    background: #232323 !important;
    border-color: #232323 !important;
    color: white !important;
    opacity: 0.9;
  }

  @media only screen and (max-width: ${maxMobile}) {
    width: 100%;
  }
`

export const StyledPaymentMethodsLoader = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  grid-column: 1 / -1;
`
