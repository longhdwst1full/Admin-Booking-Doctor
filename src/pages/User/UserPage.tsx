import { Button, Drawer, Table } from 'antd'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useDeleteUserMutation, useGetAllUserQuery } from '~/store/services/Users/user.service'
import { IUsers } from '~/types/user.type'
import UserCreate from './UserCreate'

export default function UserPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IUsers>()
  const { data } = useGetAllUserQuery()
  const [deleteUser, { isLoading: isDeleteLoading }] = useDeleteUserMutation()

  // useEffect(() => {
  //   data && setDataSpecialty(data)
  // }, [data])
  const dataSource = data?.map((items: any, index: number) => {
    return {
      stt: index + 1,
      key: items.specialtyID,
      name: items.specialtyName
    }
  })
  const handleGetUser = (id: string) => {
    const user = data?.find((item) => item.id === +id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy người dùng')
  }
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
                  deleteUser(key)
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
      <Breadcrumb pageName='Người dùng' openDrawer={() => setOpenDrawer(true)} />

      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} người dùng`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <UserCreate dataUser={dataEdit} />
      </Drawer>
    </>
  )
}
