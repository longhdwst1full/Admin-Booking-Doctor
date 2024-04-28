import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface Props {
  dataProp?: any
}

export default function CreateServices({ dataProp }: Props) {
  const [form] = Form.useForm()
  const [dataSevice, setDataService] = useState<any>()

  useEffect(() => {
    const handelGetIdService = async () => {
      const { data } = await axios.get('https://localhost:7212/api/Services/' + dataProp.id)
      console.log(data, 'pl')
      setDataService(data)
    }
    handelGetIdService()
  }, [])
  useEffect(() => {
    form.setFieldsValue({
      username: dataSevice?.serviceName,
      password: dataSevice?.cost,
      description: dataSevice?.description
    })
  }, [form, dataSevice])
  const onFinish = (values: any) => {
    var dataBody = {
      serviceName: values.username,
      cost: Number(values.password),
      description: values.description
    }
    if (!dataProp.id) {
      axios
        .post('https://localhost:7212/api/Services', dataBody)
        .then((items: any) => {
          window.location.href = '/manager/products'
        })
        .catch((e) => console.log(e))
    } else {
      axios
        .put('https://localhost:7212/api/Services/' + dataProp.id, dataBody)
        .then((items: any) => {
          window.location.href = '/manager/products'
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
