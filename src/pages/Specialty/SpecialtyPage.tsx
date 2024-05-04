import { Button, Drawer, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { ISpecialty } from '~/types/specialties.type'
import SpecialtyCreate from './SpecialtyCreate'

export default function SpecialtyPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<ISpecialty>()
  const [dataSpecialty, setDataSpecialty] = useState<ISpecialty[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()

  const handleGetData = async () => {
    const data = await getCaller<ISpecialty[]>('/Role')
    if (data) {
      setDataSpecialty(data.data)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const handleGetUser = (id: string) => {
    const user = dataSpecialty?.find((item) => item?.specialtyID == id)
    user ? setDataEdit(user) : toast.error('Không tìm thấy phòng khám')
  }
  const onFinish = async (values: any) => {
    var dataBody = {
      specialtyName: values.username
    }
    if (!dataEdit?.specialtyID) {
      await postCaller('Specialty', dataBody)
    } else {
      putCaller(`Specialty/${dataEdit.specialtyID}`, { ...dataBody })
        .then(() => {
          toast.success('Update success')
        })
        .catch((e) => toast.error(e))
    }
    await handleGetData()
  }

  const dataSource = dataSpecialty?.map((items, index) => {
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
                  deleteCaller(key)
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
        <SpecialtyCreate dataEdit={dataEdit ?? dataEdit} onFinish={onFinish} />
      </Drawer>
    </div>
  )
}
