import React, { useState, useEffect, Fragment } from 'react'
import { Button, Modal, Spacer, Notification, Spin, EmptyIllustration } from '@app/components'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { ECardBrand } from '@app/enums'
import { PaymentMethod } from '@app/types'
import { StyledPaymentMethodsContainer, StyledAddPaymentButton } from './elements'
import { subscriptionsService } from '@app/services'
import { StyledSectionTitle, StyledTabContent } from '../shared'
import { StyledCenteredLoader } from '../components/elements'
import { AddPaymentMethodModal, PaymentMethodCard } from '../components'
import { EditPaymentMethodModal } from '../components/EditPaymentMethodModal'
import { PaymentImage } from '../../../public/icons/images'

export const PaymentMethodsTab: React.FC = () => {
  const { user } = useSelector((state: IStore) => state)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [cardToEdit, setCardToEdit] = useState<PaymentMethod | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [cardToDelete, setCardToDelete] = useState<PaymentMethod | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const organizationId = user.currentOrganizationId || undefined

  const fetchPaymentMethods = async () => {
    setIsLoading(true)
    try {
      const response = await subscriptionsService.getPaymentMethods(organizationId)
      const methods = Array.isArray(response?.data) ? response.data : []
      setPaymentMethods(methods)
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to fetch payment methods',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPaymentMethods()
  }, [])

  const handleRemoveClick = (paymentMethod: PaymentMethod) => {
    setCardToDelete(paymentMethod)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmRemove = async () => {
    if (!cardToDelete) return

    setIsRemoving(true)
    try {
      await subscriptionsService.removePaymentMethod(cardToDelete.id, organizationId)
      Notification({
        message: 'Success',
        description: 'Payment method removed',
        type: 'success',
      })
      setIsDeleteModalOpen(false)
      setCardToDelete(null)
      fetchPaymentMethods()
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to remove payment method',
        type: 'error',
      })
    } finally {
      setIsRemoving(false)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false)
    setCardToDelete(null)
  }

  const handleAddPaymentMethod = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSuccess = () => {
    setIsModalOpen(false)
    fetchPaymentMethods()
  }
  const handleEditClick = (paymentMethod: PaymentMethod) => {
    setCardToEdit(paymentMethod)
    setIsEditModalOpen(true)
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false)
    setCardToEdit(null)
  }

  const handleEditModalSuccess = () => {
    setIsEditModalOpen(false)
    setCardToEdit(null)
    fetchPaymentMethods()
  }

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      await subscriptionsService.setDefaultPaymentMethod(paymentMethodId, organizationId)
      Notification({
        message: 'Success',
        description: 'Default payment method updated',
        type: 'success',
      })
      fetchPaymentMethods()
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to set default payment method',
        type: 'error',
      })
    }
  }

  return (
    <StyledTabContent>
      <StyledSectionTitle>Payment Methods</StyledSectionTitle>
      <Spacer value={24} />
      {isLoading ? (
        <StyledCenteredLoader>
          <Spin size="large" />
        </StyledCenteredLoader>
      ) : (
        <Fragment>
          {paymentMethods.length === 0 ? (
            <EmptyIllustration
              image={<PaymentImage />}
              text="No payment methods found"
              buttonText="Add Payment Method"
              onClick={handleAddPaymentMethod}
            />
          ) : (
            <Fragment>
              <StyledPaymentMethodsContainer>
                {paymentMethods.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    cardholderName={method.name}
                    cardNumber={method.last4Digit}
                    expiryDate={method.expDate}
                    cardBrand={method.cardBrand as ECardBrand}
                    isDefault={method.isDefault}
                    onEdit={() => handleEditClick(method)}
                    onSetAsDefault={() => handleSetDefault(method.id)}
                    onRemove={() => handleRemoveClick(method)}
                  />
                ))}
              </StyledPaymentMethodsContainer>
            </Fragment>
          )}
        </Fragment>
      )}
      {paymentMethods.length > 0 && (
        <StyledAddPaymentButton type="primary" onClick={handleAddPaymentMethod}>
          + Add more
        </StyledAddPaymentButton>
      )}

      <AddPaymentMethodModal
        open={isModalOpen}
        onCancel={handleModalClose}
        onSuccess={handleModalSuccess}
        organizationId={organizationId}
      />

      <EditPaymentMethodModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSuccess={handleEditModalSuccess}
        paymentMethod={cardToEdit}
        organizationId={organizationId}
      />

      <Modal
        title="Remove Payment Method"
        open={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            Cancel
          </Button>,
          <Button key="confirm" type="primary" danger loading={isRemoving} onClick={handleConfirmRemove}>
            Remove
          </Button>,
        ]}
      >
        <p>Are you sure you want to remove this payment method? This action cannot be undone.</p>
      </Modal>
    </StyledTabContent>
  )
}
