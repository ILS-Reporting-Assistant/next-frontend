import { Icon } from '@app/components'
import type { MenuProps, PaymentMethodCardProps } from '@app/types'
import { ECardBrand } from '@app/enums'
import { MasterCardImage, VisaCardImage } from '~public'
import React from 'react'
import {
  StyledCardExpiry,
  StyledCardExpiryWrapper,
  StyledCardholderName,
  StyledCardLogo,
  StyledCardMenuButton,
  StyledCardMenuWrapper,
  StyledCardNumber,
  StyledDefaultTag,
  StyledPaymentCard,
  StyledPaymentCardHeader,
  StyledRemoveCardLink,
  StyledCardDropdown,
} from './elements'

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  cardholderName,
  cardNumber,
  expiryDate,
  cardBrand,
  isDefault = false,
  onEdit,
  onSetAsDefault,
  onRemove,
}) => {
  const menuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: onEdit,
    },
    {
      key: 'setDefault',
      label: 'Set as Default',
      onClick: onSetAsDefault,
      disabled: isDefault,
    },
  ]

  return (
    <StyledPaymentCard>
      <StyledPaymentCardHeader>
        <StyledCardholderName>{cardholderName}</StyledCardholderName>
        <StyledCardMenuWrapper>
          {isDefault && <StyledDefaultTag>Default</StyledDefaultTag>}
          <StyledCardDropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <StyledCardMenuButton>
              <Icon.MoreOutlined />
            </StyledCardMenuButton>
          </StyledCardDropdown>
        </StyledCardMenuWrapper>
      </StyledPaymentCardHeader>

      <StyledCardNumber>{cardNumber}</StyledCardNumber>
      <StyledCardExpiryWrapper>
        <StyledCardExpiry>Expiry Date: {expiryDate}</StyledCardExpiry>
        <StyledCardLogo>{cardBrand === ECardBrand.VISA ? <VisaCardImage /> : <MasterCardImage />}</StyledCardLogo>
      </StyledCardExpiryWrapper>
      <StyledRemoveCardLink onClick={onRemove}>Remove card</StyledRemoveCardLink>
    </StyledPaymentCard>
  )
}
