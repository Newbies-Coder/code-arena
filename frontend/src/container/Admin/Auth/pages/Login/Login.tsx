import { LoginFieldType } from '@/@types/form.type'
import { userLoginType } from '@/@types/user.type'
import { useLoginMutation } from '@/apis/api'
import { DispatchType } from '@/redux/config'
import { authAction } from '@/redux/userReducer/userReducer'
import { ACCESS_TOKEN, setStore } from '@/utils/setting'
import { LOGO, SYS } from '@constants/images'
import { Alert, Button, Checkbox, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FieldType = {
  email?: string
  password?: string
  remember?: string
}

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const dispatch: DispatchType = useDispatch()

  const onFinish = async (values: LoginFieldType) => {
    try {
      const { email, password } = values
      const res = await login({ email: email, password: password })

      if ('data' in res) {
        const { access_token } = res.data.data as userLoginType
        setStore(ACCESS_TOKEN, access_token)
        dispatch(authAction(true))
        toast.success('Login successfully')
        navigate('/admin')
      }

      if ('error' in res) {
        if (res.error && 'data' in res.error) {
          console.log(res.error.data)
          toast.error(res.error.data.message)
        } else {
          console.log(res.error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="h-screen w-full bg-[#0e1820] flex flex-col justify-between">
        <div className="h-full">
          <div className="w-56 h-1/6 bg-[#6e7479] flex items-center p-3">
            <Link to={'/'}>
              <img src={LOGO.APP_LOGO} alt="" className="bg-[#D9D9D9] rounded-full" />
            </Link>
          </div>
          <div className="w-80 h-2/4 bg-white rounded-r-3xl"></div>
        </div>
        <div className="flex flex-col items-end h-full justify-end">
          <div className="w-80 h-2/4 bg-white rounded-l-3xl"></div>
          <div className="w-56 h-1/6 bg-[#6e7479] p-3"></div>
        </div>
      </div>
      <div className="fixed bg-black border-[10px] border-[#00D1FF] rounded-2xl outline-none top-24 left-7 right-7 bottom-14 md:left-14 md:right-14 md:bottom-20 flex flex-col">
        <h2 className="text-8xl text-white font-smooch text-center mt-4 mb-4">Sign-in</h2>
        <div className="flex justify-center px-4 h-full">
          <div className="w-0 md:w-1/2 md:pl-32 h-full">
            <img src={SYS.IMAGE.YOUNG_MAN} alt="" className="h-full" />
          </div>
          <div className="w-full md:w-1/2 mt-1 h-full">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              className="w-full md:w-2/3 flex flex-col items-center relative"
              onFinish={onFinish}
            >
              <h3 className="absolute -top-2 left-3 px-2 mb-0 text-[#6a5af9] bg-black z-10 rounded-md">Email</h3>
              <Form.Item<FieldType>
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-400"
                        message="Invalid email"
                        banner
                        type="error"
                      />
                    ),
                  },
                  {
                    required: true,
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-400"
                        message="Please input your email"
                        banner
                        type="error"
                      />
                    ),
                  },
                ]}
                className="border-2 rounded-lg border-[#6a5af9] w-full mb-10 flex flex-col"
              >
                <Input className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
              </Form.Item>

              <h3 className="absolute top-24 left-3 px-2 mb-0 text-[#6a5af9] bg-black z-10 rounded-md">Password</h3>
              <Form.Item<FieldType>
                name="password"
                rules={[
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-400"
                        message="Invalid password"
                        banner
                        type="error"
                      />
                    ),
                  },
                  {
                    required: true,
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-400"
                        message="Please input your password"
                        banner
                        type="error"
                      />
                    ),
                  },
                ]}
                className="mt-2 border-2 rounded-lg border-[#6a5af9] w-full mb-10 flex flex-col"
              >
                <Input
                  type="password"
                  className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none"
                />
              </Form.Item>

              <Form.Item<FieldType> name="remember" valuePropName="checked" className="w-full mb-1 -mt-1">
                <Checkbox className="text-5xl font-semibold text-[#cccc]">Remember me</Checkbox>
              </Form.Item>

              <Form.Item className="w-2/3 mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex items-center justify-center bg-gradient-to-tr --tw-gradient-stops from-[#6A5AF9] to-[#D66EFD] py-4 px-8 text-3xl font-bold h-16 w-full border-none rounded-tl-[30px] rounded-bl-[50px] rounded-tr-[50px] rounded-br-[30px] hover:bg-gradient-to-l hover:bg-white hover:duration-500 hover:ease-linear"
                >
                  {isLoading ? 'Wait...' : 'Sign-in'}
                </Button>
              </Form.Item>
            </Form>
            <p className="text-white">
              Don’t have an account
              <span>
                <Link to={'/register'} className="text-[#7302E8] ml-2 font-semibold">
                  Sign-up
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
