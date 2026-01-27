import { apiClient } from '../client'

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  products: Product[]
  total: number
}

interface CreateProductRequest {
  name: string
  description: string
  price: number
  stock: number
  category: string
}

interface UpdateProductRequest extends Partial<CreateProductRequest> {}

export const productService = {
  getProducts: async (page = 1, limit = 10): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { page, limit },
    })
    return response.data
  },

  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  },

  createProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>('/products', data)
    return response.data
  },

  updateProduct: async (id: string, data: UpdateProductRequest): Promise<Product> => {
    const response = await apiClient.patch<Product>(`/products/${id}`, data)
    return response.data
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`)
  },
}
