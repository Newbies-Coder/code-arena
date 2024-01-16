import { FormItemPropsType } from '@/@types/form.type'
import { Alert, Form, Input } from 'antd'

const validationRule = (message: string) => ({
  required: true,
  message: <Alert className="ml-2 bg-transparent text-base text-red-700" message={message} banner type="error" />,
})

const formItemLayout = {
  className: 'bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14',
  classNames: { input: 'ml-2 bg-gray-300 text-xs font-normal font-popins' },
}

const FormItem = (props: FormItemPropsType) => (
  <Form.Item name={props.name} rules={[validationRule(`Please input your ${props.name}!`)]}>
    {props.inputType === 'password' ? (
      <Input.Password
        placeholder={props.placeholder}
        prefix={<props.Icon />}
        {...formItemLayout}
        styles={{ suffix: { fontSize: '22px' } }}
      />
    ) : (
      <Input placeholder={props.placeholder} prefix={<props.Icon />} {...formItemLayout} />
    )}
  </Form.Item>
)

export default FormItem
