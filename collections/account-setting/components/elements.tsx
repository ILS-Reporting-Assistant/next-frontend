import { Box, Button, Dropdown, FormItem, List, ListItem, Modal, Tag, Text } from '@app/components'
import { maxMobile, maxTablet } from '@app/styles'
import { BoxProps, ButtonProps, DropdownProps, FormItemProps, ListItemProps, ListProps, ModalProps, TagProps, TextProps } from '@app/types'
import styled from 'styled-components'

export const StyledPlansContainer = styled((props: BoxProps) => <Box {...props} />)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 32px;

  @media only screen and (max-width: ${maxTablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: ${maxMobile}) {
    grid-template-columns: 1fr;
  }
`

export const StyledPlanCard = styled((props: BoxProps) => <Box {...props} />)`
  border: 1px solid #dddddd;
  border-radius: 10px;
  padding: 24px;
  background: white;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0px 1px 2px -1px #0000001a;

  @media only screen and (max-width: ${maxMobile}) {
    padding: 20px;
  }
`

export const StyledPopularTag = styled((props: BoxProps) => <Box {...props} />)`
  position: absolute;
  top: 26px;
  right: 16px;
  background: #eaeaea;
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  height: 22px;
  padding: 0px 8px;
  border-radius: 2px;
  border: 1px solid #000000;
`

export const StyledPlanTitle = styled((props: TextProps) => <Text {...props} />)`
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  color: #000;
  margin-bottom: 18px;
`

export const StyledPlanPrice = styled((props: TextProps) => <Text {...props} />)`
  font-size: 40px;
  font-weight: 500;
  line-height: 150%;
  color: #000000;
  margin-bottom: 9px;
`

export const StyledPlanPriceSubText = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: #000000;
  margin-left: 12px;
`

export const StyledPlanDescription = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  margin-bottom: 24px;
`

export const StyledPlanButton = styled((props: ButtonProps) => <Button {...props} />)`
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 2px;
  margin-bottom: 34px;

  &.ant-btn-primary {
    background: #232323 !important;
    border-color: #232323 !important;
    color: white !important;
  }

  &.ant-btn-default {
    border-color: #dddddd !important;
    color: #7e7e7e !important;
    cursor: default !important;

  }
`

export const StyledPlanFeatures = styled((props: ListProps<any>) => <List {...props} />)`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  
  // &.ant-list {
  //   border: none;
  //   background: transparent;
  // }
  
  // .ant-list-items {
  //   display: flex;
  //   flex-direction: column;
  //   flex: 1;
  // }
`

export const StyledPlanFeature = styled((props: ListItemProps) => <ListItem {...props} />)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  font-weight: 500;
  border: none;
  padding: 0;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    margin-right: 12px;
    margin-top: 2px;
    flex-shrink: 0;
    color: #232323;
    font-size: 16px;
  }
  
  &.ant-list-item {
    border: none;
    padding: 0;
    justify-content: flex-start;
  }
`

export const StyledPaymentCard = styled((props: BoxProps) => <Box {...props} />)`
  border: 1px solid #dddddd;
  border-radius: 4px;
  padding: 16px;
  padding-right: 6px;
  background: #ffffff;
  position: relative;
  box-shadow: 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: ${maxMobile}) {
    padding: 20px;
  }
`

export const StyledPaymentCardHeader = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-bottom: 15px;
`

export const StyledCardMenuWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const StyledCardExpiryWrapper = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`

export const StyledDefaultTag = styled((props: TagProps) => <Tag {...props} />)`
  background: #eaeaea !important;
  color: #000000 !important;
  font-size: 14px;
  font-weight: 500;
  height: 22px;
  padding: 0px 8px;
  border-radius: 2px;
  border: 1px solid #000000 !important;
  display: inline-flex;
  align-items: center;
  
  &.ant-tag {
    margin: 0;
    line-height: 22px;
  }
`

export const StyledCardMenuButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  color: #7e7e7e !important;
  transition: color 0.2s ease;
  width: 24px;
  height: 24px;
  min-width: 24px;
  box-shadow: none !important;

  &:hover {
    color: #000000 !important;
    background: transparent !important;
    border: none !important;
  }

  svg {
    font-size: 20px;
  }
  
  &.ant-btn {
    padding: 0 !important;
  }
`

export const StyledCardDropdown = styled((props: DropdownProps) => <Dropdown {...props} />)`
  && .ant-dropdown-menu {
    border-radius: 4px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    padding: 4px 0;
    min-width: 160px;
  }

   && .ant-dropdown-menu-item{
    padding: 2px 12px !important;
    font-size: 14px !important;
    line-height: 20px;
    color: #000000;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f5f5f5;
    }

    &.ant-dropdown-menu-item-disabled {
      color: #bfbfbf;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    }
  }

  && .ant-dropdown-menu-item-selected {
    background-color: transparent;
    color: #000000;
  }
`

export const StyledCardholderName = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #000000;
`

export const StyledCardNumber = styled((props: TextProps) => <Text {...props} />)`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`

export const StyledCardExpiry = styled((props: TextProps) => <Text {...props} />)`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #7e7e7e;
`

export const StyledCardLogo = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;

  img {
    height: 100%;
    object-fit: contain;
  }
`

export const StyledRemoveCardLink = styled((props: ButtonProps) => <Button {...props} type="link" />)`
  background: transparent !important;
  border: none !important;
  text-decoration: underline !important;
  color: #ef4444 !important;
  font-size: 14px;
  font-weight: 500;
  padding: 0 !important;
  text-align: left;
  transition: color 0.2s ease;
  height: auto;
  box-shadow: none !important;

  &:hover {
    color: #dc2626 !important;
    background: transparent !important;
    border: none !important;
  }
  
  &.ant-btn-link {
    padding: 0 !important;
    height: auto;
  }
`

export const StyledModalContent = styled((props: ModalProps) => <Modal {...props} />)`
  .ant-modal-content {
    background-color: #F8F8F8;
    border-radius: 8px;
    padding: 26px 24px 32px 24px;
    border: 1px solid #DDDDDD;
  }

  .ant-modal-header {
    background: transparent;
    border-bottom: none;
    padding-bottom: 14px;
    margin: 0;
  }

  .ant-modal-title {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
  }

  .ant-modal-close {
    top: 13px;
    right: 14px;
  }

  .ant-modal-body {
    padding: 0;
  }
`

export const StyledModalFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 28px;

  .ant-form-item-label {
    padding-bottom: 2px !important;

    label {
      font-weight: 500;
      font-size: 14px;
      color: #000000;
    }
  }

  .ant-input {
    border-radius: 2px;
    border: 1px solid #DDDDDD;
    height: 40px;
    font-size: 14px;

    &:hover {
      border-color: #232323;
    }

    &:focus,
    &.ant-input-focused {
      border-color: #232323;
      box-shadow: 0 0 0 2px rgba(35, 35, 35, 0.1);
    }
  }
`

export const StyledModalFooter = styled((props: BoxProps) => <Box {...props} />)`
  margin-top: 0;
`

export const StyledModalButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: #232323 !important;
  border-color: #232323 !important;
  color: white !important;
  border-radius: 2px;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;
  width: 100%;

  &:hover,
  &:hover:not(:disabled) {
    background: #232323 !important;
    border-color: #232323 !important;
    color: white !important;
    opacity: 0.9;
  }
`

