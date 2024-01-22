import { Form, Button, Row, Col, Input, Alert, DatePicker, DatePickerProps } from 'antd'
import './style.scss'
import { BG, LOGO } from '@/constants/images'
import { Link } from 'react-router-dom'
import { DateOfBirthIcon, GmailIcon, LockIcon, UserIcon } from '@/components/Icons'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '@/redux/config'
import { registerApi } from '@/redux/userReducer/userReducer'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

let birthday = ''
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  birthday = dateString
}

const Register = () => {
  const data = useSelector((state: RootState) => state.userReducer.register)
  const dispatch: DispatchType = useDispatch()
  const onFinish = async (values: any) => {
    const registerData = registerApi({
      username: values.username,
      email: values.email,
      password: values.password,
      confirm_password: values.confirm_password,
      date_of_birth: birthday,
    })
    await dispatch(registerData)
  }
  return (
    <Row className="min-h-screen register">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="flex items-center justify-center relative">
        <div className="mx-4 lg:w-[450px]">
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
          <Form name="basic" className="mt-3 w-full" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="please input your username"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
            >
              <Input
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14"
                classNames={{ input: 'ml-2 bg-gray-300 text-md font-normal font-popins' }}
                placeholder="username"
                prefix={<UserIcon />}
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="invalid email"
                      banner
                      type="error"
                    />
                  ),
                },
                {
                  required: true,
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="please input your email"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
            >
              <Input
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14"
                classNames={{ input: 'ml-2 bg-gray-300 text-md font-normal font-popins' }}
                placeholder="email"
                prefix={<GmailIcon />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="password invalid!"
                      banner
                      type="error"
                    />
                  ),
                },
                {
                  required: true,
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="please input your password"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
            >
              <Input
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14"
                classNames={{ input: 'ml-2 bg-gray-300 text-md font-normal font-popins' }}
                placeholder="password"
                prefix={<LockIcon />}
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="please input your confirm password"
                      banner
                      type="error"
                    />
                  ),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      <Alert
                        className="ml-2 bg-transparent text-base text-red-700"
                        message="The new password that you entered do not match!"
                        banner
                        type="error"
                      />,
                    )
                  },
                }),
              ]}
            >
              <Input
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14"
                classNames={{ input: 'ml-2 bg-gray-300 text-md font-normal font-popins' }}
                placeholder="confirm password"
                prefix={<LockIcon />}
              />
            </Form.Item>
            <Form.Item
              name="dob"
              rules={[
                {
                  required: true,
                  message: (
                    <Alert
                      className="ml-2 bg-transparent text-base text-red-700"
                      message="please input your email"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
            >
              <DatePicker
                onChange={onChange}
                disabledDate={(d) => !d || d.isAfter('2012-12-31') || d.isBefore('1960-01-01')}
                format="YYYY-MM-DD"
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14 text-md font-popins"
                placeholder="DOB"
                suffixIcon={<DateOfBirthIcon />}
              />
            </Form.Item>
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
      <Col xs={{ span: 0 }} lg={{ span: 12 }} className="min-h-screen">
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen" />
      </Col>
    </Row>
  )
}

export default Register
