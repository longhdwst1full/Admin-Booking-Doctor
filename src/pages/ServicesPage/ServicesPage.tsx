import { Button, Drawer, Input, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import TitlePage from '~/components/TitlePage'
import { useDebounce } from '~/hooks'
import { IServices } from '~/types/services.type'
import CreateServices from './CreateServices'

export default function ServicesPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const URL = import.meta.env.VITE_API
  const [dataEdit, setDataEdit] = useState<IServices>()
  const [serviceName, setserviceName] = useState('')
  const [dataSpecialty, setDataSpecialty] = useState<IServices[]>([])

  const handelFetchData = async () => {
    const { data } = await axios.get(URL + '/Services')
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

  const dataSource = dataSpecialty?.reverse()?.map((items, index) => ({
    stt: index + 1,
    key: items.serviceId,
    name: items.serviceName,
    description: items.description,
    cost: items.cost
  }))

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
                    .delete(URL + '/Services/' + key)
                    .then(async () => {
                      await handelFetchData()
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
  useDebounce(
    () => {
      if (serviceName) {
        setDataSpecialty(
          dataSpecialty?.filter(
            (d) =>
              d.serviceName.includes(serviceName) ||
              (d.serviceName && d.serviceName.toUpperCase().includes(serviceName.toUpperCase()))
          )
        )
        console.log(3)
      }
      console.log(1)
    },
    [serviceName],
    800
  )

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    const value = e.target.value.trim()
    setserviceName(value)
    if (value == '') {
      handelFetchData()
    }
  }

  return (
    <div>
      <Breadcrumb
        pageName='Dịch vụ'
        openDrawer={() => {
          setOpenDrawer(true)
          setDataEdit(undefined)
        }}
      />

      <div className='flex justify-between'>
        <TitlePage title='Quản lý dịch vụ' />
      </div>

      <div className='my-2 flex'>
        <Input
          className='ml-3'
          value={serviceName}
          onChange={onChangeSearchName}
          placeholder='Tìm dịch vụ'
          style={{ width: 200 }}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} dịch vụ`}
        placement='right'
        width={700}
        onClose={() => {
          setOpenDrawer(!openDrawer)
          setDataEdit(undefined)
        }}
        open={openDrawer}
      >
        <CreateServices dataEdit={dataEdit} />
      </Drawer>
    </div>
  )
}
