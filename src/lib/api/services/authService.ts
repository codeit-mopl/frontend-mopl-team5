import { apiClient } from '../client'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  user: {
    id: string
    email: string
    name: string
  }
  accessToken: string
  refreshToken: string
}

interface SignUpRequest {
  email: string
  password: string
  name: string
}

export const authService = {
  signIn: async (data: SignInRequest): Promise<SignInResponse> => {
    const response = await apiClient.post<SignInResponse>('/auth/sign-in', data)
    return response.data
  },

  signUp: async (data: SignUpRequest): Promise<SignInResponse> => {
    const response = await apiClient.post<SignInResponse>('/auth/sign-up', data)
    return response.data
  },

  signOut: async (): Promise<void> => {
    await apiClient.post('/auth/sign-out')
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const response = await apiClient.post<{ accessToken: string }>(
      '/auth/refresh',
      { refreshToken }
    )
    return response.data
  },
}
