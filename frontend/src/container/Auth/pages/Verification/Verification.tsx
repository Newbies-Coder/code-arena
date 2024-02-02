import { BG, LOGO } from '@/constants/images'
import { Button, Col, Form, Row, Statistic } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import requestApi from '@/utils/interceptors'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/config'
const { Countdown } = Statistic

let currentIndex = 0
const deadline = Date.now() + 1000 * 60 * 5

const Verification = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''))
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const email = useSelector((state: RootState) => state.user.email)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    const newOTP: string[] = [...otp]
    newOTP[currentIndex] = value.substring(value.length - 1)
    if (!value) setActiveIndex(currentIndex - 1)
    else setActiveIndex(currentIndex + 1)
    setOtp(newOTP)
  }

  const handleKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentIndex = index
    if (key === 'Backspace') setActiveIndex(index - 1)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeIndex])

  const handleConfirmClick = async () => {
    const otpString = otp.join('')
    const OTP_LENGTH = +import.meta.env.VITE_OTP_LENGTH
    if (otpString.length === OTP_LENGTH) {
      requestApi('users/verify-otp', 'POST', { otp: otpString })
        .then((res) => {
          const { message } = res.data
          toast.success(message, { autoClose: 2000 })
          navigate('/login')
        })
        .catch((err: any) => {
          const { errors } = err.response.data
          const { msg } = errors.otp
          toast.error(msg, { autoClose: 3000 })
        })
    } else {
      toast.warn('Please enter all characters of otp string')
    }
  }

  const handleResendClick = async () => {
    const id = toast.loading('')
    requestApi('users/resend-verify-otp', 'POST', { email })
      .then((res) => {
        const { message } = res.data
        toast.update(id, { render: message, type: 'success', isLoading: false, autoClose: 2000 })
      })
      .catch((err: any) => {
        const { message } = err.response.data
        toast.update(id, { render: message, type: 'error', isLoading: false, autoClose: 2000 })
      })
  }

  return (
    <Row className="min-h-screen  bg-white">
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
            Please enter your 6 digits code that you received in your email!
          </p>
          <Row justify="center">
            {otp.map((_, index) => {
              return (
                <Col className="gutter-row" span={4} key={index}>
                  <input
                    ref={index === activeIndex ? inputRef : null}
                    type="number"
                    className="change-value-button text-center mx-1 h-14 w-11 md:w-16 md:h-20 md:mx-2 text-2xl font-bold border-2 border-gray-500 rounded-md"
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    value={otp[index]}
                  />
                </Col>
              )
            })}
          </Row>
          <div className="flex justify-center items-center mt-6">
            <Countdown className="font-bold" value={deadline} format="mm:ss" />
          </div>
          <Form name="basic" className="mt-3 w-full">
            <Form.Item>
              <Button
                onClick={handleConfirmClick}
                htmlType="submit"
                className="mt-2 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                Confirm
              </Button>
              <div className="flex justify-center items-center my-3">
                <p className="m-0">Don't receive the OTP?&nbsp;</p>
                <Button
                  onClick={handleResendClick}
                  type="link"
                  className="text-orange-500 font-bold p-0 hover:text-orange-500"
                >
                  Resend OTP
                </Button>
              </div>
              <Button className="w-full h-14 bg-white text-black text-lg font-bold rounded-xl border-1 hover:text-gray-700 hover:border-gray-700 hover:bg-gray-100">
                <Link to={'/login'}> Sign in</Link>
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
