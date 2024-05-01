import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAddRoleMutation, useUpdateRoleMutation } from '~/store/services/role.service'

interface Props {
  dataEdit?: any
}

export default function RoleCreate({ dataEdit }: Props) {
  const [createUser, { isLoading, isError: errAdd, data }] = useAddRoleMutation()
  const [updateUser, { isError: errUpdate }] = useUpdateRoleMutation()
  const [form] = Form.useForm()

  useEffect(() => {
    if (dataEdit && dataEdit.id) {
      form.setFieldsValue(dataEdit)
    }
  }, [form, dataEdit])

  useEffect(() => {
    if (errAdd || errUpdate) {
      toast.error('Error')
    }
  }, [errAdd, errUpdate])

  const onFinish = async (values: any) => {
    if (!dataEdit?.id) {
      await createUser(values)
      toast.success('Thêm quyền thành công!')
    } else {
      await updateUser({
        ...values,
        id: dataEdit.id
      })
      toast.success('Update quyền thành công!')
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
        <Form.Item label='Tên quyền' name='name' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
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
