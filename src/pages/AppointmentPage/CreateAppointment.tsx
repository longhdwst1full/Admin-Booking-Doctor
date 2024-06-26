import { Button, DatePicker, Form, FormInstance, Select } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSevices } from '~/configs/useSevice'
import { IClinic } from '~/types/clinic.type'
import { IDoctor } from '~/types/doctor.type'
import { IServices } from '~/types/services.type'
import { IUsers } from '~/types/user.type'

interface Props {
  dataEdit?: any
  form: FormInstance<any>
  onFinish: (values: any) => Promise<void>
}

export default function CreateAppointment({ dataEdit, onFinish, form }: Props) {
  
  const [dataSevice, setDataService] = useState<IServices[]>()
  const [dataUser, setDataUser] = useState<IUsers[]>()
  const [dataDoctor, setDataDoctor] = useState<IDoctor[]>()
  const [clinic, setDataClinic] = useState<IClinic[]>()

  const { getCaller } = useSevices()

  useEffect(() => {
    const handelGetIdService = async () => {
      if (!dataEdit) {
        const { data } = await getCaller<IServices[]>('/Services')
        const { data: dataUser } = await getCaller<IUsers[]>('/User')
        const { data: clinics } = await getCaller<IClinic[]>('/Clinics')
        const { data: doctors } = await getCaller<IDoctor[]>('/Doctors')
        setDataService(data)
        setDataDoctor(doctors)
        setDataClinic(clinics)
        setDataUser(dataUser?.filter(item => item.roleName=="user"))
      }
    }
    handelGetIdService()
  }, [])

  useEffect(() => {
    if (dataEdit) {
      form.setFieldValue('status', dataEdit.status)
    } else {
      form.resetFields()
    }
  }, [form, dataEdit])

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
        {!dataEdit && (
          <>
            {/* user */}
            <Form.Item label='Người đặt' name='userID' rules={[{ required: true, message: 'Required!' }]}>
              <Select
                showSearch
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

            {/* date */}
            <Form.Item label='Hẹn ngày' name='appointmentDate' rules={[{ required: true, message: 'Required!' }]}>
              <DatePicker
                disabledDate={(current) =>
                  dayjs().subtract(1, 'day').isAfter(current) || dayjs().add(1, 'month').isBefore(current)
                }
              />
            </Form.Item>
          </>
        )}

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
                value: 'scheduled',
                label: 'scheduled'
              },
              {
                value: 'canceled',
                label: 'canceled'
              },
              {
                value: 'payed',
                label: 'payed'
              },
              {
                value: 'done',
                label: 'done'
              }
            ]}
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
