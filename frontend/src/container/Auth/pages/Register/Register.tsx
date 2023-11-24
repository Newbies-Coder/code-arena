import { DateOfBirthIcon, GmailIcon, LockIcon, UserIcon } from '@/components/Icons'
import { Input, Form, Button, Row, Col, Alert } from 'antd'
import './style.scss'
import { LOGO } from '@/constants/images'
import { Link } from 'react-router-dom'

const formItemLayout = {
  className: 'bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14',
  classNames: { input: 'ml-2 bg-gray-300 text-xs font-normal font-popins' },
}

const validationRule = (message: string) => ({
  required: true,
  message: <Alert className="ml-2 bg-transparent text-base text-red-700" message={message} banner type="error" />,
})

const Register = () => {
  const renderFormItem = (name: string, placeholder: string, Icon: React.ElementType, inputType?: string) => (
    <Form.Item name={name} rules={[validationRule(`Please input your ${name}!`)]}>
      {inputType === 'password' ? (
        <Input.Password placeholder={placeholder} prefix={<Icon />} {...formItemLayout} />
      ) : (
        <Input placeholder={placeholder} prefix={<Icon />} {...formItemLayout} />
      )}
    </Form.Item>
  )

  return (
    <Row className="min-h-screen register">
      <Col xs={{ span: 24 }} md={{ span: 12 }} className="py-8 flex justify-center relative">
        <div className="mx-4 mt-16 lg:w-[450px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-8xl font-bold not-italic text-center">Sign up</h2>
          <p className="text-black font-popins text-sm -mt-9 mb-10 text-center font-medium">
            Welcome to the Code Arena free coding learning page!
          </p>
          <Form name="basic" className="mt-3 w-full">
            {renderFormItem('username', 'Username', UserIcon)}
            {renderFormItem('email', 'Email', GmailIcon, 'email')}
            {renderFormItem('password', 'Password', LockIcon, 'password')}
            {renderFormItem('confirm password', 'Confirm Password', LockIcon, 'password')}
            {renderFormItem('date', 'yyyy/mm/dd', DateOfBirthIcon)}
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-8 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={{ span: 0 }} md={{ span: 12 }} className="min-h-screen">
        <img src="https://i.imgur.com/en3BKmy.png" alt="boys" className="w-full h-screen" />
      </Col>
    </Row>
  )
}

export default Register
