import { InputPassword } from '@app/components'

import { DynamicInputProps } from '../../types'
import { StyledFormItem } from './elements'

export const DFPasswordInput: React.FC<DynamicInputProps> = ({ field }) => {
  return (
    <StyledFormItem label={field.label} name={field.name} rules={field.rules}>
      <InputPassword name={field.name} placeholder={field.placeholder} />
    </StyledFormItem>
  )
}
