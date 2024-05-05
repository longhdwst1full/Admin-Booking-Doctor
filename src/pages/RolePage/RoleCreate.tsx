import { Button, Form, FormInstance, Input } from 'antd'
import { useEffect } from 'react'
import { IRole } from '~/types/user.type'

interface Props {
  dataEdit?: IRole
  form: FormInstance<any>
  onFinish: (values: any) => Promise<void>
}

export default function RoleCreate({ dataEdit, onFinish, form }: Props) {
  useEffect(() => {
    if (dataEdit && dataEdit.id) {
      form.setFieldValue('Name', dataEdit.name)
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
        <Form.Item label='Tên chức vụ' name='Name' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
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
