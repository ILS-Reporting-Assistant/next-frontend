import { FormItem, Input } from '@app/components'
import { FormItemProps } from '@app/types'
import styled from 'styled-components'

import { DynamicInputProps } from '../../types'

const StyledFormItem = styled((props: FormItemProps) => <FormItem {...props} />)`
  margin-bottom: 16px !important;
`

export const DFEmailInput: React.FC<DynamicInputProps> = ({ field, disabled }) => {
  return (
    <StyledFormItem label={field.label} name={field.name} rules={field.rules}>
      <Input name={field.name} placeholder={field.placeholder} type={'email'} disabled={field?.disabled || disabled} />
    </StyledFormItem>
  )
}
