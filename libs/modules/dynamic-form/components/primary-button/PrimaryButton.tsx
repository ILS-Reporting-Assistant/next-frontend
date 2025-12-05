import { DynamicInputProps } from '../../types'
import { StyledButton, StyledFormItem } from './elements'

export const DFPrimaryButton: React.FC<DynamicInputProps> = ({ field, onSubmit, isLoading }) => {
  return (
    <StyledFormItem>
      <StyledButton htmlType="submit" block type="primary" onClick={() => onSubmit(field.name)} loading={isLoading}>
        {field.title}
      </StyledButton>
    </StyledFormItem>
  )
}
