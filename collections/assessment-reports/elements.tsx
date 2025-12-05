import { FlexContainer, Input } from '@app/components'
import { FlexContainerProps, InputProps } from '@app/types'
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

