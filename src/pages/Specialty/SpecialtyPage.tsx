import { Button, Drawer, Input, Table } from 'antd'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { ISpecialty } from '~/types/specialties.type'
import SpecialtyCreate from './SpecialtyCreate'
import { useDebounce } from '~/hooks'
import TitlePage from '~/components/TitlePage'

export default function SpecialtyPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [dataEdit, setDataEdit] = useState<ISpecialty>()
  const [dataSpecialty, setDataSpecialty] = useState<ISpecialty[]>()
  const { deleteCaller, getCaller, postCaller, putCaller } = useSevices()

  const handleGetData = async () => {
    const data = await getCaller<ISpecialty[]>('/Specialty')
    if (data) {
      setDataSpecialty(data.data)
    }
  }

  useEffect(() => {
    handleGetData()
  }, [])

  const handleGetUser = (id: string) => {
    const user = dataSpecialty?.find((item) => item?.specialtyID == id)
    console.log(id, user)
    if (user) {
      setDataEdit(user)
      setOpenDrawer(true)
    } else {
      toast.error('Không tìm thấy phòng khám')
    }
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
    setOpenDrawer(false)
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
                console.log(key)
                handleGetUser(key)
              }}
            >
              Edit
            </Button>
            <Button
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  await deleteCaller(`Specialty/${key}`)
                  await handleGetData()
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

  const [serviceName, setserviceName] = useState('')

  useDebounce(
    () => {
      if (dataSpecialty) {
        setDataSpecialty(
          dataSpecialty.filter(
            (d) =>
              d.specialtyName.includes(serviceName) ||
              (d.specialtyName && d.specialtyName.toUpperCase().includes(serviceName.toUpperCase()))
          )
        )
      }
    },
    [],
    800
  )

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setserviceName(e.target.value.trim())
  }

  return (
    <div>
      <Breadcrumb pageName='Chuyên Khoa' openDrawer={() => setOpenDrawer(true)} />

      <div className='flex justify-between'>
        <TitlePage title='Quản lý chuyên khoa' />
      </div>

      <div className='my-2 flex'>
        <Input
          className='ml-3'
          value={serviceName}
          onChange={onChangeSearchName}
          placeholder='Tìm chuyên khoa'
          style={{ width: 200 }}
        />
      </div>
      <Table dataSource={dataSource} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} Chuyên khoa`}
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
