import { FormItem } from '@app/components'
import { FormItemProps } from '@app/types'
import styled from 'styled-components'

export const StyledFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 8px !important;
`
