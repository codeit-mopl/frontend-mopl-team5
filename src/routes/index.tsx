import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'
import ProductsPage from '@/pages/ProductsPage'
import OrdersPage from '@/pages/OrdersPage'
import CustomersPage from '@/pages/CustomersPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import SettingsPage from '@/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <ProtectedLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: '/products',
                element: <ProductsPage />,
              },
              {
                path: '/orders',
                element: <OrdersPage />,
              },
              {
                path: '/customers',
                element: <CustomersPage />,
              },
              {
                path: '/analytics',
                element: <AnalyticsPage />,
              },
              {
                path: '/settings',
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
])
