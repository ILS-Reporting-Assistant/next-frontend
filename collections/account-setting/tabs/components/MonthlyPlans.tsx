import React, { Fragment, useState, useMemo } from 'react'
import { Spin, Notification, Modal, Text } from '@app/components'
import { subscriptionsService } from '@app/services'
import type { MonthlyPlansProps, Plan } from '@app/types'
import {
  AddonView,
  PlanCard,
  ReduceAddonView,
  SelectClientsModal,
  SelectUsersModal,
  StyledAddonsContainer,
  StyledAddonsGrid,
  StyledAddonsSubtitle,
  StyledAddonsTitle,
  StyledPlansContainer,
  StyledPlansLoader,
  StyledPlansAndReduceContainer,
  StyledReduceAddonsContainer,
} from '../../components'
import { SubscriptionStatus } from '@app/enums'

export const MonthlyPlans: React.FC<MonthlyPlansProps> = ({
  plans = [],
  addons = [],
  isLoading = false,
  usage = null,
  organizationId,
  onPlanSwitch,
  onPaymentMethodRequired,
}) => {
  const [purchasingPlanId, setPurchasingPlanId] = useState<string | null>(null)
  const [cancellingSubscription, setCancellingSubscription] = useState<boolean>(false)
  const [reactivatingSubscription, setReactivatingSubscription] = useState<boolean>(false)
  const [addonQuantities, setAddonQuantities] = useState<Record<string, number | null>>({})
  const [reducingAddonId, setReducingAddonId] = useState<string | null>(null)
  const [reduceQuantities, setReduceQuantities] = useState<Record<string, number | null>>({})
  const [selectClientsModalOpen, setSelectClientsModalOpen] = useState(false)
  const [selectUsersModalOpen, setSelectUsersModalOpen] = useState(false)
  const [pendingReduceQuantity, setPendingReduceQuantity] = useState<number | null>(null)
  const [pendingFullReduceQuantity, setPendingFullReduceQuantity] = useState<number | null>(null)
  const [pendingAddonId, setPendingAddonId] = useState<string | null>(null)
  const [cancelConfirmationModalOpen, setCancelConfirmationModalOpen] = useState<boolean>(false)
  const [resumeConfirmationModalOpen, setResumeConfirmationModalOpen] = useState<boolean>(false)

  const isFreePlan = useMemo(() => usage?.plan?.amount === 0, [usage])

  const isCurrentPlanFn = useMemo(
    () => (planId: string) => {
      return usage?.plan?._id === planId
    },
    [usage],
  )

  const normalizeDate = (date: Date | string | number) => new Date(date).setHours(0, 0, 0, 0)

  const isCancelled = useMemo(() => {
    return usage?.subscription?.status === SubscriptionStatus.CANCELED || usage?.subscription?.cancelAtPeriodEnd
  }, [usage])

  const isExpired = useMemo(() => {
    return isCancelled && usage?.subscription?.periodEnd
      ? normalizeDate(usage?.subscription?.periodEnd) < normalizeDate(new Date())
      : false
  }, [isCancelled, usage])

  const purchasePlan = async (plan: Plan) => {
    await subscriptionsService.switchPlan(plan._id, organizationId)
    Notification({
      message: 'Success',
      description: 'Subscription purchased successfully.',
      type: 'success',
    })
    if (onPlanSwitch) {
      onPlanSwitch()
    }
  }

  const handlePurchase = async (plan) => {
    setPurchasingPlanId(plan._id)
    try {
      await purchasePlan(plan)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || ''
      if (errorMessage.includes('Payment method required')) {
        if (onPaymentMethodRequired) {
          // Store the retry function
          const retryFn = async () => {
            setPurchasingPlanId(plan._id)
            try {
              await purchasePlan(plan)
            } catch (retryError: any) {
              const retryErrorMessage = retryError?.response?.data?.message || ''
              Notification({
                message: 'Error',
                description: retryErrorMessage || 'Failed to purchase subscription.',
                type: 'error',
              })
              throw retryError
            } finally {
              setPurchasingPlanId(null)
            }
          }
          onPaymentMethodRequired(retryFn)
        } else {
          Notification({
            message: 'Error',
            description: errorMessage || 'Failed to purchase subscription.',
            type: 'error',
          })
        }
      } else {
        Notification({
          message: 'Error',
          description: errorMessage || 'Failed to purchase subscription.',
          type: 'error',
        })
      }
    } finally {
      setPurchasingPlanId(null)
    }
  }

  const handleCancelSubscription = async () => {
    setCancellingSubscription(true)
    try {
      const response = await subscriptionsService.cancelSubscription(organizationId)
      Notification({
        message: 'Success',
        description: response.message || 'Subscription will be cancelled at the end of the billing period',
        type: 'success',
      })
      setCancelConfirmationModalOpen(false)
      if (onPlanSwitch) {
        onPlanSwitch()
      }
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to cancel subscription',
        type: 'error',
      })
    } finally {
      setCancellingSubscription(false)
    }
  }

  const handleReactivateSubscription = async () => {
    setReactivatingSubscription(true)
    try {
      const response = await subscriptionsService.reactivateSubscription(organizationId)
      Notification({
        message: 'Success',
        description: response.message || 'Subscription reactivated successfully',
        type: 'success',
      })
      if (onPlanSwitch) {
        onPlanSwitch()
      }
      return true
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to reactivate subscription',
        type: 'error',
      })
      return false
    } finally {
      setReactivatingSubscription(false)
    }
  }

  const handleConfirmResumeSubscription = async () => {
    const success = await handleReactivateSubscription()
    if (success) {
      setResumeConfirmationModalOpen(false)
    }
  }

  const handleAddonPurchase = async (addon: Plan) => {
    const quantity = addonQuantities[addon._id]

    // Validation
    if (!quantity || quantity < 1) {
      Notification({
        message: 'Validation Error',
        description: 'Please enter a valid quantity (minimum 1)',
        type: 'error',
      })
      return
    }

    if (!Number.isInteger(quantity)) {
      Notification({
        message: 'Validation Error',
        description: 'Quantity must be a whole number',
        type: 'error',
      })
      return
    }

    setPurchasingPlanId(addon._id)
    try {
      const addonName = addon.name.toLowerCase()
      if (addonName.includes('seat')) {
        await subscriptionsService.addExtraSeats(quantity, organizationId)
        Notification({
          message: 'Success',
          description: `${quantity} extra seat${quantity > 1 ? 's' : ''} added successfully`,
          type: 'success',
        })
      } else if (addonName.includes('client')) {
        await subscriptionsService.addExtraClients(quantity, organizationId)
        Notification({
          message: 'Success',
          description: `${quantity} extra client${quantity > 1 ? 's' : ''} added successfully`,
          type: 'success',
        })
      } else {
        throw new Error('Unknown addon type')
      }

      setAddonQuantities((prev) => ({ ...prev, [addon._id]: null }))

      if (onPlanSwitch) {
        onPlanSwitch()
      }
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to add addon',
        type: 'error',
      })
    } finally {
      setPurchasingPlanId(null)
    }
  }

  const handleQuantityChange = (addonId: string, value: number | string | null) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    setAddonQuantities((prev) => ({ ...prev, [addonId]: numValue }))
  }

  const handleReduceQuantityChange = (addonId: string, value: number | string | null) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    setReduceQuantities((prev) => ({ ...prev, [addonId]: numValue }))
  }
  const handleAddonReduce = async (
    addon: Plan,
    clientIds?: string[],
    userIds?: string[],
    invitedUserIds?: string[],
    quantityOverride?: number,
  ) => {
    const quantity = quantityOverride ?? reduceQuantities[addon._id]

    if (!quantity || quantity < 1) {
      Notification({
        message: 'Validation Error',
        description: 'Please enter a valid quantity (minimum 1)',
        type: 'error',
      })
      return
    }

    if (!Number.isInteger(quantity)) {
      Notification({
        message: 'Validation Error',
        description: 'Quantity must be a whole number',
        type: 'error',
      })
      return
    }

    const addonName = addon.name.toLowerCase()
    let currentQuantity = 0
    if (addonName.includes('seat')) {
      currentQuantity = usage?.extraSeats || usage?.subscription?.extraSeats || 0
    } else if (addonName.includes('client')) {
      currentQuantity = usage?.extraActiveClients || usage?.subscription?.extraActiveClients || 0
    }

    if (quantity > currentQuantity) {
      Notification({
        message: 'Validation Error',
        description: `Cannot reduce ${quantity}. Current quantity: ${currentQuantity}`,
        type: 'error',
      })
      return
    }

    if (!userIds && !clientIds) {
      if (addonName.includes('seat') && usage?.remainingSeats !== undefined) {
        const remainingSeats = usage.remainingSeats
        if (quantity > remainingSeats) {
          const usersToSelect = quantity - remainingSeats
          setPendingFullReduceQuantity(quantity)
          setPendingReduceQuantity(usersToSelect)
          setPendingAddonId(addon._id)
          setSelectUsersModalOpen(true)
          return
        }
      }

      if (addonName.includes('client') && usage?.remainingActiveClients !== undefined) {
        const remainingActiveClients = usage.remainingActiveClients
        if (quantity > remainingActiveClients) {
          const clientsToSelect = quantity - remainingActiveClients
          setPendingFullReduceQuantity(quantity)
          setPendingReduceQuantity(clientsToSelect)
          setPendingAddonId(addon._id)
          setSelectClientsModalOpen(true)
          return
        }
      }
    }

    setReducingAddonId(addon._id)
    try {
      if (addonName.includes('seat')) {
        await subscriptionsService.reduceExtraSeats(quantity, organizationId, userIds, invitedUserIds)
        Notification({
          message: 'Success',
          description: `${quantity} extra seat${quantity > 1 ? 's' : ''} reduced successfully`,
          type: 'success',
        })
      } else if (addonName.includes('client')) {
        await subscriptionsService.reduceExtraClients(quantity, organizationId, clientIds)
        Notification({
          message: 'Success',
          description: `${quantity} extra client${quantity > 1 ? 's' : ''} reduced successfully`,
          type: 'success',
        })
      }

      setReduceQuantities((prev) => ({ ...prev, [addon._id]: null }))

      if (onPlanSwitch) {
        onPlanSwitch()
      }
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to reduce addon',
        type: 'error',
      })
    } finally {
      setReducingAddonId(null)
    }
  }

  const handleClientSelectionConfirm = async (clientIds: string[]) => {
    if (!pendingAddonId || !pendingFullReduceQuantity) return

    const addon = addons.find((a) => a._id === pendingAddonId)
    if (!addon) return

    setSelectClientsModalOpen(false)
    await handleAddonReduce(addon, clientIds, undefined, undefined, pendingFullReduceQuantity)

    setPendingReduceQuantity(null)
    setPendingFullReduceQuantity(null)
    setPendingAddonId(null)
  }

  const handleUserSelectionConfirm = async (userIds: string[], invitedUserIds: string[]) => {
    if (!pendingAddonId || !pendingFullReduceQuantity) return

    const addon = addons.find((a) => a._id === pendingAddonId)
    if (!addon) return

    setSelectUsersModalOpen(false)
    await handleAddonReduce(addon, undefined, userIds, invitedUserIds, pendingFullReduceQuantity)

    setPendingReduceQuantity(null)
    setPendingFullReduceQuantity(null)
    setPendingAddonId(null)
  }

  const formatPrice = (amount: number) => {
    const dollars = (amount / 100).toFixed(2)
    return `$${dollars}`
  }

  const formatPriceSubText = (period: string, currency: string) => {
    return `${currency}/${period}`
  }

  const getFeaturesFromPlan = (plan: Plan) => {
    return plan.features.map((feature) => ({ text: feature }))
  }

  const getButtonProps = (plan: Plan) => {
    const isActiveSubscription = usage && usage.subscription?.status === SubscriptionStatus.ACTIVE
    const isCurrentPlan = isCurrentPlanFn(plan._id)
    const isPurchasing = purchasingPlanId === plan._id
    const isCancelling = cancellingSubscription

    if (isCancelled && isCurrentPlan && !isExpired) {
      return {
        buttonText: 'Resume Subscription',
        disabled: reactivatingSubscription,
        buttonType: 'primary' as const,
        loading: reactivatingSubscription,
        onClick: () => setResumeConfirmationModalOpen(true),
      }
    }

    if (isActiveSubscription && isCurrentPlan) {
      if (usage?.plan?.amount === 0) {
        return {
          buttonText: 'Your Current Plan',
          disabled: true,
          buttonType: 'primary' as const,
          loading: false,
          onClick: () => {
            // do nothing
          },
          isDanger: false,
        }
      }

      return {
        buttonText: 'Cancel Subscription',
        disabled: isCancelling,
        buttonType: 'primary' as const,
        loading: isCancelling,
        onClick: () => setCancelConfirmationModalOpen(true),
        isDanger: true,
      }
    }

    return {
      buttonText: 'Purchase',
      disabled: plan.amount === 0 || isPurchasing,
      buttonType: 'primary' as const,
      loading: isPurchasing,
      onClick: () => handlePurchase(plan),
    }
  }

  const purchasedAddons = useMemo(() => {
    if (!usage || addons.length === 0) return []

    return addons.filter((addon) => {
      const addonName = addon.name.toLowerCase()
      let currentQuantity = 0
      if (addonName.includes('seat')) {
        currentQuantity = usage?.extraSeats || usage?.subscription?.extraSeats || 0
      } else if (addonName.includes('client')) {
        currentQuantity = usage?.extraActiveClients || usage?.subscription?.extraActiveClients || 0
      }
      return currentQuantity > 0
    })
  }, [addons, usage])

  const orderedPlans = useMemo(() => {
    return [...plans].sort((a, b) => a.amount - b.amount)
  }, [plans])

  return (
    <Fragment>
      <Modal
        open={cancelConfirmationModalOpen}
        title="Cancel Subscription"
        onCancel={() => setCancelConfirmationModalOpen(false)}
        onOk={handleCancelSubscription}
        confirmLoading={cancellingSubscription}
        okText="Cancel Subscription"
        okButtonProps={{ danger: true }}
        cancelText="Keep Subscription"
      >
        <Text>
          Are you sure you want to cancel your subscription? Your subscription will remain active until the end of the
          current billing period, after which it will be cancelled.
        </Text>
      </Modal>
      <Modal
        open={resumeConfirmationModalOpen}
        title="Resume Subscription"
        onCancel={() => setResumeConfirmationModalOpen(false)}
        onOk={handleConfirmResumeSubscription}
        confirmLoading={reactivatingSubscription}
        okText="Resume Subscription"
        cancelText="Keep Cancelled"
      >
        <Text>Are you sure you want to resume your subscription? Your subscription will become active immediately.</Text>
      </Modal>
      <SelectClientsModal
        open={selectClientsModalOpen}
        onCancel={() => {
          setSelectClientsModalOpen(false)
          setPendingReduceQuantity(null)
          setPendingFullReduceQuantity(null)
          setPendingAddonId(null)
        }}
        onConfirm={handleClientSelectionConfirm}
        quantity={pendingReduceQuantity || 0}
        organizationId={organizationId}
      />
      <SelectUsersModal
        open={selectUsersModalOpen}
        onCancel={() => {
          setSelectUsersModalOpen(false)
          setPendingReduceQuantity(null)
          setPendingFullReduceQuantity(null)
          setPendingAddonId(null)
        }}
        onConfirm={handleUserSelectionConfirm}
        quantity={pendingReduceQuantity || 0}
        organizationId={organizationId}
      />
      {isLoading ? (
        <StyledPlansLoader>
          <Spin size="large" />
        </StyledPlansLoader>
      ) : (
        <StyledPlansAndReduceContainer data-has-reduce-addons={purchasedAddons.length > 0 ? 'true' : undefined}>
          <StyledPlansContainer data-single-plan={plans.length === 1 ? 'true' : undefined}>
            {orderedPlans.map((plan: Plan) => {
              const buttonProps = getButtonProps(plan)
              return (
                <PlanCard
                  key={plan._id}
                  title={plan.name}
                  price={formatPrice(plan.amount)}
                  priceSubText={formatPriceSubText(plan.period, plan.currency)}
                  description={plan.description}
                  buttonText={buttonProps.buttonText}
                  buttonType={buttonProps.buttonType}
                  disabled={buttonProps.disabled}
                  loading={buttonProps.loading}
                  isPopular={plan.amount !== 0}
                  onButtonClick={buttonProps.onClick}
                  features={getFeaturesFromPlan(plan)}
                  isDanger={buttonProps.isDanger}
                  isActive={isCurrentPlanFn(plan._id)}
                />
              )
            })}
            {purchasedAddons.length > 0 && (
              <StyledReduceAddonsContainer>
                {purchasedAddons.map((addon) => {
                  const addonName = addon.name.toLowerCase()
                  let currentQuantity = 0
                  if (addonName.includes('seat')) {
                    currentQuantity = usage?.extraSeats || usage?.subscription?.extraSeats || 0
                  } else if (addonName.includes('client')) {
                    currentQuantity = usage?.extraActiveClients || usage?.subscription?.extraActiveClients || 0
                  }
                  return (
                    <ReduceAddonView
                      key={addon._id}
                      addon={addon}
                      currentQuantity={currentQuantity}
                      reduceQuantities={reduceQuantities}
                      handleReduceQuantityChange={handleReduceQuantityChange}
                      handleAddonReduce={handleAddonReduce}
                      reducingAddonId={reducingAddonId}
                      isCancelled={isCancelled}
                      isExpired={isExpired}
                    />
                  )
                })}
              </StyledReduceAddonsContainer>
            )}
          </StyledPlansContainer>
        </StyledPlansAndReduceContainer>
      )}
      {!isLoading && addons.length > 0 && (
        <StyledAddonsContainer>
          <StyledAddonsTitle>Available Add-Ons</StyledAddonsTitle>
          <StyledAddonsSubtitle>Explore add-ons for the Agency Plan</StyledAddonsSubtitle>
          <StyledAddonsGrid>
            {addons.map((addon) => {
              const addonName = addon.name.toLowerCase()
              const isAddonLocked = isFreePlan && (addonName.includes('seat') || addonName.includes('client'))
              const addonLockedTooltip = addonName.includes('seat')
                ? 'Please Update your plan to add more seats.'
                : addonName.includes('client')
                ? 'Please Update your plan to add more clients.'
                : undefined
              const buttonProps = getButtonProps(addon)
              const features = getFeaturesFromPlan(addon)
              return (
                <AddonView
                  key={addon._id}
                  addon={addon}
                  features={features}
                  addonQuantities={addonQuantities}
                  handleQuantityChange={handleQuantityChange}
                  handleAddonPurchase={handleAddonPurchase}
                  buttonProps={{
                    ...buttonProps,
                    disabled: buttonProps.disabled || isAddonLocked,
                  }}
                  isCancelled={isCancelled}
                  isExpired={isExpired}
                  isAddonLocked={isAddonLocked}
                  addonDisabledTooltip={isAddonLocked ? addonLockedTooltip : undefined}
                  formatPrice={formatPrice}
                  formatPriceSubText={formatPriceSubText}
                />
              )
            })}
          </StyledAddonsGrid>
        </StyledAddonsContainer>
      )}
    </Fragment>
  )
}
