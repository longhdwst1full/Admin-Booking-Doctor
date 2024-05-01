import { Button, Drawer, Table } from 'antd'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useDeleteSpecialtyMutation, useGetAllSpecialtyQuery } from '~/store/services/specialty'
import SpecialtyCreate from './SpecialtyCreate'

export default function SpecialtyPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<any>()
  const { data: dataSpecialty } = useGetAllSpecialtyQuery()
  const [deleteSpecialty, { isLoading: isDeleteLoading }] = useDeleteSpecialtyMutation()

  const handleGetUser = (id: string) => {
    const user = dataSpecialty?.find((item) => item?.id == id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy phòng khám')
  }

  const dataSource = dataSpecialty?.map((items: any, index: number) => {
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
                handleGetUser(key)
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  deleteSpecialty(key)
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
      <Breadcrumb pageName='Chuyên Khoa' openDrawer={() => setOpenDrawer(true)} />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} phòng khám`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <SpecialtyCreate dataEdit={dataEdit ?? dataEdit} />
      </Drawer>
    </div>
  )
}
