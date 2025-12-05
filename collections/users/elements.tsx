import { FlexContainer, Input, Select, Tag } from '@app/components'
import { FlexContainerProps, InputProps, SelectProps, TagProps } from '@app/types'
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
export const StyledFilter = styled((props: SelectProps<any>) => <Select {...props} />)`
  margin-left: 8px;
  height: 40px;
`
export const StyledTag = styled((props: TagProps) => <Tag {...props} />)`
  border-radius: 6;
  padding: 6px 12px;
  border: none;
  font-size: 14;
`
