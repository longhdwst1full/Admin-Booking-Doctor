import { Button, Drawer, Form, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IAppointment } from '~/types/appointment'
import CreateAppointment from './CreateAppointment'
import dayjs from 'dayjs'
import TitlePage from '~/components/TitlePage'

export default function AppointmentPage() {
  const [dataEdit, setDataEdit] = useState<IAppointment>()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [form] = Form.useForm()
  const [dataAppointment, setDataAppointment] = useState<IAppointment[]>()

  // const [dataDoctorAppointment, setDataDoctorAppointment] = useState<IAppointment[]>()
  const { getCaller, postCaller } = useSevices()
  const handleGetData = async () => {
    const data = await getCaller<IAppointment[]>('/Appointments')
    // const dataDoctorAppointment = await getCaller<IAppointment[]>(`/Appointments/${doctorId}/selected-users`)
    if (data) {
      setDataAppointment(data.data)
      // setDataDoctorAppointment(dataDoctorAppointment.data)
    }
  }
  const handleGetdataEdit = (id: string) => {
    const user = dataAppointment?.find((item) => item.appointmentId === +id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy cuộc hẹn')
    setOpenDrawer(true)
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const onFinish = async (values: any) => {
    if (!dataEdit) {
      await postCaller('/Appointments/' + values.userID, values)
      toast.success('Thêm cuộc hẹn thành công!')
    } else {
      const dataRes = await postCaller(`/Appointments/update/${dataEdit.appointmentId}`, {
        status: values.status
      })
      console.log(dataRes)
      toast.success('Update cuộc hẹn thành công!')
    }
    await handleGetData()
    form.resetFields()
    setOpenDrawer(false)
    setDataEdit(undefined)
  }
  const dataSource = dataAppointment?.reverse()?.map((items, index: number) => {
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
      key: 'appointmentDate',
      render: (data: string) => {
        return <span>{dayjs(data).format('dddd,HH:mm DD/MM/YYYY')}</span>
      }
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
      <Breadcrumb
        pageName='Cuộc hẹn'
        openDrawer={() => {
          setOpenDrawer(true)
          setDataEdit(undefined)
        }}
      />
      <div className='flex justify-between'>
        <TitlePage title='Quản lý cuộc hẹn' />
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} cuộc hẹn`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <CreateAppointment form={form} onFinish={onFinish} dataEdit={dataEdit} />
      </Drawer>
    </div>
  )
}
