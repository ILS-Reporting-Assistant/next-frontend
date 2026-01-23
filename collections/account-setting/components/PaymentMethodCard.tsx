import { Box, Icon } from '@app/components'
import type { MenuProps, PaymentMethodCardProps } from '@app/types'
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
import {
  AmexCardImage,
  DiscoverCardImage,
  DinersClubCardImage,
  JCBCardImage,
  MaestroCardImage,
  MasterCardImage,
  UnionPayCardImage,
  VisaCardImage,
  DefaultCardImage,
} from '~public'
import { ECardBrand } from '@app/enums'

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

      <StyledCardNumber>**** **** **** {cardNumber}</StyledCardNumber>
      <StyledCardExpiryWrapper>
        <StyledCardExpiry>Expiry Date: {expiryDate}</StyledCardExpiry>
        <StyledCardLogo>
          {(() => {
            switch (cardBrand) {
              case ECardBrand.VISA:
                return <VisaCardImage />
              case ECardBrand.MASTERCARD:
                return <MasterCardImage />
              case ECardBrand.AMERICAN_EXPRESS:
                return <AmexCardImage />
              case ECardBrand.DISCOVER:
                return <DiscoverCardImage />
              case ECardBrand.JCB:
                return <JCBCardImage />
              case ECardBrand.DINERS_CLUB:
                return <DinersClubCardImage />
              case ECardBrand.UNION_PAY:
                return <UnionPayCardImage />
              case ECardBrand.MAESTRO:
                return <MaestroCardImage />
              default:
                return <DefaultCardImage />
            }
          })()}
        </StyledCardLogo>
      </StyledCardExpiryWrapper>
      <Box>
        <StyledRemoveCardLink onClick={onRemove}>Remove card</StyledRemoveCardLink>
      </Box>
    </StyledPaymentCard>
  )
}
