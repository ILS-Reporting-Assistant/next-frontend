import { Box, Text } from '@app/components'
import { BoxProps, TextProps } from '@app/types'
import styled from 'styled-components'

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

