import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IServices } from '~/types/services.type'

interface Props {
  dataEdit?: IServices
}

export default function CreateServices({ dataEdit }: Props) {
  const [form] = Form.useForm()
  const URL = import.meta.env.VITE_API

  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue({
        username: dataEdit?.serviceName,
        password: dataEdit?.cost,
        description: dataEdit?.description
      })
    }
  }, [form, dataEdit])
  const onFinish = (values: any) => {
    var dataBody = {
      serviceName: values.username,
      cost: Number(values.password),
      description: values.description
    }
    if (!dataEdit?.serviceId) {
      axios
        .post(URL + '/Services', dataBody)
        .then((items: any) => {
          window.location.href = '/manager/services'
        })
        .catch((e) => console.log(e))
    } else {
      axios
        .put(URL + '/Services/' + dataEdit?.serviceId, dataBody)
        .then((items: any) => {
          window.location.href = '/manager/services'
        })
        .catch((e) => console.log(e))
    }
  }

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
        <Form.Item label='Tên dịch vụ' name='username' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label='Giá' name='password' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Mô tả' name='description' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
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
