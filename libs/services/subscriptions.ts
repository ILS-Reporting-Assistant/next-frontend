import { ApiResponse } from '../types'
import type {
  PaymentMethod,
  CreatePaymentMethodPayload,
  CreatePaymentMethodResponse,
  UpdatePaymentMethodPayload,
  UpdatePaymentMethodResponse,
  Plan,
  SubscriptionUsage,
} from '../types'
import { httpClient } from './httpClient'
import { ENDPOINT } from '@app/data'

export const subscriptionsService = {
  async getPlans(organizationId?: string) {
    const { data } = await httpClient.get<ApiResponse<Plan[] | { plans: Plan[]; addons: Plan[] }>>(
      ENDPOINT.SUBSCRIPTIONS.PLANS,
      {
        params: organizationId ? { organizationId } : undefined,
      },
    )
    return data
  },

  async getUsage(organizationId?: string) {
    const { data } = await httpClient.get<ApiResponse<SubscriptionUsage>>(ENDPOINT.SUBSCRIPTIONS.USAGE, {
      params: organizationId ? { organizationId } : undefined,
    })
    return data
  },

  async switchPlan(planId: string, organizationId?: string) {
    const { data } = await httpClient.post<ApiResponse<any>>(ENDPOINT.SUBSCRIPTIONS.SWITCH_PLAN, {
      planId,
      ...(organizationId ? { organizationId } : {}),
    })
    return data
  },

  async getPaymentMethods(organizationId?: string) {
    const { data } = await httpClient.get<ApiResponse<PaymentMethod[]>>(ENDPOINT.SUBSCRIPTIONS.PAYMENT_METHODS, {
      params: organizationId ? { organizationId } : undefined,
    })
    return data
  },

  async createPaymentMethod(payload: CreatePaymentMethodPayload) {
    const { data } = await httpClient.post<ApiResponse<CreatePaymentMethodResponse>>(
      ENDPOINT.SUBSCRIPTIONS.CREATE_PAYMENT_METHOD,
      payload,
    )
    return data
  },

  async updatePaymentMethod(paymentMethodId: string, payload: UpdatePaymentMethodPayload, organizationId?: string) {
    const { data } = await httpClient.patch<ApiResponse<UpdatePaymentMethodResponse>>(
      ENDPOINT.SUBSCRIPTIONS.UPDATE_PAYMENT_METHOD(paymentMethodId),
      payload,
      {
        params: organizationId ? { organizationId } : undefined,
      },
    )
    return data
  },

  async setDefaultPaymentMethod(paymentMethodId: string, organizationId?: string) {
    const { data } = await httpClient.patch<ApiResponse<{ id: string }>>(
      ENDPOINT.SUBSCRIPTIONS.SET_DEFAULT_PAYMENT_METHOD(paymentMethodId),
      undefined,
      {
        params: organizationId ? { organizationId } : undefined,
      },
    )
    return data
  },

  async removePaymentMethod(paymentMethodId: string, organizationId?: string) {
    const { data } = await httpClient.delete<ApiResponse<null>>(
      ENDPOINT.SUBSCRIPTIONS.REMOVE_PAYMENT_METHOD(paymentMethodId),
      {
        params: organizationId ? { organizationId } : undefined,
      },
    )
    return data
  },

  async addExtraSeats(quantity: number, organizationId?: string) {
    const { data } = await httpClient.post<ApiResponse<{ extraSeats: number }>>(
      ENDPOINT.SUBSCRIPTIONS.ADD_EXTRA_SEATS,
      {
        quantity,
        ...(organizationId ? { organizationId } : {}),
      },
    )
    return data
  },

  async addExtraClients(quantity: number, organizationId?: string) {
    const { data } = await httpClient.post<ApiResponse<{ extraActiveClients: number }>>(
      ENDPOINT.SUBSCRIPTIONS.ADD_EXTRA_CLIENTS,
      {
        quantity,
        ...(organizationId ? { organizationId } : {}),
      },
    )
    return data
  },

  async cancelSubscription(organizationId?: string) {
    const { data } = await httpClient.post<
      ApiResponse<{ success: boolean; cancelAtPeriodEnd: boolean; periodEnd?: Date }>
    >(ENDPOINT.SUBSCRIPTIONS.CANCEL, undefined, {
      params: organizationId ? { organizationId } : undefined,
    })
    return data
  },

  async reactivateSubscription(organizationId?: string) {
    const { data } = await httpClient.post<
      ApiResponse<{ success: boolean; cancelAtPeriodEnd: boolean; periodEnd?: Date }>
    >(ENDPOINT.SUBSCRIPTIONS.REACTIVATE, undefined, {
      params: organizationId ? { organizationId } : undefined,
    })
    return data
  },

  async reduceExtraSeats(quantity: number, organizationId?: string, userIds?: string[], invitedUserIds?: string[]) {
    const { data } = await httpClient.post<ApiResponse<{ extraSeats: number }>>(
      ENDPOINT.SUBSCRIPTIONS.REDUCE_EXTRA_SEATS,
      {
        quantity,
        ...(userIds ? { userIds } : {}),
        ...(invitedUserIds ? { invitedUserIds } : {}),
        ...(organizationId ? { organizationId } : {}),
      },
    )
    return data
  },

  async reduceExtraClients(quantity: number, organizationId?: string, clientIds?: string[]) {
    const { data } = await httpClient.post<ApiResponse<{ extraActiveClients: number }>>(
      ENDPOINT.SUBSCRIPTIONS.REDUCE_EXTRA_CLIENTS,
      {
        quantity,
        ...(clientIds ? { clientIds } : {}),
        ...(organizationId ? { organizationId } : {}),
      },
    )
    return data
  },
}
