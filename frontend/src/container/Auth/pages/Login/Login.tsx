import { Form, Button, Row, Col, Divider, Input, Alert } from 'antd'
import './style.scss'
import { LOGO, BG } from '@/constants/images'
import { Link } from 'react-router-dom'
import { socialMediaLogin } from '@/mocks/auth.data'
import { SocialMediaType } from '@/@types/form'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '@/@types/user'
import { loginApi } from '@/redux/userReducer/userReducer'
import { DispatchType } from '@/redux/config'
import { LockIcon, UserIcon } from '@/components/Icons'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Login = () => {
  const data = useSelector((state: userState) => state.userLogin)
  const dispatch: DispatchType = useDispatch()
  const onFinish = async (values: any) => {
    const loginData = loginApi({ email: values.email, password: values.password })
    await dispatch(loginData)
  }

  // useEffect(() => {
  //   ;(async () => {
  //     const loginData = loginApi({})
  //     await dispatch(loginData)
  //   })()
  // }, [])

  const renderButtonContent = (button: SocialMediaType) => {
    if (button.url) {
      return <img src={button.url} alt={button.alt} className={button.key === 'github' ? 'h-11 w-11' : ''} />
    }
    if (typeof button.icon === 'function') {
      const Icon = button.icon
      return <Icon />
    }
    return null
  }

  return (
    <Row className="min-h-screen login">
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
          <Form name="basic" className="mt-3 w-full" onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
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
                placeholder="password"
                prefix={<LockIcon />}
              />
            </Form.Item>
            <p className="text-right cursor-pointer">
              <Button type="link" className="text-gray-700 p-0">
                Forgot password?
              </Button>
              <Button type="link" className="text-gray-700 font-bold p-0">
                Sign up now
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
                  {renderButtonContent(button)}
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
