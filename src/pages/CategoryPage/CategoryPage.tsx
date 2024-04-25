import { ColumnsType } from 'antd/es/table'
import { Button, Space, Table } from 'antd'
import { faker } from '@faker-js/faker'

import React from 'react'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'

interface CategoryDataType {
  key: React.Key
  name: string
  createdAt: string
  updatedAt: string
}

const CategoryPage = () => {
  const columns: ColumnsType<CategoryDataType> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name'
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      title: 'CreatedAt'
    },
    {
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      title: 'UpdatedAt'
    },
    {
      key: 'action',
      title: 'Action',
      render: () => (
        <Space size='middle'>
          <Button type='primary' className='bg-blue-600' size='middle'>
            Edit
          </Button>
          <Button danger type='primary'>
            Delete
          </Button>
        </Space>
      )
    }
  ]

  const data: CategoryDataType[] = Array(8)
    .fill(0)
    .map((_, index) => ({
      key: index,
      name: faker.company.name(),
      createdAt: faker.date.anytime().toString(),
      updatedAt: faker.date.anytime().toString()
    }))

  return (
    <div>
      <Breadcrumb pageName='category' />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default CategoryPage
