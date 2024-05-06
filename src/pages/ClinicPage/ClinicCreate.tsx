import { Button, Form, FormInstance, Input } from 'antd'
import { useEffect } from 'react'

import { IClinic } from '~/types/clinic.type'

interface Props {
  dataUser?: IClinic
  form: FormInstance<any>
  onFinish: (values: any) => Promise<void>
}

export default function ClinicCreate({ dataUser, onFinish, form }: Props) {
  useEffect(() => {
    if (dataUser && dataUser.clinicID) {
      form.setFieldValue('clinicName', dataUser.clinicName)
      form.setFieldValue('address', dataUser.address)
      form.setFieldValue('phone', dataUser.phone)
    } else {
      form.resetFields()
    }
  }, [form, dataUser])

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
          label='Tên phòng khám'
          name='clinicName'
          rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Điện thoại'
          name='phone'
          rules={[
            { required: true, message: 'Trường này là bắt buộc!' },
            {
              pattern: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              message: 'Sai định dạng Số điện thoại !'
            }
          ]}
          normalize={(value) => value.trim()}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Địa chỉ' name='address' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
          <Input />
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
