import { Button, Drawer, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import DoctorCreate from './DoctorCreate'
import { useSevices } from '~/configs/useSevice'
import { IDoctor } from '~/types/doctor.type'
import toast from 'react-hot-toast'

export default function DoctorPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataDoctor, setdataDoctor] = useState<IDoctor[]>([])
  const [dataEdit, setdataEdit] = useState<IDoctor>()

  const {   postCaller, putCaller } = useSevices()

  const fetch = async () => {
    const { data } = await axios.get('http://localhost:7212/api/Doctors')
    setdataDoctor(data)
  }
  useEffect(() => {
    fetch()
  }, [])
  const handleGetdataRole = (id: string) => {
    const user = dataDoctor?.find((item) => item.id === +id)
    user ? setdataEdit(user) : toast.error('Không tìm thấy bác sĩ')
  }

  const onFinish = async (values: any) => {
    if (!dataEdit?.id) {
      await postCaller('Doctors', values)
    } else {
      await putCaller('Doctors', { ...values, id: dataEdit?.id })
    }
  }

  const dataSource = dataDoctor?.map((items, index) => {
    return {
      stt: index + 1,
      key: items.id,
      name: items.doctorName,
      specialty: items.specialty
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
      title: 'Specialty',
      dataIndex: 'specialty',
      key: 'specialty'
    },

    {
      render: ({ key }: any) => {
        return (
          <div className='space-x-5'>
            <Button onClick={() => handleGetdataRole(key)}>Sửa</Button>
            <Button
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  await axios.delete('http://localhost:7212/api/Doctors/' + key)
                  fetch()
                }
              }}
            >
              Xóa
            </Button>
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <Breadcrumb pageName='Bác sĩ' openDrawer={() => setOpenDrawer(true)} />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${true ? 'Thêm' : 'Cập nhật'} Bác sĩ`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <DoctorCreate dataDoctor={dataEdit ?? dataEdit} onFinish={onFinish} />
      </Drawer>
    </div>
  )
}
