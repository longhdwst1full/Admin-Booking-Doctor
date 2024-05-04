import { Button, Drawer, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IAppointment } from '~/types/appointment'
import CreateAppointment from './CreateAppointment'

export default function AppointmentPage() {
  const [dataEdit, setDataEdit] = useState<IAppointment>()
  const [openDrawer, setOpenDrawer] = useState(false)

  const [dataAppointment, setDataAppointment] = useState<IAppointment[]>()
  const [dataUserBooking, setDataUserBooking] = useState<IAppointment[]>()
  const [dataDoctorAppointment, setDataDoctorAppointment] = useState<IAppointment[]>()
  const { getCaller, postCaller } = useSevices()

  const handleGetData = async (userId?: string, doctorId?: string) => {
    const data = await getCaller<IAppointment[]>('/Appointments')
    const dataUserBooking = await getCaller<IAppointment[]>(`/Appointments/${userId}/bookings`)
    const dataDoctorAppointment = await getCaller<IAppointment[]>(`/Appointments/${doctorId}/selected-users`)
    if (data || dataUserBooking || dataDoctorAppointment) {
      setDataAppointment(data.data)
      setDataDoctorAppointment(dataDoctorAppointment.data)
      setDataUserBooking(dataUserBooking.data)
    }
  }
  const handleGetdataEdit = (id: string) => {
    const user = dataAppointment?.find((item) => item.appointmentId === +id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy quyền')
  }
  useEffect(() => {
    handleGetData()
  }, [])

  const onFinish = async (values: any) => {
    if (!dataEdit?.appointmentId) {
      await postCaller('/Appointments', values)
      toast.success('Thêm cuộc hẹn thành công!')
    } else {
      await postCaller(`/Appointments/update/${dataEdit.appointmentId}`, {
        status: values.status
      })
      toast.success('Update cuộc hẹn thành công!')
    }
    await handleGetData()
  }
  const dataSource = dataAppointment?.map((items, index: number) => {
    return {
      stt: index + 1,
      key: items.appointmentId,
      userName: items.userName,
      doctorName: items.doctorName,
      appointmentDate: items.appointmentDate,
      clinicName: items.clinicName,
      status: items.status,
      service: items.service,
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
      title: 'Bác sĩ',
      dataIndex: 'doctorName',
      key: 'doctorName'
    },
    {
      title: 'Khách hàng',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: 'Phòng khám',
      dataIndex: 'clinicName',
      key: 'clinicName'
    },
    {
      title: 'Ngày',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate'
    },
    {
      title: 'Giá',
      dataIndex: 'cost',
      key: 'cost'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service'
    },
    {
      render: ({ key }: any) => {
        return (
          <div className='space-x-5'>
            <Button
              onClick={() => {
                handleGetdataEdit(key)
              }}
            >
              Edit
            </Button>
            {/* <Button
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
            </Button> */}
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Breadcrumb pageName='Cuộc hẹn' openDrawer={() => setOpenDrawer(true)} />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${true ? 'Thêm' : 'Cập nhật'} cuộc hẹn`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <CreateAppointment onFinish={onFinish} dataEdit={dataEdit} />
      </Drawer>
    </div>
  )
}
