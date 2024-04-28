import { Button, Drawer, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import DoctorCreate from './DoctorCreate'

export default function DoctorPage() {
  const [openDrawer, setOpenDrawer] = useState(false)

  const navigate = useNavigate()
  const [dataSpecialty, setDataSpecialty] = useState([])
  const handelFetchData = async () => {
    const { data } = await axios.get('https://localhost:7212/api/Doctor')
    setDataSpecialty(data)
  }
  useEffect(() => {
    handelFetchData()
  }, [])
  const dataSource = dataSpecialty.map((items: any, index: number) => {
    return {
      stt: index + 1,
      key: items.specialtyID,
      name: items.specialtyName
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
              Edit
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  axios
                    .delete('https://localhost:7212/api/Specialty/' + key)
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
      <Breadcrumb pageName='Bác sĩ' openDrawer={() => setOpenDrawer(true)} />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${true ? 'Thêm' : 'Cập nhật'} sản phẩm`}
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
