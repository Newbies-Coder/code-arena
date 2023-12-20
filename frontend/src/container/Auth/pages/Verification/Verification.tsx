import { OTPType } from '@/@types/form'
import { BG, LOGO } from '@/constants/images'
import { inputOTP } from '@/mocks/auth.data'
import { Button, Col, Form, Row } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Verification = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = target
    const newOTP: string[] = [...otp]
    newOTP[index] = value.substring(value.length - 1)
    setOtp(newOTP)
  }
  console.log(otp)
  return (
    <Row className="min-h-screen">
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        lg={{ span: 12 }}
        className="py-8 flex justify-center relative items-stretch"
      >
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
            Please enter your 5 digits code that you received in your email!
          </p>
          <Row justify="center">
            {inputOTP.map((input: OTPType, index) => {
              return (
                <Col className="gutter-row" span={4.8} key={index}>
                  <input
                    type={input.type}
                    // maxLength={input.maxLength}
                    min={input.min}
                    max={input.max}
                    className="text-center mx-1 h-14 w-11 md:w-16 md:h-20 md:mx-2 text-2xl font-bold border-2 border-gray-500 rounded-md"
                    onChange={(e) => handleChange(e, index)}
                  ></input>
                </Col>
              )
            })}
          </Row>
          <div className="flex justify-center items-center mt-6">
            <h2 className="text-orange-500 text-base font-bold">
              <span>00</span>:<span>30</span>
            </h2>
          </div>
          <Form name="basic" className="mt-3 w-full">
            <Form.Item>
              <Button
                htmlType="submit"
                className="mt-2 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                Confirm
              </Button>
              <div className="flex justify-center items-center my-3">
                <p className="m-0">Don't receive the OTP?&nbsp;</p>
                <Button type="link" className="text-orange-500 font-bold p-0 hover:text-orange-500">
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
      <Col xs={{ span: 0 }} sm={{ span: 0 }} lg={{ span: 12 }}>
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default Verification
