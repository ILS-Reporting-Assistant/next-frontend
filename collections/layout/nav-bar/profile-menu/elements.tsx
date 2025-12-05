import { Badge, Box, Button, Text } from '@app/components'
import { BadgeProps, BoxProps, ButtonProps, TextProps } from '@app/types'
import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled((props: ButtonProps) => <Button {...props} type={props.type} />)`
  padding: 0px;
  border: none;
  outline: none;
  box-shadow: none;
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
  color: #fff;
`
export const StyledBadge = styled((props: BadgeProps) => <Badge {...props} />)`
  .ant-badge-count {
    box-shadow: ${(props) => `0 0 0 1px ${props.theme.color.error}`};
  }
`

export const StyledModalCancelButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: white !important;
  border: 1px solid black !important;
  color: black !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  font-size: 14px;
  
  &.ant-btn,
  &.ant-btn-default {
    background: white !important;
    border-color: black !important;
    color: black !important;
    height: 40px;
    padding: 0 24px;
    font-size: 14px;
  }
  
  &:hover,
  &:hover:not(:disabled),
  &.ant-btn:hover,
  &.ant-btn:hover:not(:disabled) {
    background: black !important;
    border-color: black !important;
    color: white !important;
  }
`

export const StyledModalConfirmButton = styled((props: ButtonProps) => <Button {...props} />)`
  background: black !important;
  border-color: black !important;
  color: white !important;
  border-radius: 4px !important;
  height: 40px;
  padding: 0 24px;
  
  &.ant-btn,
  &.ant-btn-primary {
    background: black !important;
    border-color: black !important;
    color: white !important;
    height: 40px;
    padding: 0 24px;
  }
  
  &:hover,
  &:hover:not(:disabled),
  &.ant-btn:hover,
  &.ant-btn-primary:hover,
  &.ant-btn:hover:not(:disabled),
  &.ant-btn-primary:hover:not(:disabled) {
    background: white !important;
    border-color: black !important;
    color: black !important;
  }
`

export const StyledModalFooter = styled((props: BoxProps) => <Box {...props} />)`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`
