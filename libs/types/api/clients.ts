export interface Client {
  _id: string
  userId: string
  organizationId?: string | null
  firstName: string
  lastName: string
  email?: string
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface ClientsListQuery {
  page?: number
  limit?: number
  search?: string
  organizationId?: string
}

export interface ClientsListResponse {
  clients: Client[]
  total: number
  page: number
  totalPages: number
}

export interface CreateClientPayload {
  firstName: string
  lastName: string
  email?: string
  startDate?: string
  endDate?: string
}

export interface CreateClientResponse {
  _id: string
  userId: string
  organizationId?: string | null
  firstName: string
  lastName: string
  email?: string
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateClientPayload {
  firstName?: string
  lastName?: string
  email?: string
  startDate?: string
  endDate?: string
}

export interface UpdateClientResponse {
  _id: string
  userId: string
  organizationId?: string | null
  firstName: string
  lastName: string
  email?: string
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

