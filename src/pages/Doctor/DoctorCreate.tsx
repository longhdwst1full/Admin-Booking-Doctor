import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useSevices } from '~/configs/useSevice'
import { IDoctor } from '~/types/doctor.type'
import { ISpecialty } from '~/types/specialties.type'

interface Props {
  dataDoctor?: IDoctor
  onFinish: (values: any) => Promise<void>
}
const DoctorCreate = ({ dataDoctor, onFinish }: Props) => {
  const [form] = Form.useForm()
  const { getCaller } = useSevices()
  const [dataSpecicaly, setdataSpecicaly] = useState<ISpecialty[]>([])

  const fetch = async () => {
    const { data } = await getCaller<ISpecialty[]>('Specialty')
    data && setdataSpecicaly(data)
  }
  useEffect(() => {
    fetch()
  }, [])
  useEffect(() => {
    if (dataDoctor && dataDoctor.id) {
      form.setFieldValue('password', (dataDoctor as any)?.password)
      form.setFieldValue('doctorName', dataDoctor.doctorName)
      form.setFieldValue('email', dataDoctor.email)
      form.setFieldValue('specialtyID', dataDoctor.specialty)
    }
  }, [dataDoctor, form])

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
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
          <Input type='email' />
        </Form.Item>

        <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
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
