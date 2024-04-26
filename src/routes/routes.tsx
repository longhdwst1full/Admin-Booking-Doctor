import BlogPage from '~/pages/BlogPage/BlogPage'
import CategoryBlogPage from '~/pages/CategoryBlogPage/CategoryBlogPage'

import { GuardAccount } from './guardRoute'
import { createBrowserRouter } from 'react-router-dom'
import CategoryPage from '~/pages/CategoryPage/CategoryPage'
import ChangePassword from '~/pages/ChangePass'
import CustomerPage from '~/pages/CustomerPage/CustomerPage'
import NotFound from '~/pages/NotFound/NotFound'
import OrderPage from '~/pages/OrdersPage/OrderPage'
import StaffPage from '~/pages/StaffPage/StaffPage'
import Dashboard from '~/pages/Dashboard/Dashboard'
import SignIn from '~/pages/SignIn/SignIn'
import ProductPage from '~/pages/ProductPage/ProductPage'
import CreateProduct from '~/pages/ProductPage/CreateProduct'
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout'
import ProfilePage from '~/pages/Profile/profile-page'
import BlogCreate from '~/pages/BlogPage/BlogCreate'

const routers = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },

  {
    path: '/dashboard',
    children: [
      {
        element: <GuardAccount JSX={DefaultLayout} />,
        children: [{ index: true, element: <Dashboard /> }]
      }
    ]
  },
  {
    path: '/manager',
    children: [
      {
        element: <GuardAccount JSX={DefaultLayout} />,
        children: [
          { path: 'products', element: <ProductPage /> },
          { path: 'products/create', element: <CreateProduct /> },
          { path: 'appointments', element: <ProductPage /> },
          { path: 'customers', element: <CustomerPage /> },
          { path: 'staffs', element: <StaffPage /> },
          { path: 'categories', element: <CategoryPage /> },
          { path: 'orders', element: <OrderPage /> },
          { path: 'category-blog', element: <CategoryBlogPage /> },
          { path: 'blogs', element: <BlogPage /> },
          { path: 'blogs/create', element: <BlogCreate /> }
        ]
      }
    ]
  },
  {
    path: '/settings',
    children: [
      {
        element: <GuardAccount JSX={DefaultLayout} />,
        children: [{ index: true, element: 'settings' }]
      }
    ]
  },
  {
    path: '/profile',
    children: [
      {
        element: <GuardAccount JSX={DefaultLayout} />,
        children: [{ index: true, element: <ProfilePage /> }]
      }
    ]
  },
  {
    path: '/change-pass',
    children: [
      {
        element: <GuardAccount JSX={DefaultLayout} />,
        children: [{ index: true, element: <ChangePassword /> }]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default routers
