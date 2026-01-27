import { apiClient } from '../client'

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  totalOrders: number
  totalSpent: number
  createdAt: string
}

interface CustomersResponse {
  customers: Customer[]
  total: number
}

export const customerService = {
  getCustomers: async (page = 1, limit = 10): Promise<CustomersResponse> => {
    const response = await apiClient.get<CustomersResponse>('/customers', {
      params: { page, limit },
    })
    return response.data
  },

  getCustomer: async (id: string): Promise<Customer> => {
    const response = await apiClient.get<Customer>(`/customers/${id}`)
    return response.data
  },
}
