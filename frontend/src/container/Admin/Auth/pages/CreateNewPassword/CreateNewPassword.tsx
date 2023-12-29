import { LOGO, SYS } from '@/constants/images'
import { Alert, Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

export default function CreateNewPassword() {
  const navigate = useNavigate()

  const onFinish = async (email: string) => {
    console.log('Finished')
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
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
      <div className="fixed bg-black border-[10px] border-[#00D1FF] rounded-2xl outline-none top-24 left-7 right-7 bottom-14 lg:left-14 lg:right-14 lg:bottom-20 flex justify-center">
        <div className="flex justify-center h-full px-4">
          <div className="w-0 lg:w-1/2 lg:pl-32 mt-10">
            <img src={SYS.IMAGE.YOUNG_MAN} alt="" className="h-full" />
          </div>
          <div className="w-full lg:w-1/2 mt-1 flex flex-col items-center py-10">
            <h2 className="text-6xl text-white font-smooch text-center mb-4">Create New Password</h2>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              className="w-full md:w-2/3 flex flex-col items-center relative"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">Password</h3>
              <Form.Item
                name="password"
                rules={[
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-700"
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
                        className="bg-transparent text-base text-red-700"
                        message="Please input your password"
                        banner
                        type="error"
                      />
                    ),
                  },
                ]}
                className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
              >
                <Input
                  type="password"
                  className="h-12 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none"
                />
              </Form.Item>

              <h3 className="absolute top-20 left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">Confirm password</h3>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-700"
                        message="Invalid confirm password"
                        banner
                        type="error"
                      />
                    ),
                  },
                  {
                    required: true,
                    message: (
                      <Alert
                        className="bg-transparent text-base text-red-700"
                        message="Please input your confirm password"
                        banner
                        type="error"
                      />
                    ),
                  },
                ]}
                className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
              >
                <Input
                  type="password"
                  className="h-12 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none"
                />
              </Form.Item>

              <Form.Item className="w-2/3 mt-2">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="flex items-center justify-center bg-gradient-to-tr --tw-gradient-stops from-[#6A5AF9] to-[#D66EFD] py-4 px-8 text-xl md:text-3xl font-bold h-10 md:h-16 w-full border-none rounded-tl-[30px] rounded-bl-[50px] rounded-tr-[50px] rounded-br-[30px] hover:bg-gradient-to-l hover:bg-white"
                >
                  Continue
                </Button>
              </Form.Item>
            </Form>
            <div className="w-2/3 flex mb-0">
              <div className="border-t-2 border-white w-full mt-1"></div>
              <p className="text-xl font-semibold text-white px-4 -mt-2">Or</p>
              <div className="border-t-2 border-white w-full mt-1"></div>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="flex items-center justify-center bg-gradient-to-tr --tw-gradient-stops from-[#6A5AF9] to-[#D66EFD] py-4 px-8 text-xl md:text-3xl font-bold h-10 md:h-16 w-2/3 border-none rounded-tl-[30px] rounded-bl-[50px] rounded-tr-[50px] rounded-br-[30px] hover:bg-gradient-to-l hover:bg-white"
              onClick={() => navigate('/admin/login')}
            >
              Sign-in
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
