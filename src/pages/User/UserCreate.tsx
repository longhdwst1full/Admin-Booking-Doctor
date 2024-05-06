import { Button, Form, FormInstance, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useSevices } from '~/configs/useSevice'
import { IRole, IUsers } from '~/types/user.type'

interface Props {
  dataUser?: IUsers
  form: FormInstance<any>
  onFinish: (values: any) => Promise<void>
}
const UserCreate = ({ dataUser, onFinish, form }: Props) => {
  const [roles, setDataRoles] = useState<IRole[]>()

  const { getCaller } = useSevices()

  useEffect(() => {
    const handelGetIdService = async () => {
      const { data } = await getCaller<IRole[]>('/Role')

      setDataRoles(data)
    }
    handelGetIdService()
  }, [])

  useEffect(() => {
    if (dataUser && dataUser.id) {
      form.setFieldsValue(dataUser)
      form.setFieldValue('role', roles?.find((item) => item.name == dataUser.roleName)?.id)
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
          label='User name'
          name='userName'
          rules={[{ required: true, message: 'Please input your User name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please input your Email!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        {dataUser && (
          <Form.Item label='Chức vụ' name='role' rules={[{ required: true, message: 'Required!' }]}>
            <Select
              style={{ width: 200 }}
              placeholder='Search to Select'
              options={roles?.map((item) => ({
                value: item.id,
                label: item.name
              }))}
            />
          </Form.Item>
        )}

        <Form.Item
          label='Phone'
          name='phone'
          rules={[
            { required: true, message: 'Please input your phone!' },
            {
              pattern: /^(0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
              message: 'Sai định dạng Số điện thoại !'
            }
          ]}
          normalize={(value) => value.trim()}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[
            { required: !dataUser ? true : false, message: 'Please input your Password!' },
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

export default UserCreate
