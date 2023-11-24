import React from 'react'
import { FacebookIcon, GmailIcon, HiddenEyePasswordIcon, LinkedinIcon, LockIcon } from '@/components/Icons'
import { Alert, Button, Col, Divider, Form, Input, Row } from 'antd'

const onFinish = (values: any) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
type FieldType = {
  email?: string
  password?: string
}

const Login: React.FC = () => (
  <Row className=" h-screen flex">
    <Col xs={{ span: 24 }} md={{ span: 12 }}>
      <div className="min-h-full w-full flex flex-col justify-center items-center md:p-36">
        <h2 className="text-black text-8xl font-smooch font-bold">Welcome</h2>
        <p className="text-black pb-5 -mt-14">We are glad to see you back with us</p>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full px-4 m-0"
        >
          <Form.Item<FieldType> name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input
              className="bg-gray-300  h-11 "
              prefix={<GmailIcon />}
              classNames={{ input: 'bg-gray-300' }}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password
              className="bg-gray-300  h-11"
              classNames={{ input: 'bg-gray-300' }}
              prefix={<LockIcon />}
              suffix={<HiddenEyePasswordIcon />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <p>
              Forgot password? <span className="font-bold">Sign Up now</span>
            </p>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className="bg-gray-700 w-full h-11 text-gray-300 font-bold">
              SIGN IN
            </Button>
          </Form.Item>
        </Form>
        <div className="pt-8 justify-center">
          <p>
            <strong>Sign In&nbsp;</strong>
            with Others
          </p>
          <Divider orientation="center" plain></Divider>
        </div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <FacebookIcon />
          </Col>
          <Col className="gutter-row" span={6}>
            <FacebookIcon />
          </Col>
          <Col className="gutter-row" span={6}>
            <LinkedinIcon />
          </Col>
          <Col className="gutter-row" span={6}>
            <LinkedinIcon />
          </Col>
        </Row>
      </div>
    </Col>
    <Col xs={{ span: 0 }} md={{ span: 12 }}>
      <img src="https://i.imgur.com/en3BKmy.png" alt="boys" className="object-fill min-h-screen max-h-full w-screen" />
    </Col>
  </Row>
)

export default Login
