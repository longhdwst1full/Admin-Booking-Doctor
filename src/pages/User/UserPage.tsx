import { Button, Drawer, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'

import { IRole, IUsers } from '~/types/user.type'
import UserCreate from './UserCreate'
import { useSevices } from '~/configs/useSevice'

export default function UserPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IUsers>()
  const [dataRoles, setDataRoles] = useState<IUsers[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()

  const handleGetData = async () => {
    const data = await getCaller<IUsers[]>('/User')
    if (data) {
      setDataRoles(data.data)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])
  const onFinish = async (values: any) => {
    if (!dataEdit?.id) {
      await postCaller('User', values)
      toast.success('Thêm người dùng thành công!')
    } else {
      await putCaller(`User/${dataEdit.id}`, {
        userName: values.userName,
        email: values.email,
        phone: values.phone
      })
      if (dataEdit.roleName !== values.roleName) {
        await postCaller(`User/update/role-user/${dataEdit.id}`, {
          userId: 0
        })
      }
      if (values.passWord) {
        await postCaller(`User/update/passWord/${dataEdit.id}`, {
          passWord: values.passWord
        })
      }
      toast.success('Update người dùng thành công!')
    }
  }
  const dataSource = dataRoles?.map((items, index) => {
    return {
      stt: index + 1,
      key: items.id,
      name: items.userName,
      avatar: items.avatar,
      email: items.email,
      address: items.address,
      phone: items.phone,
      roleName: items.roleName
    }
  })
  const handleGetUser = (id: string) => {
    const user = dataRoles?.find((item) => item.id == id)
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
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'RoleName',
      dataIndex: 'roleName',
      key: 'roleName'
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
                  deleteCaller(`/User/${key}`)
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
        <UserCreate dataUser={dataEdit} onFinish={onFinish} />
      </Drawer>
    </>
  )
}
