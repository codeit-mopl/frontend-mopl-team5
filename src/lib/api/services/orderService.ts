import { apiClient } from '../client'

interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: Array<{
    id: string
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  updatedAt: string
}

interface OrdersResponse {
  orders: Order[]
  total: number
}

export const orderService = {
  getOrders: async (page = 1, limit = 10): Promise<OrdersResponse> => {
    const response = await apiClient.get<OrdersResponse>('/orders', {
      params: { page, limit },
    })
    return response.data
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`)
    return response.data
  },

  updateOrderStatus: async (
    id: string,
    status: Order['status']
  ): Promise<Order> => {
    const response = await apiClient.patch<Order>(`/orders/${id}`, { status })
    return response.data
  },
}
