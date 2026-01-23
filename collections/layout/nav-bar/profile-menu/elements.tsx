import { Badge, Box, Button, Space, Text } from '@app/components'
import { BadgeProps, BoxProps, ButtonProps, SpaceProps, TextProps } from '@app/types'
import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled((props: ButtonProps) => <Button {...props} type={props.type} />)`
  padding: 0px;
  border: none;
  outline: none;
  box-shadow: none;
  transition: all 0.2s ease;

  &:hover {
    .ant-avatar {
      opacity: 0.8;
      transform: scale(1.05);
      transition: all 0.2s ease;
    }
  }
`
export const StyledText = styled((props: TextProps) => <Text {...props} />)`
  color: #fff;
`
export const StyledBadge = styled((props: BadgeProps) => <Badge {...props} />)`
  background-color: ${(props) => props.color || '#000'};
  color: ${'#fff'};
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
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

export const StyledProfileNameText = styled((props: TextProps) => <Text {...props} />)`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
`

export const StyledProfileHeaderSpace = styled((props: SpaceProps) => <Space {...props} />)`
  width: 100%;
  justify-content: space-between;
  align-content: center;
`

export const StyledProfileTag = styled((props: BoxProps) => <Box {...props} />)`
  background: #eaeaea;
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  height: 22px;
  padding: 0px 8px;
  border-radius: 2px;
  border: 1px solid #000000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
