import { GmailIcon, LockIcon } from '@/components/Icons'
import { BG, LOGO } from '@/constants/images'
import requestApi from '@/utils/interceptors'
import { Alert, Button, Col, Divider, Form, Input, Row } from 'antd'
import { StatusCodes } from 'http-status-codes'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const resetPwd = toast.loading('Reseting password...')
    const { email, password, confirm_password } = values
    try {
      const res = await requestApi('users/reset-password', 'POST', { email, password, confirm_password })
      const { message } = res.data
      toast.update(resetPwd, { render: message, type: 'success', isLoading: false, autoClose: 2000 })
    } catch (error: any) {
      const { message } = error.response.data
      let messageInfo = message
      //get message if status code = 422
      if (error.response.status === StatusCodes.UNPROCESSABLE_ENTITY) {
        const { msg } = error.response.data.errors.password
        messageInfo = msg
      }
      toast.update(resetPwd, { render: messageInfo, type: 'error', isLoading: false, autoClose: 5000 })
    }
  }

  return (
    <Row className="min-h-screen login bg-white">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="py-8 flex justify-center relative items-stretch">
        <div className="mx-4 mt-8 lg:w-[450px] overflow-hidden">
          <Link
            to={'/'}
            className="absolute top-2 left-2 w-14 h-14 rounded-full bg-gray-300 flex justify-center items-center border-none"
          >
            <img src={LOGO.APP_LOGO} alt="logo" />
          </Link>
          <h2 className="text-black clear-both font-smooch text-6xl font-bold not-italic text-center mb-2">
            Reset password
          </h2>
          <p className="text-black font-popins text-sm mb-10 text-center font-medium">
            Reset the password for your account so you can sign in and access all features.
          </p>
          <Form name="basic" className="mt-3 w-full" onFinish={onFinish}>
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
                      message="new password invalid!"
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
                      message="please input your new password"
                      banner
                      type="error"
                    />
                  ),
                },
              ]}
            >
              <Input.Password
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14"
                classNames={{ input: 'ml-2 bg-gray-300 text-md font-normal font-popins' }}
                placeholder="New password"
                prefix={<LockIcon />}
                styles={{ suffix: { fontSize: '22px' } }}
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
              <Input.Password
                className="bg-gray-300 w-full py-2 px-4 text-base font-normal border-0 h-14"
                classNames={{ input: 'ml-2 bg-gray-300 text-md font-normal font-popins' }}
                placeholder="Confirm new password"
                prefix={<LockIcon />}
                styles={{ suffix: { fontSize: '22px' } }}
              />
            </Form.Item>
            <Form.Item className="mb-0 mt-5">
              <Button
                htmlType="submit"
                className="w-full h-14 mt-5 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                Confirm
              </Button>
            </Form.Item>
            <Divider orientation="center" plain style={{ margin: 2 }}>
              <strong className="text-lg">or</strong>
            </Divider>
            <Form.Item>
              <Button
                className="w-full h-14 bg-white text-black text-lg font-bold rounded-xl border-1 hover:text-gray-700 hover:border-gray-700 hover:bg-gray-100"
                onClick={() => navigate('/login')}
              >
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

export default ResetPassword
