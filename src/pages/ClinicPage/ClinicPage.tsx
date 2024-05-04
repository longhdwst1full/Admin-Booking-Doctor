import { Button, Drawer, Table } from 'antd'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IClinic } from '~/types/clinic.type'
import ClinicCreate from './ClinicCreate'
import dayjs from 'dayjs'

export default function ClinicPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<any>()
  const [data, setData] = useState<IClinic[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()

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
    user ? setDataEdit(user) : toast.error('Không tìm thấy quyền')
    setOpenDrawer(true)
  }
  const onFinish = async (values: any) => {
    if (!dataEdit?.id) {
      await postCaller('/Clinics', values)
      toast.success('Thêm phòng khám thành công!')
    } else {
      await putCaller(`/Clinics/${dataEdit.id}`, {
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
        address: items.address,
        appointments: items?.appointments && dayjs(items.appointments[0].appointmentDate),
        services: items.services&&items.services[0].serviceName
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
              onClick={ () => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                   deleteCaller(`/IClinic/${key}`)
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

  return (
    <>
      <Breadcrumb pageName='Phòng khám' openDrawer={() => setOpenDrawer(true)} />

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
