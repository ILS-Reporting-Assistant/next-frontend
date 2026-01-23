import { InputNumber, Button } from '@app/components'
import {
  StyledRemoveAddonListItem,
  StyledRemoveAddonInfo,
  StyledAddonName,
  StyledAddonDescription,
  StyledAddonQuantityWrapper,
  StyledAddonQuantityInput,
} from './elements'

export const ReduceAddonView = ({
  addon,
  currentQuantity,
  reduceQuantities,
  handleReduceQuantityChange,
  handleAddonReduce,
  reducingAddonId,
  isCancelled,
  isExpired,
}: any) => {
  const isReducing = reducingAddonId === addon._id

  return (
    <StyledRemoveAddonListItem>
      <StyledRemoveAddonInfo>
        <StyledAddonName>{addon.name}</StyledAddonName>
        {addon.description && <StyledAddonDescription>{addon.description}</StyledAddonDescription>}
        <StyledAddonDescription style={{ marginTop: '8px', color: '#000000', fontWeight: 800 }}>
          Currently added: {currentQuantity}
        </StyledAddonDescription>
      </StyledRemoveAddonInfo>
      <StyledAddonQuantityWrapper style={{ marginTop: '16px' }}>
        <StyledAddonQuantityInput>
          <InputNumber
            min={1}
            max={currentQuantity}
            value={reduceQuantities?.[addon._id] || null}
            onChange={(value) => handleReduceQuantityChange(addon._id, value)}
            placeholder="Reduce Qty"
            disabled={isCancelled || isExpired || isReducing}
          />
        </StyledAddonQuantityInput>
        <Button
          type="default"
          danger
          onClick={() => handleAddonReduce(addon)}
          disabled={
            isCancelled ||
            isExpired ||
            isReducing ||
            !reduceQuantities?.[addon._id] ||
            (reduceQuantities?.[addon._id] !== null &&
              reduceQuantities?.[addon._id] !== undefined &&
              reduceQuantities[addon._id] < 1) ||
            reduceQuantities?.[addon._id] > currentQuantity
          }
          loading={isReducing}
        >
          Reduce
        </Button>
      </StyledAddonQuantityWrapper>
    </StyledRemoveAddonListItem>
  )
}
