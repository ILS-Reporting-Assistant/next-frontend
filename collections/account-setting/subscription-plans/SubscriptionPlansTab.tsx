import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Spacer, Notification } from '@app/components'
import { useSelector } from 'react-redux'
import { IStore } from '@app/redux'
import { subscriptionsService } from '@app/services'
import type { Plan } from '@app/types'
import { StyledSubscriptionDescription } from './elements'
import { StyledSectionTitle, StyledTabContent } from '../shared'
import { MonthlyPlans } from '../tabs/components/MonthlyPlans'
import { AddPaymentMethodModal } from '../components'
import { usePlanUsage } from '../..'

export const SubscriptionPlansTab: React.FC = () => {
  const { user } = useSelector((state: IStore) => state)
  const { refresh, usage, isLoading: isLoadingUsage } = usePlanUsage()
  const [plans, setPlans] = useState<Plan[]>([])
  const [addons, setAddons] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const retryPurchaseRef = useRef<(() => Promise<void>) | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [plansResponse] = await Promise.all([
        subscriptionsService.getPlans(user.currentOrganizationId || undefined),
        refresh(),
      ])

      if (Array.isArray(plansResponse.data)) {
        setPlans(plansResponse.data)
        setAddons([])
      } else {
        setPlans(plansResponse.data.plans || [])
        setAddons(plansResponse.data.addons || [])
      }
    } catch (error: any) {
      Notification({
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to fetch subscription data',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }, [user.currentOrganizationId])

  useEffect(() => {
    fetchData()
  }, [])

  const handlePaymentModalSuccess = async () => {
    setIsPaymentModalOpen(false)

    if (retryPurchaseRef.current) {
      try {
        await retryPurchaseRef.current()
      } catch (error) {}
      retryPurchaseRef.current = null
    }

    fetchData()
  }

  return (
    <StyledTabContent>
      <StyledSectionTitle>Subscription Plans</StyledSectionTitle>
      <Spacer value={8} />
      <StyledSubscriptionDescription>
        Explore our flexible subscription plans for your photo storage needs!
      </StyledSubscriptionDescription>
      {/* <StyledPricingToggleWrapper>
        <StyledPricingToggle>
          <RadioGroup
            value={pricingPeriod}
            onChange={(e) => setPricingPeriod(e.target.value as BillingPeriod)}
            buttonStyle="solid"
          >
            <RadioButton value="monthly">Monthly</RadioButton>
            <RadioButton value="annually">Annually</RadioButton>
          </RadioGroup>
        </StyledPricingToggle>
      </StyledPricingToggleWrapper> */}
      <MonthlyPlans
        plans={plans}
        addons={addons}
        isLoading={isLoading || isLoadingUsage}
        usage={usage}
        organizationId={user.currentOrganizationId || undefined}
        onPlanSwitch={fetchData}
        onPaymentMethodRequired={(retryFn) => {
          retryPurchaseRef.current = retryFn
          setIsPaymentModalOpen(true)
        }}
      />
      <AddPaymentMethodModal
        open={isPaymentModalOpen}
        onCancel={() => {
          setIsPaymentModalOpen(false)
          retryPurchaseRef.current = null
        }}
        onSuccess={handlePaymentModalSuccess}
        organizationId={user.currentOrganizationId || undefined}
      />
    </StyledTabContent>
  )
}
