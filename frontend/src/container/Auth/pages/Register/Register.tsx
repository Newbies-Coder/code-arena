import { Form, Button, Row, Col, Input, Alert, DatePicker, DatePickerProps } from 'antd'
import './style.scss'
import { BG, LOGO } from '@/constants/images'
import { Link, useNavigate } from 'react-router-dom'
import { DateOfBirthIcon, GmailIcon, LockIcon, UserIcon } from '@/components/Icons'
import { useDispatch } from 'react-redux'
import { DispatchType } from '@/redux/config'
import requestApi from '@/utils/interceptors'
import { setEmailResendOTP } from '@/redux/userReducer/userReducer'
import { toast } from 'react-toastify'
import { RegisterFieldType } from '@/@types/form.type'
import { StatusCodes } from 'http-status-codes'
import React from 'react'
import { MESSAGES } from '@/constants/message'

let date_of_birth = ''
const onChange: DatePickerProps['onChange'] = (_, dateString) => {
  date_of_birth = dateString
}

type RegisterResType = { response?: { status?: number; data?: any } }

const Register: React.FC = () => {
  const TIME_CLOSING_MESSAGE = 2000 // Time in milliseconds for toast messages

  const navigate = useNavigate()
  const dispatch: DispatchType = useDispatch()

  // Function to handle form submission
  const onFinish = async (values: RegisterFieldType) => {
    // Show loading toast
    const loadingToast = toast.loading('Registering...')

    // Destructure form values
    const { username, email, password, confirm_password } = values

    // API request simulation
    try {
      const response = await requestApi('users/register', 'POST', {
        username,
        email,
        password,
        confirm_password,
        date_of_birth,
      })
      console.log(response)

      // Dispatch action to store email for OTP verification
      dispatch(setEmailResendOTP(response.data.data.email))

      // Update loading toast to success
      toast.update(loadingToast, {
        render: response.data.message,
        type: 'success',
        isLoading: false,
        autoClose: TIME_CLOSING_MESSAGE,
      })

      // Navigate to verification page
      navigate('/verification')
    } catch (error) {
      console.log(error)

      let errorMessage = MESSAGES.REGISTER.ERROR.DEFAULT // Default error message

      // Check if error is an instance of Error
      if (error instanceof Error) {
        errorMessage = error.message
        console.log(errorMessage)
      } else if (typeof error === 'object' && error !== null) {
        // If the error is an object but not an Error instance, attempt to extract common error properties
        const err = error as RegisterResType
        if (err.response) {
          if (err.response.status === StatusCodes.UNPROCESSABLE_ENTITY && err.response.data) {
            // Handle Unprocessable Entity, assume the structure of your API errors
            const apiError =
              err.response.data.errors?.password || err.response.data.errors?.username || err.response.data.message
            errorMessage = apiError || MESSAGES.REGISTER.ERROR.EMPTY_FIELD
          } else {
            // Handle other statuses
            errorMessage = err.response.data?.message || MESSAGES.REGISTER.ERROR.UNKNOWN
            console.log(errorMessage)
          }
        }
      }
      // Use errorMessage for toast
      toast.update(loadingToast, {
        render: errorMessage,
        type: 'error',
        isLoading: false,
        autoClose: TIME_CLOSING_MESSAGE,
      })
    }
  }

  return (
    <Row className="min-h-screen register bg-white">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="flex items-center justify-center relative">
        <div className="mx-4 lg:w-[450px]">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-8xl font-bold not-italic text-center">Sign up</h2>
          <p className="text-black font-popins text-sm -mt-7 mb-6 text-center font-medium">
            Welcome to the Code Arena free coding learning page!
          </p>
          <Form name="basic" className="w-full" onFinish={onFinish}>
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
                  pattern: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
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
                      message="please input your date of birth"
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
                className="mt-4 w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }} className="min-h-screen">
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default Register
