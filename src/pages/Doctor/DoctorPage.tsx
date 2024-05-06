import { Button, Drawer, Form, Input, Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Breadcrumb from '~/components/Breadcrumb/Breadcrumb'
import { useSevices } from '~/configs/useSevice'
import { IDoctor } from '~/types/doctor.type'
import DoctorCreate from './DoctorCreate'
import TitlePage from '~/components/TitlePage'
import { useDebounce } from '~/hooks'

export default function DoctorPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [search, setSearch] = useState('')
  const [dataDoctor, setdataDoctor] = useState<IDoctor[]>([])
  const [dataEdit, setdataEdit] = useState<IDoctor>()
  const [form] = Form.useForm()

  const { postCaller, deleteCaller, putCaller, getCaller } = useSevices()

  const fetch = async () => {
    const { data } = await getCaller<IDoctor[]>('/Doctors')
    setdataDoctor(data)
  }

  useEffect(() => {
    fetch()
  }, [])
  
  const handleGetdataRole = (id: string) => {
    const user = dataDoctor?.find((item) => item.id === +id)
    user ? setdataEdit(user) : toast.error('Không tìm thấy bác sĩ')
    setOpenDrawer(true)
  }

  const onFinish = async (values: any) => {
    const changeTimeOrder = `${dayjs(values.schedule[0]).format('HH:mm')}-${dayjs(values.schedule[1]).format('HH:mm')}`
    if (!dataEdit?.id) {
      await postCaller('Doctors', {
        ...values,
        schedule: changeTimeOrder
      }).then((data) => {
        data && toast.success('Thêm thành công')
      })
    } else {
      if (changeTimeOrder != dataEdit?.schedule) {
        await putCaller('Doctors/update/Schedule/' + dataEdit.id, {
          schedule: changeTimeOrder
        })
      }
      await putCaller('Doctors/' + dataEdit.id, {
        ...values,
        schedule: changeTimeOrder
      }).then((data) => {
        data && toast.success('Cập nhật thành công')
      })
    }

    setOpenDrawer(false)
    await fetch()
    form.resetFields()
    setdataEdit(undefined)
  }

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim())
    if (e.target.value.trim() == '') {
      fetch()
    }
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Tên',
      dataIndex: 'doctorName',
      key: 'doctorName'
    },
    {
      title: 'Chuyên khoa',
      dataIndex: 'specialty',
      key: 'specialty'
    },

    {
      render: ({ id }: any) => {
        return (
          <div className='space-x-5'>
            <Button onClick={() => handleGetdataRole(id)}>Sửa</Button>
            <Button
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this item?')) {
                  await deleteCaller('/Doctors/' + id)
                  await fetch()
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
 
  useDebounce(
    () => {
      if (search) {
        setdataDoctor(
          dataDoctor?.filter(
            (d) =>
              d.doctorName.includes(search) ||
              (d.doctorName && d.doctorName.toUpperCase().includes(search.toUpperCase()))
          )
        )
      }
    },
    [search, dataDoctor],
    800
  )
 
  return (
    <div>
      <Breadcrumb
        pageName='Bác sĩ'
        openDrawer={() => {
          setOpenDrawer(true)
          setdataEdit(undefined)
        }}
      />
      <div className='flex justify-between'>
        <TitlePage title='Quản lý Bác sĩ' />
      </div>

      <div className='my-2 flex'>
        <Input
          className='ml-3'
          value={search}
          onChange={onChangeSearchName}
          placeholder='Tìm Bác sĩ'
          style={{ width: 200 }}
        />
      </div>

      <Table dataSource={dataDoctor} columns={columns} />
      <Drawer
        title={`${!dataEdit ? 'Thêm' : 'Cập nhật'} Bác sĩ`}
        placement='right'
        width={700}
        onClose={() => {
          setdataEdit(undefined)
          setOpenDrawer(!openDrawer)
        }}
        open={openDrawer}
      >
        <DoctorCreate form={form} dataDoctor={dataEdit ?? dataEdit} onFinish={onFinish} />
      </Drawer>
    </div>
  )
}
