import { Button, Drawer, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useDeleteRoleMutation, useGetAllRoleQuery } from '~/store/services/role.service'
import RoleCreate from './RoleCreate'

export default function RolePage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<any>()
  const { data: dataRoles } = useGetAllRoleQuery()
  const [deletedataRoles, { isLoading: isDeleteLoading }] = useDeleteRoleMutation()

  const handleGetdataRole = (id: string) => {
    const user = dataRoles?.find((item) => item.id === +id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy quyền')
  }

  const columns: ColumnsType<any> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Title'
    },

    {
      key: 'name',
      dataIndex: 'name',
      title: 'name'
    },

    {
      key: 'action',
      title: 'Action',
      render: ({ key }: any) => (
        <Space size='middle'>
          <Button
            type='primary'
            className='bg-blue-600'
            size='middle'
            onClick={() => {
              handleGetdataRole(key)
            }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this item?')) {
                deletedataRoles(key)
              }
            }}
          >
            Xóa
          </Button>
        </Space>
      )
    }
  ]

  return (
    <>
      <Breadcrumb pageName='Quyền hạn' openDrawer={() => setOpenDrawer(true)} />

      <Table columns={columns} dataSource={dataRoles} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} quyền`}
        placement='right'
        width={700}
        onClose={() => setOpenDrawer(!openDrawer)}
        open={openDrawer}
      >
        <RoleCreate dataEdit={dataEdit ?? dataEdit} />
      </Drawer>
    </>
  )
}
