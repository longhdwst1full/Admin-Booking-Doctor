import { Button, Drawer, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IAppointment } from '~/types/appointment'
import BillDetail from './BillDetail'
import TitlePage from '~/components/TitlePage'
import dayjs from 'dayjs'

export default function BillPage() {
  const [dataEdit, setDataEdit] = useState<IAppointment>()
  const [openDrawer, setOpenDrawer] = useState(false)

  const [dataAppointment, setDataAppointment] = useState<IAppointment[]>()
  
  const { getCaller } = useSevices()
  const handleGetData = async () => {
    const data = await getCaller<IAppointment[]>('/Appointments')
    if (data) {
      
      setDataAppointment(data.data.filter((item) => item.status == 'done'))
    }
  }
  const handleGetdataEdit = async (id: string) => {
    const user = await getCaller<IAppointment>('/Appointments/' + id)

    user ? setDataEdit(user.data) : toast.error('Không tìm thấy hóa đơn')
    setOpenDrawer(true)
  }

  useEffect(() => {
    handleGetData()
  }, [])

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
      key: 'appointmentDate',
      render: (data: string) => {
        return <span>{dayjs(data).format('dddd,HH:mm DD/MM/YYYY')}</span>
      }
    },

    {
      render: ({ key }: any) => {
        return (
          <div className='space-x-5'>
            <Button onClick={() => handleGetdataEdit(key)}>Chi tiết</Button>
          </div>
        )
      }
    }
  ]

  return (
    <div>
      <Breadcrumb
        pageName='Hóa đơn'
        openDrawer={() => {
          setOpenDrawer(true)
          setDataEdit(undefined)
        }}
        btnAdd={true}
      />
      <div className='flex justify-between'>
        <TitlePage title='Quản lý hóa đơn' />
      </div>
      <Table dataSource={dataSource} columns={columns} />
      {dataEdit && (
        <Drawer
          title={`Chi tiết hóa đơn`}
          placement='right'
          width={700}
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
        >
          <BillDetail dataEdit={dataEdit} />
        </Drawer>
      )}
    </div>
  )
}
