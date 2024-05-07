import { Button, Form, FormInstance, Input, Select, TimePicker } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useSevices } from '~/configs/useSevice'
import { IDoctor } from '~/types/doctor.type'
import { ISpecialty } from '~/types/specialties.type'

interface Props {
  dataDoctor?: IDoctor
  form: FormInstance<any>
  onFinish: (values: any) => Promise<void>
}
const DoctorCreate = ({ dataDoctor, form, onFinish }: Props) => {
  const { getCaller } = useSevices()
  const [dataSpecicaly, setdataSpecicaly] = useState<ISpecialty[]>([])

  const fetch = async () => {
    const { data } = await getCaller<ISpecialty[]>('/Specialty')
    data && setdataSpecicaly(data)
  }
  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (dataDoctor) {
      const scheduleArr = dataDoctor?.schedule.split('-')

      form.setFieldValue('password', (dataDoctor as any)?.password)
      form.setFieldValue('doctorName', dataDoctor.doctorName)
      form.setFieldValue('email', dataDoctor.email)
      form.setFieldValue('schedule', [dayjs(scheduleArr[0], 'HH:mm'), dayjs(scheduleArr[1], 'HH:mm')])
      const specialty = dataSpecicaly?.find((item) => item.specialtyName == dataDoctor?.specialty)

      form.setFieldValue('specialtyID', specialty?.specialtyID)
    } else {
      form.resetFields()
    }
  }, [dataDoctor, form, dataSpecicaly])

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
        <Form.Item
          label='Tên bác sĩ'
          name='doctorName'
          rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Lịch trình' name='schedule' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
          <TimePicker.RangePicker format='HH:mm' />
        </Form.Item>
        <Form.Item
          label='Chuyên khoa'
          name='specialtyID'
          rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
        >
          <Select
            placeholder='Chọn chuyên khoa'
            options={dataSpecicaly?.map((item) => ({
              value: item.specialtyID,
              label: item.specialtyName
            }))}
          />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Trường này là bắt buộc!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)(?:\.[a-zA-Z]+)?$/,
              message: 'Email bắt buộc phải có đuôi .com.'
            }
          ]}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item
          label='Mật khẩu'
          name='password'
          rules={[
            { required: true, message: 'Trường này là bắt buộc!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=*])(?!.*\s).{8,32}$/,
              message: 'Mật khẩu từ 8 đến 32 ký tự và bao gồm số, chữ thường, chữ in hoa và ký tự đặc biệt.'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default DoctorCreate
