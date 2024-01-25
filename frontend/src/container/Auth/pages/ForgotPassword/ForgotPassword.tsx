import { LOGO } from '@/constants/images'
import { Button, Col, Form, Row } from 'antd'
import { Link } from 'react-router-dom'
import FormItem from '../../components/FormItem'
import { GmailIcon } from '@/components/Icons'

const ForgotPassword = () => {
  return (
    <Row className="min-h-screen bg-white">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="py-8 flex justify-center relative">
        <div className="mx-4 mt-16 lg:w-[400px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-6xl font-bold not-italic mb-10 mt-20">
            Forgot Password
          </h2>
          <p className="text-black font-popins text-sm font-medium mb-10">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <Form name="basic" className="mt-3 w-full">
            <FormItem name="email" placeholder="johnpham@gmail.com" Icon={GmailIcon} />
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-8 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center items-center my-6">
            <hr className="w-full border-[1px]" />
            <span className="mx-4 text-base font-bold">Or</span>
            <hr className="w-full border-[1px]" />
          </div>
          <Link to={'/login'}>
            <Button className="w-full h-14 bg-white text-black text-lg font-bold rounded-xl border-1 border-black">
              Sign in
            </Button>
          </Link>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }} className="min-h-screen">
        <img src="https://i.imgur.com/en3BKmy.png" alt="boys" className="w-full h-screen" />
      </Col>
    </Row>
  )
}

export default ForgotPassword
