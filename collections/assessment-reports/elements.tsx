import { FlexContainer, Input } from '@app/components'
import { FlexContainerProps, InputProps, StyledAvatarProps } from '@app/types'
import { Avatar } from 'antd'
import styled from 'styled-components'

export const StyledFlexContainer = styled((props: FlexContainerProps) => <FlexContainer {...props} />)`
  justify-content: space-between;
  text-align: center;
  align-items: end;
`

export const StyledSearch = styled((props: InputProps) => <Input {...props} />)`
  max-width: 450px;
  height: 40px;
`
export const StyledClientAvatar = styled(Avatar)<StyledAvatarProps>`
  width: 32px;
  height: 32px;
  background-color: ${(props) => props.$backgroundColor || '#000000'} !important;
  color: ${(props) => props.$textColor || '#ffffff'} !important;
  margin-right: 8px;
  font-size: 14px;
`
