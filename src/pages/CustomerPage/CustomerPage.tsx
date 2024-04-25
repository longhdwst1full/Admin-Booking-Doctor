import React from 'react'
import { ColumnsType } from 'antd/es/table'
import { Button, Space, Table, Tag } from 'antd'
import { faker } from '@faker-js/faker'

import { DeleteOutlined } from '@ant-design/icons'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'

interface CustomerDataType {
  key: React.Key
  firstName: string
  lastName: string
  email: string
  mobile: string
  role: string
  isActive: boolean
  address: string
}

const CustomerPage = () => {
  const columns: ColumnsType<CustomerDataType> = [
    {
      key: 'firstName',
      dataIndex: 'firstName',
      title: 'First Name'
    },
    {
      key: 'lastName',
      dataIndex: 'lastName',
      title: 'Last Name'
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email'
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: 'Mobile'
    },
    {
      key: 'role',
      dataIndex: 'role',
      title: 'Role'
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      render: (_, { isActive }) => (isActive ? <Tag color='blue'>Active</Tag> : <Tag color='red'>Disabled</Tag>)
    },
    {
      key: 'action',
      title: 'Action',
      render: (_, { isActive }) => (
        <Space size='middle'>
          <Button type='primary' danger={isActive} className={`bg-blue-600 w-[100px]`} size='middle'>
            {isActive ? 'Disable' : 'Active'}
          </Button>
          <Button danger type='primary' className='flex items-center justify-center'>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ]

  const data: CustomerDataType[] = Array(25)
    .fill(0)
    .map((_, index) => ({
      key: index,
      email: faker.internet.email(),
      isActive: faker.datatype.boolean(),
      address: faker.location.streetAddress(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: 'client',
      mobile: faker.phone.number()
    }))

  return (
    <div>
      <Breadcrumb pageName='custom' />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default CustomerPage
