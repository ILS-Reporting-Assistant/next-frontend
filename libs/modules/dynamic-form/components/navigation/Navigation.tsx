import { Link, Text } from '@app/components'

import { DynamicInputProps } from '../../types'
import {
  StyledForgotPasswordFormItem,
  StyledFormItem,
  StyledLinkWrapper,
  StyledSignUpLinkFormItem,
} from './elements'

export const DFNavigation: React.FC<DynamicInputProps> = ({ field }) => {
  const hasPrefix = Boolean(field.title && field.linkText)
  const linkLabel = field.linkText || field.title
  const isForgotPassword = field.name === 'forgotYourPassword'
  const isSignUpLink = field.name === 'signUpLink'
  
  let FormItemComponent = StyledFormItem
  if (isForgotPassword) {
    FormItemComponent = StyledForgotPasswordFormItem
  } else if (isSignUpLink) {
    FormItemComponent = StyledSignUpLinkFormItem
  }
  
  return (
    <FormItemComponent>
      <StyledLinkWrapper>
        {hasPrefix && <Text>{field.title}</Text>}
        <Link href={field.href}>{linkLabel}</Link>
      </StyledLinkWrapper>
    </FormItemComponent>
  )
}
