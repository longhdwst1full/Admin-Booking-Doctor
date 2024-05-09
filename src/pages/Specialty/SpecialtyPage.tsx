import { Button, Drawer, Form, Input, Table } from 'antd'
import { useEffect, useMemo, useState } from 'react'
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
  const [form] = Form.useForm()
  const [serviceName, setserviceName] = useState('')

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
      specialtyName: values.specialtyName
    }
    if (!dataEdit?.specialtyID) {
      await postCaller('Specialty', dataBody).then(() => {
        toast.success('Thêm thành công')
      })
    } else {
      await putCaller(`Specialty/${dataEdit.specialtyID}`, { ...dataBody }).then(() => {
        toast.success('Update success')
      })
    }
    await handleGetData()
    setOpenDrawer(false)
    setDataEdit(undefined)
    form.resetFields()
  }

  const dataSource = useMemo(
    () =>
      dataSpecialty?.reverse()?.map((items, index) => {
        return {
          stt: index + 1,
          key: items.specialtyID,
          name: items.specialtyName
        }
      }),
    [dataSpecialty]
  )

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

  useDebounce(
    () => {
      if (serviceName) {
        const res = dataSpecialty?.filter(
          (d) =>
            d.specialtyName.includes(serviceName) ||
            (d.specialtyName && d.specialtyName.toUpperCase().includes(serviceName.toUpperCase()))
        )

        setDataSpecialty(res)
      }
    },
    [serviceName],
    800
  )

  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setserviceName(e.target.value.trim())
    if (e.target.value.trim() == '') {
      handleGetData()
    }
  }

  return (
    <div>
      <Breadcrumb
        pageName='Chuyên Khoa'
        openDrawer={() => {
          setOpenDrawer(true)
          setDataEdit(undefined)
        }}
      />

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
        <SpecialtyCreate form={form} dataEdit={dataEdit ?? dataEdit} onFinish={onFinish} />
      </Drawer>
    </div>
  )
}
