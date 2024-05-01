import { Button, Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { useAddDoctorMutation, useUpdateDoctorMutation } from '~/store/services/docter'
import { useGetAllSpecialtyQuery } from '~/store/services/specialty'
import { IDoctor } from '~/types/doctor.type'

interface Props {
  dataDoctor?: IDoctor
}
const DoctorCreate = ({ dataDoctor }: Props) => {
  const [form] = Form.useForm()
   
  const { data: dataSpecicaly } = useGetAllSpecialtyQuery()
  const [addDoctorFn] = useAddDoctorMutation()
  const [updateDoctorFn] = useUpdateDoctorMutation()

  useEffect(() => {
    if (dataDoctor && dataDoctor.specialtyID) {
      form.setFieldsValue(dataDoctor)
      form.setFieldValue('password', undefined)
    }
  }, [dataDoctor, form])

  const onFinish = async (values: any) => {
    if (!dataDoctor?.specialtyID) {
      await addDoctorFn(values)
    } else {
      await updateDoctorFn({ ...values, id: dataDoctor.specialtyID })
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
          label='Tên bác sĩ'
          name='doctorName'
          rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Chuyên khoa'
          name='specialtyID'
          rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}
        >
          <Select
            placeholder='Chọn chuyên khoa'
            options={dataSpecicaly?.map((item) => ({
              value: item.id,
              label: item.specialtyName
            }))}
          />
        </Form.Item>
        <Form.Item label='Email' name='email' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
          <Input type='email' />
        </Form.Item>
        {!(dataDoctor && dataDoctor?.specialtyID) && (
          <Form.Item label='Mật khẩu' name='password' rules={[{ required: true, message: 'Trường này là bắt buộc!' }]}>
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default DoctorCreate
