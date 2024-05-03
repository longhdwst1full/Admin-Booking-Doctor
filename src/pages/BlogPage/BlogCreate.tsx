import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const BlogCreate = () => {
  const [queryParameters] = useSearchParams()
  const id: string | null = queryParameters.get('id')
  console.log(id)
  const [form] = Form.useForm()
  const [dataSevice, setDataService] = useState<any>()

  useEffect(() => {
    const handelGetIdService = async () => {
      const { data } = await axios.get('http://localhost:7212/api/Specialty/' + id)
      console.log(data, 'pl')
      setDataService(data)
    }
    handelGetIdService()
  }, [])
  useEffect(() => {
    form.setFieldsValue({
      username: dataSevice?.specialtyName,
    })
  }, [id, form, dataSevice])
  const onFinish = (values: any) => {
    var dataBody = {
      specialtyName: values.username,
    }
    if (!id) {
      axios
        .post('http://localhost:7212/api/Specialty', dataBody)
        .then((items: any) => {
          window.location.href = '/manager/blogs'
        })
        .catch((e) => console.log(e))
    } else {
      axios
        .put('http://localhost:7212/api/Specialty/' + id, dataBody)
        .then((items: any) => {
          window.location.href = '/manager/blogs'
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default BlogCreate
