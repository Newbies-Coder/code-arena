import './style.scss'

// Import necessary hooks, components, and utilities from React, React Router, Redux Toolkit, Ant Design, etc.
import React from 'react'
import { Form, Button, Row, Col, Input, Alert, DatePicker, DatePickerProps } from 'antd'
import { BG, LOGO } from '@/constants/images'
import { useDispatch } from 'react-redux'
import { DispatchType } from '@/redux/config'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StatusCodes } from 'http-status-codes'

// Import actions and helpers
import { DateOfBirthIcon, GmailIcon, LockIcon, UserIcon } from '@/components/Icons'
import requestApi from '@/utils/interceptors'
import { setEmailResendOTP } from '@/redux/userReducer/userReducer'
import { RegisterFieldType } from '@/@types/form.type'
import { MESSAGES } from '@/constants/message'

// State to store the date of birth selected by the user
let date_of_birth = ''

// Handler for the date picker's change event
const onChange: DatePickerProps['onChange'] = (_, dateString) => {
  date_of_birth = dateString
}

type RegisterResType = { response?: { status?: number; data?: any } }
const TIME_CLOSING_MESSAGE = 2000 // Time in milliseconds for toast messages

const Register: React.FC = () => {
  const navigate = useNavigate()
  const dispatch: DispatchType = useDispatch()

  // Function to handle form submission
  const onFinish = async (values: RegisterFieldType) => {
    const loadingToast = toast.loading('Registering...')
    const { username, email, password, confirm_password } = values
    try {
      // Perform API request to register the user
      const response = await requestApi('users/register', 'POST', {
        username,
        email,
        password,
        confirm_password,
        date_of_birth,
      })

      // Dispatch action with the user's email for OTP verification
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
      let errorMessage = MESSAGES.REGISTER.ERROR.DEFAULT // Default error message

      // Check if error is an instance of error
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'object' && error !== null) {
        // If the error is an object but not an Error instance, attempt to extract common error properties
        const err = error as RegisterResType
        if (err.response) {
          // Handle different error statuses from the API response
          switch (err.response.status) {
            case StatusCodes.UNPROCESSABLE_ENTITY:
              errorMessage = err.response.data.message || MESSAGES.REGISTER.ERROR.EMPTY_FIELD
              break
            default:
              errorMessage = err.response.data.message || MESSAGES.REGISTER.ERROR.UNKNOWN
              break
          }
        }
      }
      // Update the loading toast to show the error message
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
          {/* Form fields and input components */}
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
      {/* Background image */}
      <Col xs={{ span: 0 }} lg={{ span: 12 }} className="min-h-screen">
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default Register
