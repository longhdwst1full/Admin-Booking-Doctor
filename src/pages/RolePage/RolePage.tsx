import { Button, Drawer, Image, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useState } from 'react'
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
    user ? setDataEdit(user) : toast.error('Không tìm thấy người dùng')
  }

  const columns: ColumnsType<any> = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Image',
      render: (img) => <Image src={img} width={150} />
    },
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Title'
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Description'
    },
    {
      key: 'category',
      dataIndex: 'category',
      title: 'Category'
    },
    {
      key: 'numViews',
      dataIndex: 'numViews',
      title: 'Number of views'
    },

    {
      key: 'likes',
      dataIndex: 'likes',
      title: 'Likes',
      render: (_, { likes }) => <span>{likes.length}</span>
    },
    {
      key: 'dislikes',
      dataIndex: 'dislikes',
      title: 'Dislikes',
      render: (_, { dislikes }) => <span>{dislikes.length}</span>
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
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} người dùng`}
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
