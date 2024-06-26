import { Button, Form, FormInstance, Input } from 'antd'
import { useEffect } from 'react'
import { ISpecialty } from '~/types/specialties.type'

interface Props {
  dataEdit?: ISpecialty
  form: FormInstance<any>
  onFinish: (values: any) => Promise<void>
}
const SpecialtyCreate = ({ dataEdit, form, onFinish }: Props) => {
  useEffect(() => {
    if (dataEdit) {
      console.log(dataEdit)
      form.setFieldValue('specialtyName', dataEdit.specialtyName)
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
        <Form.Item
          label='Tên chuyên khoa'
          name='specialtyName'
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

export default SpecialtyCreate
