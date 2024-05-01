import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAddSpecialtyMutation, useUpdateSpecialtyMutation } from '~/store/services/specialty'

interface Props {
  dataEdit?: any
}
const SpecialtyCreate = ({ dataEdit }: Props) => {
  const [form] = Form.useForm()
  const [createSpecialty, { isLoading, isError: errAdd, data }] = useAddSpecialtyMutation()
  const [updateSpecialty, { isError: errUpdate }] = useUpdateSpecialtyMutation()

  useEffect(() => {
    if (dataEdit && dataEdit.id) {
      form.setFieldValue("specialtyName",dataEdit.specialtyName)
    }
  }, [form, dataEdit])

  useEffect(() => {
    if (errAdd || errUpdate) {
      toast.error('Error')
    }
  }, [errAdd, errUpdate])

  const onFinish = async (values: any) => {
    var dataBody = {
      specialtyName: values.username
    }
    if (!dataEdit?.id) {
      await createSpecialty(dataBody)
    } else {
      updateSpecialty({ ...dataBody, id: dataEdit.id })
        .then(() => {
          toast.success('Add success')
        })
        .catch((e) => toast.error(e))
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

export default SpecialtyCreate
