import { Button, Drawer, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import DoctorCreate from './DoctorCreate'
import { useDeleteDoctorMutation, useGetAllDoctorsQuery } from '~/store/services/docter'

export default function DoctorPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataSpecialty, setdataSpecialty] = useState([])
  const navigate = useNavigate()
  const fetch = async () => {
    const { data } = await axios.get('http://localhost:7212/api/Doctors')
    setdataSpecialty(data)
  }
  useEffect(() => {
    fetch()
  }, [])
  const [deleteDoctor] = useDeleteDoctorMutation()

  const dataSource = dataSpecialty?.map((items: any, index: number) => {
    return {
      stt: index + 1,
      key: items.id,
      name: items.doctorName
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
      render: ({ key }: any) => {
        return (
          <div className='space-x-5'>
            <Button
              onClick={() => {
                navigate('/manager/specialty/create?id=' + key)
              }}
            >
              Sửa
            </Button>
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
        <DoctorCreate />
      </Drawer>
    </div>
  )
}
