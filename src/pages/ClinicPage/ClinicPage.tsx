import { Button, Drawer, Input, Table } from 'antd'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IClinic } from '~/types/clinic.type'
import ClinicCreate from './ClinicCreate'
import dayjs from 'dayjs'
import { useDebounce } from '~/hooks'
import TitlePage from '~/components/TitlePage'

export default function ClinicPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IClinic>()
  const [data, setData] = useState<IClinic[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()
  const [search, setSearch] = useState('')

  const handleGetData = async () => {
    const res = await getCaller<IClinic[]>('/Clinics')
    if (res) {
      setData(res.data)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const handleGetOnedata = (id: string) => {
    const user = data?.find((item) => item.clinicID === +id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy phòng khám')
    setOpenDrawer(true)
  }
  const onFinish = async (values: any) => {
    if (!dataEdit?.clinicID) {
      await postCaller('/Clinics', values)
      toast.success('Thêm phòng khám thành công!')
    } else {
      await putCaller(`/Clinics/${dataEdit.clinicID}`, {
        ...values
      })
      toast.success('Update phòng khám thành công!')
    }
    await handleGetData()
    setOpenDrawer(false)
  }

  const dataSource =
    data &&
    data?.map((items, index) => {
      return {
        stt: index + 1,
        key: items.clinicID,
        name: items.clinicName,
        phone: items.phone,
        address: items.address,
        appointments: items?.appointments && dayjs(items.appointments[0].appointmentDate),
        services: items.services && items.services[0].serviceName
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Appointments',
      dataIndex: 'appointments',
      key: 'appointments'
    },
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services'
    },

    {
      render: ({ key }: any) => {
        return (
          <div className='space-x-5'>
            <Button
              onClick={() => {
                handleGetOnedata(key)
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  deleteCaller(`/Clinics/${key}`)
                    .then(async () => {
                      toast.success('Deleted successfully')
                      await handleGetData()
                    })
                    .catch((error) => toast.error(error))
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
      if (data) {
        setData(
          data.filter(
            (d) =>
              d.clinicName.includes(search) ||
              (d.clinicName && d.clinicName.toUpperCase().includes(search.toUpperCase()))
          )
        )
      }
    },
    [],
    800
  )

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim())
  }

  return (
    <>
      <Breadcrumb pageName='Phòng khám' openDrawer={() => setOpenDrawer(true)} />

      <div className='flex justify-between'>
        <TitlePage title='Quản lý phòng khám' />
      </div>

      <div className='my-2 flex'>
        <Input
          className='ml-3'
          value={search}
          onChange={onChangeSearchName}
          placeholder='Tìm phòng khám'
          style={{ width: 200 }}
        />
      </div>

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} phòng khám`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <ClinicCreate dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </>
  )
}
