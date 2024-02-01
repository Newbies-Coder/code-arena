import { Form, Button, Row, Col, Divider, Input, Alert } from 'antd'
import './style.scss'
import { LOGO, BG } from '@/constants/images'
import { Link, useNavigate } from 'react-router-dom'
import { socialMediaLogin } from '@/mocks/auth.data'
import { LoginFieldType, SocialMediaType } from '@/@types/form.type'
import { useDispatch } from 'react-redux'
import { setAuthenticationStatus, setAdminStatus } from '@/redux/userReducer/userReducer'
import { DispatchType } from '@/redux/config'
import { LockIcon, UserIcon } from '@/components/Icons'
import { regexPasswordPattern } from '@/utils/regex'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setStore, setCookie } from '@/utils/setting'
import { jwtDecode } from 'jwt-decode'
import requestApi from '@/utils/interceptors'
import { handleApiError } from '@/utils/handleApiError'

type UserType = {
  email: string
  exp: string
  iat: string
  role: string
  token_type: string
  username: string
  _id: string
}

const Login = () => {
  const TIME_CLOSING_MESSAGE = 2000
  const REFRESH_TOKEN_EXPIRED_TIME = 7
  const USER_ROLE = 'Admin'

  const navigate = useNavigate()
  const dispatch: DispatchType = useDispatch()

  // Function to handle form submission
  const onFinish = async (values: LoginFieldType) => {
    // Destructure email and password from form values
    const { email, password } = values
    try {
      const res = await requestApi('users/login', 'POST', { email, password })
      const { access_token, refresh_token } = res.data.data
      const { role } = jwtDecode<UserType>(access_token)

      if (role === USER_ROLE) {
        dispatch(setAdminStatus(true))
      }
      toast.success(res.data.message, { autoClose: TIME_CLOSING_MESSAGE })
      setStore('ACCESS_TOKEN', access_token)
      setCookie('REFRESH_TOKEN', refresh_token, REFRESH_TOKEN_EXPIRED_TIME)
      dispatch(setAuthenticationStatus(true))
      navigate('/')
    } catch (err) {
      handleApiError(err)
    }
  }

  // Function to render social media login buttons
  const renderSocialMediaButton = (button: SocialMediaType) => {
    // If button.url is present, render an image inside the button
    if (button.url) {
      return <img src={button.url} alt={button.alt} className={button.key === 'github' ? 'h-11 w-11' : ''} />
    }
    // If button.icon is a function, call it to render the icon, but not as a button
    if (typeof button.icon === 'function') {
      const IconComponent = button.icon
      return <IconComponent />
    }

    return null
  }

  return (
    <Row className="min-h-screen login bg-white">
      <Col xs={{ span: 24 }} lg={{ span: 12 }} className="flex justify-center items-center relative">
        <div className="mx-4 mt-8 pb-16 lg:w-[450px]">
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
                prefix={<UserIcon />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  pattern: regexPasswordPattern,
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
            <p className="text-right cursor-pointer">
              <Button type="link" className="text-gray-700 p-0">
                Forgot password?
              </Button>
              <Button type="link" className="text-gray-700 font-bold p-0">
                <Link to={'/register'}> Sign up now</Link>
              </Button>
            </p>
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full h-14 bg-black text-white text-lg font-bold rounded-xl border-0"
              >
                SIGN IN
              </Button>
            </Form.Item>
          </Form>
          <Divider orientation="center" plain className="text-lg">
            <strong>Sign in&nbsp;</strong>
            with Others
          </Divider>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {socialMediaLogin.map((button) => (
              <Col key={button.key} className="gutter-row" span={6}>
                <Button className="flex justify-center items-center p-0 border-0 h-full w-full">
                  {renderSocialMediaButton(button)}
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
      <Col xs={{ span: 0 }} lg={{ span: 12 }}>
        <img src={BG.APP_BG} alt="boys" className="w-full h-screen object-cover" />
      </Col>
    </Row>
  )
}

export default Login
