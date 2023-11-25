import { FacebookIcon, GmailIcon, LinkedinIcon, LockIcon } from '@/components/Icons'
import { Input, Form, Button, Row, Col, Alert, Divider } from 'antd'
import './style.scss'
import { LOGO, SOCIAL_ICON } from '@/constants/images'
import { Link } from 'react-router-dom'

const formItemLayout = {
  className: 'bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14',
  classNames: { input: 'ml-2 bg-gray-300 text-xs font-normal font-popins' },
}

const validationRule = (message: string) => ({
  required: true,
  message: <Alert className="ml-2 bg-transparent text-base text-red-700" message={message} banner type="error" />,
})

const Login = () => {
  const renderFormItem = (name: string, placeholder: string, Icon: React.ElementType, inputType?: string) => (
    <Form.Item name={name} rules={[validationRule(`Please input your ${name}!`)]}>
      {inputType === 'password' ? (
        <Input.Password
          placeholder={placeholder}
          prefix={<Icon />}
          {...formItemLayout}
          styles={{ suffix: { fontSize: '23px' } }}
        />
      ) : (
        <Input placeholder={placeholder} prefix={<Icon />} {...formItemLayout} />
      )}
    </Form.Item>
  )

  return (
    <Row className="min-h-screen login ">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="py-8 flex justify-center relative">
        <div className="mx-4 mt-16 lg:w-[450px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-8xl font-bold not-italic text-center">Welcome</h2>
          <p className="text-black font-popins text-sm -mt-9 mb-10 text-center font-medium">
            Welcome to the Code Arena free coding learning page!
          </p>
          <Form name="basic" className="mt-3 w-full">
            {renderFormItem('email', 'Email', GmailIcon, 'email')}
            {renderFormItem('password', 'Password', LockIcon, 'password')}
            <p className="text-right cursor-pointer">
              <Button type="link" className="text-gray-700 p-0">
                Forgot password?
              </Button>
              <Button type="link" className="text-gray-700 font-bold p-0">
                Sign Up now
              </Button>
            </p>
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-3 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          <div className=" justify-center">
            <Divider orientation="center" plain className="text-lg">
              <strong>Sign In&nbsp;</strong>
              with Others
            </Divider>
          </div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
              <Button className="border-0 h-full w-full social-button">
                <img src={SOCIAL_ICON.GMAIL} alt="gmail" />
              </Button>
            </Col>
            <Col className="gutter-row" span={6}>
              <Button className="border-0 h-full w-full social-button">
                <FacebookIcon />
              </Button>
            </Col>
            <Col className="gutter-row" span={6}>
              <Button className="border-0 h-full w-full social-button">
                <img src={SOCIAL_ICON.GITHUB} alt="github" className="h-11 w-11" />
              </Button>
            </Col>
            <Col className="gutter-row" span={6}>
              <Button className="border-0 h-full w-full social-button">
                <LinkedinIcon />
              </Button>
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }}>
        <img src="https://i.imgur.com/en3BKmy.png" alt="boys" className="w-full h-screen" />
      </Col>
    </Row>
  )
}

export default Login
