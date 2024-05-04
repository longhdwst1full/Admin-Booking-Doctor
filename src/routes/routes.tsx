import SpecialtyPage from '~/pages/Specialty/SpecialtyPage'

import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '~/layouts/DefaultLayout/DefaultLayout'
import AppointmentPage from '~/pages/AppointmentPage/AppointmentPage'
import ChangePassword from '~/pages/ChangePass'
import ClinicPage from '~/pages/ClinicPage/ClinicPage'
import CustomerPage from '~/pages/CustomerPage/CustomerPage'
import Dashboard from '~/pages/Dashboard/Dashboard'
import DoctorPage from '~/pages/Doctor/DoctorPage'
import NotFound from '~/pages/NotFound/NotFound'
import OrderPage from '~/pages/OrdersPage/OrderPage'
import ProfilePage from '~/pages/Profile/profile-page'
import RolePage from '~/pages/RolePage/RolePage'
import { default as ServicesPage } from '~/pages/ServicesPage/ServicesPage'
import SignIn from '~/pages/SignIn/SignIn'
import UserPage from '~/pages/User/UserPage'
import { GuardAccount } from './guardRoute'

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
          { path: 'services', element: <ServicesPage /> },
          { path: 'doctor', element: <DoctorPage /> },
          { path: 'role', element: <RolePage /> },

          { path: 'appointments', element: <AppointmentPage /> },
          { path: 'customers', element: <CustomerPage /> },
          { path: 'users', element: <UserPage /> },
          { path: 'clinic', element: <ClinicPage /> },
          { path: 'orders', element: <OrderPage /> },
          { path: 'specialites', element: <SpecialtyPage /> }
        ]
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
