import { FormItem } from '@app/components'

import { DynamicInputProps } from '../../types'
import { StyledButton } from './elements'

export const DFPrimaryButton: React.FC<DynamicInputProps> = ({ field, onSubmit, isLoading }) => {
  return (
    <FormItem>
      <StyledButton htmlType="submit" block type="primary" onClick={() => onSubmit(field.name)} loading={isLoading}>
        {field.title}
      </StyledButton>
    </FormItem>
  )
}
