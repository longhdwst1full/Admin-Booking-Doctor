import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { useSevices } from '~/configs/useSevice'
import { IServices } from '~/types/services.type'

interface Props {
  dataEdit?: IServices
}

export default function CreateServices({ dataEdit }: Props) {
  const [form] = Form.useForm()

  const { postCaller, putCaller } = useSevices()

  useEffect(() => {
    dataEdit
      ? form.setFieldsValue({
          username: dataEdit?.serviceName,
          password: dataEdit?.cost,
          description: dataEdit?.description
        })
      : form.resetFields()
  }, [form, dataEdit])

  const onFinish = (values: any) => {
    var dataBody = {
      serviceName: values.username,
      cost: Number(values.password),
      description: values.description
    }
    if (!dataEdit?.serviceId) {
      postCaller('/Services', dataBody)
        .then((items: any) => {
          window.location.href = '/manager/services'
        })
        .catch((e) => console.log(e))
    } else {
      putCaller('/Services/' + dataEdit?.serviceId, dataBody)
        .then((items: any) => {
          window.location.href = '/manager/services'
        })
        .catch((e) => console.log(e))
    }
    form.resetFields()
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
        <Form.Item
          label='serviceName'
          name='username'
          rules={[{ required: true, message: 'Please input your serviceName!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label='cost' name='password' rules={[{ required: true, message: 'Please input your cost!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='description'
          name='description'
          rules={[{ required: true, message: 'Please input your description!' }]}
        >
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
