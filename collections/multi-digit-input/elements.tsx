import { FlexContainer, Input } from '@app/components'
import { FlexContainerProps, InputProps } from '@app/types'
import styled from 'styled-components'

export const StyledInput = styled((props: InputProps) => <Input {...props} />)`
  border-radius: 3px;
  height: 50px;
  text-align: center;
  width: 50px;
`

export const StyledFlexContainer = styled((props: FlexContainerProps) => <FlexContainer {...props} />)`
  justify-content: center;
  gap: 8px;
`
