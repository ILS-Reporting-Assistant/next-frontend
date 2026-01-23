export interface Organization {
  _id: string
  name: string
  organizationName?: string
  address?: string
  logo?: string
  createdBy: string
  totalUser: number
  website?: string
  phoneNumber?: string
  stripeCustomerId?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateOrganizationPayload {
  organizationId: string
  organizationName?: string
  address?: string
  logo?: string
}
