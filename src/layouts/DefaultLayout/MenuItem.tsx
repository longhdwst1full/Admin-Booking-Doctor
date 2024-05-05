import { ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { AiOutlineControl } from 'react-icons/ai'
import { BiCategoryAlt, BiSolidCategoryAlt } from 'react-icons/bi'
import { FaClipboardList, FaListUl, FaPeopleArrows, FaUserFriends } from 'react-icons/fa'

import type { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'
import { getAuthLocalData } from '~/configs/token'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}
const menuStaff: MenuProps['items'] = [
  // quản lý sản phẩm
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    // getItem(<NavLink to={`/manager/doctor`}>Bác sĩ</NavLink>, 'doctor', <ShoppingOutlined />),

    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />)
  ])
]
const menuAdmin: MenuProps['items'] = [
  // quản lý đơn hàng
  getItem(<NavLink to={`/dashboard`}>Thống kê</NavLink>, 'orders', <FaClipboardList />),

  // quản lý sản phẩm
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(<NavLink to={`/manager/doctor`}>Bác sĩ</NavLink>, 'doctor', <ShoppingOutlined />),
    getItem(<NavLink to={`/manager/clinic`}>Phòng Khám</NavLink>, 'clinic', <BiSolidCategoryAlt />),
    getItem(<NavLink to={`/manager/services`}>Dịch vụ</NavLink>, 'services', <BiSolidCategoryAlt />),

    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />),
    getItem(<NavLink to={`/manager/specialites`}>Chuyên khoa</NavLink>, 'Specialities', <FaPeopleArrows />),

    getItem(<NavLink to={`/manager/role`}>Chức vụ</NavLink>, 'role', <BiCategoryAlt />)
    // quản lý người dùng
  ]),
  getItem('Người dùng', 'users', <UserOutlined />, [
    getItem(<NavLink to={`/manager/users`}>Khách hàng</NavLink>, 'customers', <FaUserFriends />),
    getItem(<NavLink to={`/manager/starts`}>Nhân viên</NavLink>, 'starts', <FaUserFriends />)
  ])
]
const menuDoctor: MenuProps['items'] = [
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(<NavLink to={`/manager/doctor`}>Bác sĩ</NavLink>, 'doctor', <ShoppingOutlined />),
    getItem(<NavLink to={`/manager/clinic`}>Phòng Khám</NavLink>, 'clinic', <BiSolidCategoryAlt />),
    getItem(<NavLink to={`/manager/services`}>Dịch vụ</NavLink>, 'services', <BiSolidCategoryAlt />),

    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />),
    getItem(<NavLink to={`/manager/specialites`}>Chuyên khoa</NavLink>, 'Specialities', <FaPeopleArrows />)
  ])
]

export const handleMenu = () => {
  const user = getAuthLocalData()
  console.log(user?.user?.role)
  return user && user?.user?.role == 1 ? menuAdmin : user?.user?.role == 2 ? menuDoctor : menuAdmin
}
