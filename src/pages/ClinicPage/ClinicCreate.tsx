import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAddClinicMutation, useUpdateClinicMutation } from '~/store/services/clinics'

interface Props {
  dataUser?: any
}

export default function ClinicCreate({ dataUser }: Props) {
  const [createClinic, { isLoading, isError: errAdd, data }] = useAddClinicMutation()
  const [updateUser, { isError: errUpdate }] = useUpdateClinicMutation()
  const [form] = Form.useForm()

  useEffect(() => {
    if (dataUser && dataUser.id) {
      form.setFieldsValue(dataUser)
    }
  }, [form, dataUser])

  useEffect(() => {
    if (errAdd || errUpdate) {
      toast.error('Error')
    }
  }, [errAdd, errUpdate])

  const onFinish = async (values: any) => {
    if (!dataUser?.id) {
      await createClinic(values)
      toast.success('Thêm phòng khám thành công!')
    } else {
      await updateUser({
        ...values,
        id: dataUser.id
      })
      toast.success('Update phòng khám thành công!')
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
          label='Tên phòng khám'
          name='clinicName'
          rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Điện thoại' name='phone' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
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
