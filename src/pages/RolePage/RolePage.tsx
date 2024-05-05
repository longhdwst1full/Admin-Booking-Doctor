import { Button, Drawer, Form, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IRole } from '~/types/user.type'
import RoleCreate from './RoleCreate'

export default function RolePage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<IRole>()
  const [dataRoles, setDataRoles] = useState<IRole[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()
  const [form] = Form.useForm()

  const handleGetData = async () => {
    const data = await getCaller<IRole[]>('/Role')
    if (data) {
      setDataRoles(data.data)
    }
  }

  useEffect(() => {
    handleGetData()
    setDataEdit(undefined)
  }, [])

  const handleGetdataRole = (id: string) => {
    const user = dataRoles?.find((item) => item.id === +id)
    if (user) {
      setDataEdit(user)
      setOpenDrawer(true)
    } else {
      toast.error('Không tìm thấy chức vụ')
    }
  }
  const onFinish = async (values: any) => {
    if (!dataEdit?.id) {
      await postCaller('/Role', values)
      toast.success('Thêm chức vụ thành công!')
    } else {
      await putCaller(`/Role/${dataEdit.id}`, {
        ...values
      })
      toast.success('Update chức vụ thành công!')
    }
    await handleGetData()
    setOpenDrawer(false)
    setDataEdit(undefined)
    form.resetFields()
  }

  const columns: ColumnsType<any> = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'id'
    },

    {
      key: 'name',
      dataIndex: 'name',
      title: 'name'
    },

    {
      key: 'action',
      title: 'Action',
      render: (data: any) => {
        return (
          <Space size='middle'>
            <Button
              type='primary'
              className='bg-blue-600'
              size='middle'
              onClick={() => {
                handleGetdataRole(data.id)
              }}
            >
              Sửa
            </Button>
            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  deleteCaller(`/Role/${data.id}`)
                    .then(async () => {
                      toast.success('Deleted successfully')
                      await handleGetData()
                    })
                    .catch((error) => toast.error(error))
                }
              }}
            >
              Xóa
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <>
      <Breadcrumb
        pageName='Chức vụ'
        openDrawer={() => {
          setOpenDrawer(true)
          setDataEdit(undefined)
        }}
      />

      <Table columns={columns} dataSource={dataRoles} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} chức vụ`}
        placement='right'
        width={700}
        onClose={() => {
          setOpenDrawer(!openDrawer)
          setDataEdit(undefined)
        }}
        open={openDrawer}
      >
        <RoleCreate dataEdit={dataEdit ?? dataEdit} onFinish={onFinish} form={form}/>
      </Drawer>
    </>
  )
}
