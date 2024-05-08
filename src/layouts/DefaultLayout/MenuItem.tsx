import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { AiOutlineControl } from 'react-icons/ai'
import { BiClinic, BiSolidCategoryAlt } from 'react-icons/bi'
import { FaClipboardList, FaListUl, FaPeopleArrows, FaRegMoneyBillAlt, FaUserFriends } from 'react-icons/fa'
import { FaCriticalRole, FaUserDoctor } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { getAuthLocalData, removeAuthLocalData } from '~/configs/token'

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
    getItem(<NavLink to={`/manager/bill`}>Hóa đơn</NavLink>, 'bill', <FaRegMoneyBillAlt />),
    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />)
  ])
]
const menuAdmin: MenuProps['items'] = [
  // quản lý đơn hàng
  getItem(<NavLink to={`/dashboard`}>Thống kê</NavLink>, 'orders', <FaClipboardList />),

  // quản lý sản phẩm
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(<NavLink to={`/manager/bill`}>Hóa đơn</NavLink>, 'bill', <FaRegMoneyBillAlt />),
    getItem(<NavLink to={`/manager/doctor`}>Bác sĩ</NavLink>, 'doctor', <FaUserDoctor />),
    getItem(<NavLink to={`/manager/clinic`}>Phòng Khám</NavLink>, 'clinic', <BiClinic />),
    getItem(<NavLink to={`/manager/services`}>Dịch vụ</NavLink>, 'services', <BiSolidCategoryAlt />),

    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />),
    getItem(<NavLink to={`/manager/specialites`}>Chuyên khoa</NavLink>, 'Specialities', <FaPeopleArrows />),

    getItem(<NavLink to={`/manager/role`}>Chức vụ</NavLink>, 'role', <FaCriticalRole />)
    // quản lý người dùng
  ]),
  getItem('Người dùng', 'users', <UserOutlined />, [
    getItem(<NavLink to={`/manager/users`}>Khách hàng</NavLink>, 'customers', <FaUserFriends />),
    getItem(<NavLink to={`/manager/starts`}>Nhân viên</NavLink>, 'starts', <FaUserFriends />)
  ])
]
const menuDoctor: MenuProps['items'] = [
  getItem('Quản lý', 'manager', <AiOutlineControl />, [
    getItem(<NavLink to={`/manager/clinic`}>Phòng Khám</NavLink>, 'clinic', <BiClinic />),
    getItem(<NavLink to={`/manager/appointments`}>Cuộc hẹn</NavLink>, 'Appointments', <FaListUl />),
    getItem(<NavLink to={`/manager/specialites`}>Chuyên khoa</NavLink>, 'Specialities', <FaPeopleArrows />)
  ])
]

export const handleMenu = () => {
  const user = getAuthLocalData()

  if (!user) {
    removeAuthLocalData()
  }
  const role = user.user.roleName
  return role == 'admin' ? menuAdmin : role == 'doctor' ? menuDoctor : menuStaff
}
