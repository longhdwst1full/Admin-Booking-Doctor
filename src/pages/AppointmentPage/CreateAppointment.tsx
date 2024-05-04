import { Button, DatePicker, Form, Input, Select } from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { IClinic } from '~/types/clinic.type'
import { IDoctor } from '~/types/doctor.type'
import { IServices } from '~/types/services.type'
import { IUsers } from '~/types/user.type'

interface Props {
  dataEdit?: any
  onFinish: (values: any) => Promise<void>
}

export default function CreateAppointment({ dataEdit, onFinish }: Props) {
  const [form] = Form.useForm()
  const [dataSevice, setDataService] = useState<IServices[]>()
  const [dataUser, setDataUser] = useState<IUsers[]>()
  const [dataDoctor, setDataDoctor] = useState<IDoctor[]>()
  const [clinic, setDataClinic] = useState<IClinic[]>()
  const [disabledDate, setDataDisabled] = useState<boolean>(false)
  useEffect(() => {
    const handelGetIdService = async () => {
      const { data } = await axios.get('http://localhost:7212/api/Services')
      const { data: dataUser } = await axios.get('http://localhost:7212/api/User')
      const { data: clinics } = await axios.get('http://localhost:7212/api/Clinics')
      const { data: doctors } = await axios.get('http://localhost:7212/api/Doctors')
      console.log(data, 'pl')
      setDataService(data)
      setDataDoctor(doctors)
      setDataUser(dataUser)
      setDataClinic(clinics)
    }
    handelGetIdService()
  }, [])

  useEffect(() => {
    if (dataEdit) {
      form.setFieldValue('userID', dataEdit.userID)
      form.setFieldValue('doctorID', dataEdit.doctorID)
      form.setFieldValue('clinicID', dataEdit.clinicID)
      form.setFieldValue('appointmentDate', dataEdit.appointmentDate)
      form.setFieldValue('serviceIDs', dataEdit.serviceIDs)
      form.setFieldValue('status', dataEdit.status)
      setDataDisabled(true)
    }
  }, [form, dataSevice])

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        {/* user */}
        <Form.Item label='Người đặt' name='userID' rules={[{ required: true, message: 'Required!' }]}>
          <Select
            showSearch
            disabled={disabledDate}
            style={{ width: 200 }}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={dataUser?.map((item) => ({
              value: item.id,
              label: item.userName
            }))}
          />
        </Form.Item>
        {/* doctorId */}
        <Form.Item label='Bác sĩ' name='doctorID' rules={[{ required: true, message: 'Required!' }]}>
          <Select
            showSearch
            disabled={disabledDate}
            style={{ width: 200 }}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={dataDoctor?.map((item) => ({
              value: item.id,
              label: item.doctorName
            }))}
          />
        </Form.Item>
        {/*clinicID  */}
        <Form.Item label='Phòng khám' name='clinicID' rules={[{ required: true, message: 'Required!' }]}>
          <Select
            showSearch
            disabled={disabledDate}
            style={{ width: 200 }}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={clinic?.map((item) => ({
              value: item.clinicID,
              label: item.clinicName
            }))}
          />
        </Form.Item>
        {/* serviceIDs */}
        <Form.Item label='Dịch vụ' name='serviceIDs' rules={[{ required: true, message: 'Required!' }]}>
          <Select
            mode='multiple'
            showSearch
            disabled={disabledDate}
            style={{ width: 200 }}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={dataSevice?.map((item) => ({
              value: `${item.serviceId}`,
              label: item.serviceName
            }))}
          />
        </Form.Item>
        {/* status */}
        <Form.Item label='Trạng thái' name='status' rules={[{ required: true, message: 'Required!' }]}>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder='Search to Select'
            optionFilterProp='children'
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '0',
                label: '0'
              }
            ]}
          />
        </Form.Item>
        {/* date */}
        <Form.Item label='Hẹn ngày' name='appointmentDate' rules={[{ required: true, message: 'Required!' }]}>
          <DatePicker
            disabled={disabledDate}
            disabledDate={(current) =>
              dayjs().subtract(1, 'day').isAfter(current) || dayjs().add(1, 'month').isBefore(current)
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
