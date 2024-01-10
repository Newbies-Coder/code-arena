import { SYS } from '@/constants/images'
import { CameraOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import './style.scss'

export default function MainProfile() {
  return (
    <div className="main-profile relative">
      <img src={SYS.IMAGE.BG_PROFILE} alt="" className="w-full h-44 object-fill" />
      <Button icon={<CameraOutlined />} className="absolute top-8 right-8 text-white">
        Change Cover
      </Button>
      <div className="flex flex-col items-center w-full h-full lg:flex-row p-4">
        <div className="w-full lg:justify-center lg:w-2/5 lg:flex lg:flex-col lg:items-center">
          <div className="relative flex justify-center">
            <img
              src="https://s3-alpha-sig.figma.com/img/4a21/e3f0/85ed310d00fbbd294eb2392cde7f9acc?Expires=1704672000&Signature=lwRZizoL~HW8ZBcUCKvejDyRnT0PSAqW8CMA5AHVPY693S015cadWaO3uvcsjYbPIZapiddWSiu8pA4hIC87lPDNKDoGCYxiEr1viQE04hMWR3-1snxKAvzsRapQy-0JTHFO8sCHjuboVy-hq6VM9ZA984ZrIvdHaICbwQ6lvT-O18JE7nzOdlNfl4O2gsOL9uCASc3f8cItPLSSetJGuUCMqiZH8KYxMUCzZ89MIOmOT0o9FXC7mTKtCQndQfAQAP~lkg9HGd2cuT1J8oFDTZFjShIZ72h~8H62vB8ayyg7yYN1zaW77uYHLD3eX1xO-0MQy7Hc99CHgNuGkuNuhg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt=""
              className="w-64 h-64 rounded-full"
            />
            <CameraOutlined className="text-2xl bg-[#7b61ff] p-3 rounded-full text-white absolute bottom-0 ml-24 border border-black" />
          </div>
          <h3 className="mt-4 text-4xl text-center">Alex Jordan</h3>
        </div>
        <div className="w-full lg:w-3/5">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            className="w-full flex flex-col items-center relative mt-4"
          >
            <div className="flex flex-col w-full lg:flex-row lg:gap-2">
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">Name</h3>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please input your name"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-black w-full mb-10 flex flex-col"
                >
                  <Input
                    className="h-12 bg-transparent border-none text-black text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder="Alex Jordan"
                  />
                </Form.Item>
              </div>

              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">
                  Username
                </h3>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please input your username"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-black w-full mb-10 flex flex-col"
                >
                  <Input
                    className="h-12 bg-transparent border-none text-black text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder="AlexJordan01"
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex flex-col w-full lg:flex-row lg:gap-2">
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">
                  Phone number
                </h3>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please input your phone"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-black w-full mb-10 flex flex-col"
                >
                  <Input
                    type="number"
                    className="h-12 bg-transparent border-none text-black text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder="0123456789"
                  />
                </Form.Item>
              </div>
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">
                  Password
                </h3>
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
                  className="border-2 rounded-lg border-black w-full mb-10 flex flex-col"
                >
                  <Input
                    type="password"
                    className="h-12 bg-transparent border-none text-black text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder="Alex@123"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col w-full lg:flex-row lg:gap-2">
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 px-2 mb-0 text-white bg-black z-10 rounded-md">
                  Email
                </h3>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please input your email"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-black w-full mb-10 flex flex-col"
                >
                  <Input
                    className="h-12 bg-transparent border-none text-black text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder="johnpham@gamil.com"
                  />
                </Form.Item>
              </div>
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 lg:-top-2 lg:left-3 sm:left-[362px] px-2 mb-0 text-white bg-black z-10 rounded-md">
                  Role
                </h3>
                <Form.Item
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please input your role"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-black w-full mb-10 flex flex-col"
                >
                  <Input
                    className="h-12 bg-transparent border-none text-black text-xl focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder="admin"
                  />
                </Form.Item>
              </div>
            </div>
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
        </div>
      </div>
    </div>
  )
}
