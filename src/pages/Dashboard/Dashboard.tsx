import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TitlePage from '~/components/TitlePage'
import { getAuthLocalData } from '~/configs/token'
import { useSevices } from '~/configs/useSevice'
import { IAppointment } from '~/types/appointment'
import { IClinic } from '~/types/clinic.type'
import { IDoctor } from '~/types/doctor.type'
import { IServices } from '~/types/services.type'
import { IUsers } from '~/types/user.type'

export default function Dashboard() {
  const authData = getAuthLocalData()
  const { getCaller } = useSevices()
  const [dataSevice, setDataService] = useState<IServices[]>()
  const [dataAppointment, setDataAppoiment] = useState<IAppointment[]>()
  const [dataUser, setDataUser] = useState<IUsers[]>()
  const [dataDoctor, setDataDoctor] = useState<IDoctor[]>()
  const [clinic, setDataClinic] = useState<IClinic[]>()
  console.log(dataSevice, dataDoctor)
  useEffect(() => {
    const handelGetIdService = async () => {
      const { data } = await getCaller<IServices[]>('Services')
      const { data: dataAppoinments } = await getCaller<IAppointment[]>('/Appointments' + authData?.user.userId)
      const { data: dataUser } = await getCaller<IUsers[]>('/User')
      const { data: clinics } = await getCaller<IClinic[]>('/Clinics')
      const { data: doctors } = await getCaller<IDoctor[]>('/Doctors')
      console.log(data, clinics, 'pl')
      setDataService(data)
      setDataDoctor(doctors)
      setDataUser(dataUser)
      setDataClinic(clinics)
      setDataAppoiment(dataAppoinments)
      console.log(data)
    }
    handelGetIdService()
  }, [])

  const analytics = [
    {
      name: 'Bác sĩ',
      total: dataDoctor?.length || 99
    },
    {
      name: 'Phòng khám',
      total: clinic?.length || 99
    },
    {
      name: 'Cuộc hẹn',
      total: dataAppointment?.length || 99
    },
    {
      name: 'Khách hàng',
      total: dataUser?.length || 99
    },
    { name: 'Dịch vụ', total: dataSevice?.length || 99 }
  ]
  console.log(analytics)
  return (
    <>
      <div className='w-full px-10 lg:pr-28'>
        {/* <!-- Page content here --> */}
        <h2 className='text-4xl font-bold text-center my-10'>Welcome to your Dashboard</h2>
      </div>

      <TitlePage title='Thống kê' />
      <div className='grid grid-cols-3'>
        {analytics.map((item) => (
          <Link to='#'>
            <div className='bg-yellow-500 rounded-lg pt-4 mb-6 block border w-[300px] h-[150px]'>
              <div className='block  px-6'>
                {<div className='text-5xl font-semibold pb-[22px]'>{item.total}</div>}
                <div className=' font-medium text-2xl mb-6'>{item.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
