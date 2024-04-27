import { BarChartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { AiOutlineControl } from 'react-icons/ai'
import { BiCategoryAlt, BiSolidCategoryAlt } from 'react-icons/bi'
import { FaClipboardList, FaListUl, FaPeopleArrows, FaRegNewspaper, FaUserEdit, FaUserFriends } from 'react-icons/fa'

import type { MenuProps } from 'antd'
import { NavLink } from 'react-router-dom'

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

export const items: MenuProps['items'] = [
  // giao diên chính
  getItem(<NavLink to={`/dashboard`}>Thống kê</NavLink>, 'dashboard', <BarChartOutlined />),

  // quản lý đơn hàng
  getItem(<NavLink to={`/manager/orders`}>Đơn hàng</NavLink>, 'orders', <FaClipboardList />),

  // quản lý sản phẩm
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(<NavLink to={`/manager/products`}>Sản phẩm</NavLink>, 'products', <ShoppingOutlined />),
    getItem(<NavLink to={`/manager/categories`}>Danh mục</NavLink>, 'categories', <BiSolidCategoryAlt />),
    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />),
    getItem(<NavLink to={`/manager/specialites`}>Specialities</NavLink>, 'Appointments', <FaPeopleArrows />),

    getItem(<NavLink to={`/manager/category-blog`}>Danh mục bài viết</NavLink>, 'category-blog', <BiCategoryAlt />),
    getItem(<NavLink to={`/manager/blogs`}>Bài viết</NavLink>, 'blogs', <FaRegNewspaper />)
  ]),

  // quản lý người dùng
  getItem('Người dùng', 'users', <UserOutlined />, [
    getItem(<NavLink to={`/manager/customers`}>Khách hàng</NavLink>, 'customers', <FaUserFriends />),
    getItem(<NavLink to={`/manager/staffs`}>Nhân viên</NavLink>, 'staffs', <FaUserEdit />)
  ])
]

export const itemsStaff: MenuProps['items'] = [
  // quản lý đơn hàng
  getItem(<NavLink to={`/manager/orders`}>Đơn hàng</NavLink>, 'orders', <FaClipboardList />),

  // quản lý sản phẩm
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(<NavLink to={`/manager/doctor`}>Doctor</NavLink>, 'doctor', <ShoppingOutlined />),
    getItem(<NavLink to={`/manager/clinic`}>Clinic</NavLink>, 'clinic', <BiSolidCategoryAlt />),

    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />),
    getItem(<NavLink to={`/manager/specialites`}>Specialities</NavLink>, 'Appointments', <FaPeopleArrows />),

    getItem(<NavLink to={`/manager/role`}>Role</NavLink>, 'role', <BiCategoryAlt />)
    // quản lý người dùng
  ]),
  getItem('Người dùng', 'users', <UserOutlined />, [
    getItem(<NavLink to={`/manager/customers`}>Khách hàng</NavLink>, 'customers', <FaUserFriends />),
    getItem(<NavLink to={`/manager/staffs`}>Nhân viên</NavLink>, 'staffs', <FaUserEdit />)
  ])
]
