import { BG, LOGO } from '@/constants/images'
import { Button, Col, Divider, Form, Row } from 'antd'
import { Link } from 'react-router-dom'

const Verification = () => {
  return (
    <Row className="min-h-screen login ">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="py-8 flex justify-center relative items-stretch">
        <div className="mx-4 mt-16 lg:w-[450px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-6xl font-bold not-italic text-center mb-3">
            Verification
          </h2>
          <p className="text-black font-popins text-sm mt-2 mb-10 text-center font-medium">
            Please enter your 5 digits code that you received on you email!
          </p>
          <Form name="basic" className="mt-3 w-full">
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-5 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                Confirm
              </Button>
              <div className="flex justify-center items-center my-3">
                <p className="m-0">If you didn’t receive a code?&nbsp;</p>
                <Button type="link" className="text-gray-700 font-bold p-0 hover:text-orange-500">
                  Resend OTP
                </Button>
              </div>
              <Button className="w-full h-14 bg-white text-black text-lg font-bold rounded-xl border-1 hover:text-gray-700 hover:border-gray-700 hover:bg-gray-100">
                Sign in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }}>
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default Verification
