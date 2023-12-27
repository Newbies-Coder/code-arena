import { LOGO, SYS } from '@constants/images'
import { Button, Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

type FieldType = {
  email?: string
  password?: string
  remember?: string
}

const Login = () => {
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
      <div className="fixed bg-black border-[10px] border-[#00D1FF] rounded-2xl outline-none top-24 left-7 right-7 md:left-14 md:right-14 bottom-24">
        <h2 className="text-8xl text-white font-smooch text-center mt-4 mb-4">Sign-in</h2>
        <div className="flex justify-center h-full px-4">
          <div className="w-0 md:w-1/2 md:pl-32">
            <img src={SYS.IMAGE.YOUNG_MAN} alt="" className="h-96" />
          </div>
          <div className="w-full md:w-1/2">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              className="w-full md:w-2/3 flex flex-col items-center"
            >
              <Form.Item<FieldType>
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                className="border-2 rounded-lg border-white w-full mb-10"
              >
                <h3 className="-mt-3 ml-2 pl-2 mb-0 text-white bg-black w-14">Email</h3>
                <Input className="bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
              </Form.Item>

              <Form.Item<FieldType>
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className="border-2 rounded-lg border-white w-full"
              >
                <h3 className="-mt-3 ml-2 pl-2 mb-0 text-white bg-black w-20">Password</h3>
                <Input className="bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none" />
              </Form.Item>

              <Form.Item<FieldType> name="remember" valuePropName="checked" className="w-full">
                <Checkbox className="text-5xl font-semibold text-[#cccc]">Remember me</Checkbox>
              </Form.Item>

              <Form.Item className="w-2/3">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="text-[#7302E8] text-3xl font-bold h-16 w-full border-white rounded-tl-[30px] rounded-bl-[50px] rounded-tr-[50px] rounded-br-[30px]"
                >
                  Sign-in
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
