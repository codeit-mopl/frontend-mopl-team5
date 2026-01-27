import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import ProtectedLayout from '@/layouts/ProtectedLayout'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import SignInPage from '@/pages/SignInPage'
import SignUpPage from '@/pages/SignUpPage'

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
        element: <ProtectedRoute />,
        children: [
          {
            element: <ProtectedLayout />,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
])
