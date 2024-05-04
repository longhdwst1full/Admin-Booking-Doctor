import { Button, Drawer, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import CreateServices from './CreateServices'
import { IServices } from '~/types/services.type'
import toast from 'react-hot-toast'

export default function ServicesPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IServices>()

  const [dataSpecialty, setDataSpecialty] = useState<IServices[]>([])
  const handelFetchData = async () => {
    const { data } = await axios.get('http://localhost:7212/api/Services')
    setDataSpecialty(data)
  }
  useEffect(() => {
    handelFetchData()
  }, [])

  const handleGetUser = (id: string) => {
    const user = dataSpecialty?.find((item) => item?.serviceId == id)
    console.log(id, user)
    if (user) {
      setDataEdit(user)
      setOpenDrawer(true)
    } else {
      toast.error('Không tìm thấy dịch vụ')
    }
  }

  const dataSource = dataSpecialty.map((items: any, index: number) => {
    return {
      stt: index + 1,
      key: items.serviceId,
      name: items.serviceName,
      description: items.description,
      cost: items.cost
    }
  })
  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'cost',
      dataIndex: 'cost',
      key: 'cost'
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      render: ({ key }: any) => {
        return (
          <div className='space-x-5'>
            <Button
              onClick={() => {
                handleGetUser(key)
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  axios
                    .delete('http://localhost:7212/api/Services/' + key)
                    .then(() => {
                      handelFetchData()
                    })
                    .catch((error) => console.log(error))
                }
              }}
            >
              Delete
            </Button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Breadcrumb pageName='Dịch vụ' openDrawer={() => setOpenDrawer(true)} />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${true ? 'Thêm' : 'Cập nhật'} sản phẩm`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <CreateServices dataEdit={dataEdit} />
      </Drawer>
    </div>
  )
}
