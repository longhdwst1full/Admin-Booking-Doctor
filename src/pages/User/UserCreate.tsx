import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import { IUsers } from '~/types/user.type'

interface Props {
  dataUser?: IUsers
  onFinish: (values: any) => Promise<void>
}
const UserCreate = ({ dataUser, onFinish }: Props) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (dataUser && dataUser.id) {
      form.setFieldsValue(dataUser)
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
          label='User name'
          name='userName'
          rules={[{ required: true, message: 'Please input your User name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label='Phone' name='phone' rules={[{ required: true, message: 'Please input your phone!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: !dataUser ? true : false, message: 'Please input your Password!' }]}
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

export default UserCreate
