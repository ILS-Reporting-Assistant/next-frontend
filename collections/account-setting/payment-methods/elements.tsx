import { Box, Button } from '@app/components'
import { maxMobile, maxTablet } from '@app/styles'
import { BoxProps, ButtonProps } from '@app/types'
import styled from 'styled-components'

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
  font-size: 14px;
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

