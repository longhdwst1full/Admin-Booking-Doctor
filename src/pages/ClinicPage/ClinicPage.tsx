import { Button, Drawer, Form, Input, Table } from 'antd'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import TitlePage from '~/components/TitlePage'
import { useSevices } from '~/configs/useSevice'
import { useDebounce } from '~/hooks'
import { IClinic } from '~/types/clinic.type'
import ClinicCreate from './ClinicCreate'

export default function ClinicPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IClinic>()
  const [data, setData] = useState<IClinic[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()
  const [search, setSearch] = useState('')
  const [form] = Form.useForm()

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
    if (!dataEdit) {
      postCaller('/Clinics', values).then(() => {
        toast.success('Thêm phòng khám thành công!')
      })
    } else {
      putCaller(`/Clinics/${dataEdit?.clinicID}`, {
        ...values
      }).then(() => {
        toast.success('Update phòng khám thành công!')
      })
    }
    await handleGetData()
    setOpenDrawer(false)
    setDataEdit(undefined)
    form.resetFields()
    window.location.reload()
  }

  const dataSource = data?.reverse()?.map((items, index) => {
    return {
      stt: index + 1,
      key: items.clinicID,
      name: items.clinicName,
      phone: items.phone,
      address: items.address,
      appointments: items?.appointments ? items.appointments.length : 0,
      services: items.services ? items.services.length : 0
    }
  })

  const columns = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'SDT',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Số cuộc hẹn',
      dataIndex: 'appointments',
      key: 'appointments'
    },
    {
      title: 'Số Dịch vụ',
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
      if (search) {
        setData(
          data?.filter(
            (d) =>
              d.clinicName.includes(search) ||
              (d.clinicName && d.clinicName.toUpperCase().includes(search.toUpperCase()))
          )
        )
      }
    },
    [search],
    800
  )

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim())
    if (e.target.value.trim() == '') {
      handleGetData()
    }
  }
  return (
    <>
      <Breadcrumb
        pageName='Phòng khám'
        openDrawer={() => {
          setOpenDrawer(true)

          setDataEdit(undefined)
        }}
      />

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
        <ClinicCreate form={form} dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </>
  )
}
