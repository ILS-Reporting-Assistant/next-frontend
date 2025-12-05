import React, { useState } from 'react'
import { Button, Modal, Spacer, Text } from '@app/components'
import { ECardBrand } from '@app/enums'
import { PaymentMethod } from '@app/types'
import { StyledPaymentMethodsContainer, StyledAddPaymentButton } from './elements'
import { StyledTabContent, StyledSectionTitle } from '../shared'
import { PaymentMethodCard, AddPaymentMethodModal } from '../components'
import {
  StyledModalCancelButton,
  StyledModalConfirmButton,
  StyledModalFooter,
} from '../../layout/nav-bar/profile-menu/elements'

export const PaymentMethodsTab: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [cardToRemove, setCardToRemove] = useState<string | null>(null)
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      cardholderName: 'John Smith',
      cardNumber: '**** **** **** 1234',
      expiryDate: '05/28',
      cardBrand: ECardBrand.MASTERCARD,
      isDefault: true,
    },
    {
      id: '2',
      cardholderName: 'John Smith',
      cardNumber: '**** **** **** 1234',
      expiryDate: '05/28',
      cardBrand: ECardBrand.VISA,
      isDefault: false,
    },
  ])

  const handleEdit = (id: string) => {
  }

  const handleSetAsDefault = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    )
  }

  const showRemoveModal = (id: string) => {
    setCardToRemove(id)
    setIsRemoveModalOpen(true)
  }

  const handleRemoveConfirm = () => {
    if (cardToRemove) {
      setPaymentMethods((prev) => prev.filter((method) => method.id !== cardToRemove))
      setIsRemoveModalOpen(false)
      setCardToRemove(null)
    }
  }

  const handleRemoveCancel = () => {
    setIsRemoveModalOpen(false)
    setCardToRemove(null)
  }

  const handleAddPaymentMethod = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSuccess = () => {
    setIsModalOpen(false)
  }

  return (
    <StyledTabContent>
      <StyledSectionTitle>Payment Methods</StyledSectionTitle>
      <Spacer value={24} />
      <StyledPaymentMethodsContainer>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            cardholderName={method.cardholderName}
            cardNumber={method.cardNumber}
            expiryDate={method.expiryDate}
            cardBrand={method.cardBrand}
            isDefault={method.isDefault}
            onEdit={() => handleEdit(method.id)}
            onSetAsDefault={() => handleSetAsDefault(method.id)}
            onRemove={() => showRemoveModal(method.id)}
          />
        ))}
      </StyledPaymentMethodsContainer>
      <StyledAddPaymentButton type="primary" onClick={handleAddPaymentMethod}>
        + Add Payment Method
      </StyledAddPaymentButton>
      <AddPaymentMethodModal
        open={isModalOpen}
        onCancel={handleModalClose}
        onSuccess={handleModalSuccess}
      />
      <Modal
        open={isRemoveModalOpen}
        title="Confirm Removal"
        onCancel={handleRemoveCancel}
        centered
        footer={null}
      >
        <Text>Are you sure you want to remove this payment method?</Text>
        <StyledModalFooter>
          <StyledModalCancelButton type="default" onClick={handleRemoveCancel}>
            Cancel
          </StyledModalCancelButton>
          <StyledModalConfirmButton type="primary" onClick={handleRemoveConfirm}>
            Yes
          </StyledModalConfirmButton>
        </StyledModalFooter>
      </Modal>
    </StyledTabContent>
  )
}

