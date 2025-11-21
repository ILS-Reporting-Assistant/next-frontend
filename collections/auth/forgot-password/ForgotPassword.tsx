import { Col, Spacer, useForm } from '@app/components'
import { FORGOT_PASSWORD_FORM } from '@app/forms'
import { DynamicForm } from '@app/modules'
import { CompanyLogo } from '~public'
import { StyledContainer, StyledFieldsCol, StyledLoginBox, StyledRightCol, StyledRow, StyledTitle } from './elements'

export const ForgotPassword: React.FC = () => {
  const [form] = useForm()
  const handleFormSubmit = async () => {
    try {
    } catch (error) {
      // Handle error
    }
  }
  return (
    <StyledContainer gutter={[0, 0]}>
      <Col span={12} xs={24} sm={24} md={24} lg={12}>
        <StyledFieldsCol>
          <Spacer value={35} />
          <CompanyLogo height={100} />
          <Spacer value={50} />
          <StyledLoginBox>
            <StyledRow>
              <StyledTitle level={3}>Reset Your Password</StyledTitle>
            </StyledRow>
            <Spacer value={35} />

            <DynamicForm fields={FORGOT_PASSWORD_FORM} form={form} onSubmit={handleFormSubmit} />
          </StyledLoginBox>
        </StyledFieldsCol>
      </Col>
      <StyledRightCol span={12} xs={0} sm={0} md={0} lg={12} />
    </StyledContainer>
  )
}
