import { DeleteOutlined } from '@ant-design/icons'
import { faker } from '@faker-js/faker'
import { Button, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import React from 'react'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'

const orderStatus = ['Not processed', 'Cash on delivery', 'Processing', 'Dispatched', 'Cancelled', 'Delivered']

interface OrderDataType {
  key: React.Key
  orderBy: string
  orderStatus: string
  paymentMethod: string
  cost: number
  currency: string
}

const OrderPage = () => {
  const columns: ColumnsType<OrderDataType> = [
    {
      key: 'orderBy',
      dataIndex: 'orderBy',
      title: 'Order By'
    },
    {
      key: 'orderStatus',
      dataIndex: 'orderStatus',
      title: 'Order Status'
    },
    {
      key: 'paymentMethod',
      dataIndex: 'paymentMethod',
      title: 'Payment Method'
    },
    {
      key: 'cost',
      dataIndex: 'cost',
      title: 'Cost'
    },

    {
      key: 'currency',
      dataIndex: 'currency',
      title: 'Currency'
    },
    {
      key: 'action',
      title: 'Action',
      render: () => (
        <Space size='middle'>
          <Button type='primary' className='bg-blue-600' size='middle'>
            Detail
          </Button>
          <Button danger type='primary' className='flex justify-center items-center'>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ]

  const data: OrderDataType[] = Array(15)
    .fill(0)
    .map((_, index) => ({
      key: index,
      orderBy: faker.database.mongodbObjectId(),
      cost: Number(faker.commerce.price()),
      currency: faker.finance.currencyName(),
      orderStatus: orderStatus[faker.number.int(5)],
      paymentMethod: 'COD'
    }))

  return (
    <div>
      <Breadcrumb pageName='order' />
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default OrderPage
