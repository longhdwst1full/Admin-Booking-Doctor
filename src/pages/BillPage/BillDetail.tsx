import { Table } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSevices } from '~/configs/useSevice'
import { IAppointment } from '~/types/appointment'
import { IClinic } from '~/types/clinic.type'
 
interface Props {
  dataEdit: IAppointment
}

export default function BillDetail({ dataEdit }: Props) {
  const { getCaller } = useSevices()
  const [dataClinic, setDataClinic] = useState<IClinic>()
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCaller<IClinic[]>('Clinics')
      res?.data && setDataClinic(res.data.find((item) => item.clinicName === dataEdit.clinicName))
    }
    fetchData()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'serviceId',
      key: 'serviceId'
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName'
    },
    {
      title: 'Giá',
      dataIndex: 'cost',
      key: 'cost',
      render: (key: number) => {
        return (
          <div className='space-x-5'>
            {key.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND'
            })}
          </div>
        )
      }
    }
  ]
  return (
    <div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Tên khách hàng :</h2>
        <p className='text-base text-black'>{dataEdit.userName}</p>
      </div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Tên bác sĩ :</h2>
        <p className='text-base text-black'>{dataEdit.doctorName}</p>
      </div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Phòng khám :</h2>
        <p className='text-base text-black'>{dataEdit.clinicName}</p>
      </div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Địa chỉ số :</h2>
        <p className='text-base text-black'>{dataClinic?.address}</p>
      </div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Trạng thái :</h2>
        <p className='text-base text-black'>{dataEdit.status}</p>
      </div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Ngày :</h2>
        <p className='text-base text-black'>{dayjs(dataEdit.appointmentDate).format('dddd,HH:mm DD/MM/YYYY')}</p>
      </div>
      <div className='flex  items-center mb-1'>
        <h2 className='text-lg font-bold mr-3 '>Tổng :</h2>
        <p className='text-base text-black'>
          {dataEdit.cost.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND'
          })}{' '}
        </p>
      </div>
      <Table className='mt-3' dataSource={dataEdit.service} columns={columns} />
    </div>
  )
}
