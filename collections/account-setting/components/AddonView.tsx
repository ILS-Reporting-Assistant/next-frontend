import { InputNumber, Tooltip } from '@app/components'
import {
  StyledAddonButton,
  StyledAddonInfo,
  StyledAddonListItem,
  StyledAddonName,
  StyledAddonDescription,
  StyledAddonFeatures,
  StyledAddonFeatureIcon,
  StyledAddonHeader,
  StyledAddonActions,
  StyledAddonPrice,
  StyledAddonPriceAmount,
  StyledAddonPriceSubText,
  StyledAddonQuantityInput,
  StyledAddonQuantityWrapper,
} from './elements'

export const AddonView = ({
  addon,
  features,
  addonQuantities,
  handleQuantityChange,
  handleAddonPurchase,
  buttonProps,
  isCancelled,
  isExpired,
  isAddonLocked,
  addonDisabledTooltip,
  formatPrice,
  formatPriceSubText,
}: any) => {
  const isDisabled = buttonProps.disabled || isCancelled || isExpired || isAddonLocked
  const addonButton = (
    <StyledAddonButton
      type={buttonProps.buttonType}
      onClick={() => handleAddonPurchase(addon)}
      disabled={
        isDisabled ||
        !addonQuantities[addon._id] ||
        (addonQuantities[addon._id] !== null &&
          addonQuantities[addon._id] !== undefined &&
          addonQuantities[addon._id] < 1)
      }
      loading={buttonProps.loading}
    >
      {buttonProps.buttonText}
    </StyledAddonButton>
  )

  return (
    <StyledAddonListItem key={addon._id}>
      <StyledAddonHeader>
        <StyledAddonInfo>
          <StyledAddonName>{addon.name}</StyledAddonName>
          <StyledAddonPrice>
            <StyledAddonPriceAmount>
              {formatPrice(addon.amount)}
              <StyledAddonPriceSubText>{formatPriceSubText(addon.period, addon.currency)}</StyledAddonPriceSubText>
            </StyledAddonPriceAmount>
          </StyledAddonPrice>
        </StyledAddonInfo>
        <StyledAddonActions>
          <StyledAddonQuantityWrapper>
            <StyledAddonQuantityInput>
              <InputNumber
                min={1}
                max={999}
                value={addonQuantities[addon._id] || null}
                onChange={(value) => handleQuantityChange(addon._id, value)}
                placeholder="Qty"
                disabled={isDisabled}
              />
            </StyledAddonQuantityInput>
            {addonDisabledTooltip ? (
              <Tooltip title={addonDisabledTooltip}>
                <span style={{ display: 'inline-flex' }}>{addonButton}</span>
              </Tooltip>
            ) : (
              addonButton
            )}
          </StyledAddonQuantityWrapper>
        </StyledAddonActions>
      </StyledAddonHeader>
      {addon.description && <StyledAddonDescription>{addon.description}</StyledAddonDescription>}
      {features.length > 0 && (
        <StyledAddonFeatures>
          {features.map((feature, index) => (
            <span key={index}>
              <StyledAddonFeatureIcon />
              {feature.text}
            </span>
          ))}
        </StyledAddonFeatures>
      )}
    </StyledAddonListItem>
  )
}
