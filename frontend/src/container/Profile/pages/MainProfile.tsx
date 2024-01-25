import { HOME_ICON, LOGO } from '@/constants/images'
import { Alert, Avatar, Button, Col, Form, Input, Layout, Row } from 'antd'
import './style.scss'
import { ProfileMenuItems } from '@/mocks/home.data'

const { Sider, Content } = Layout

const MainProfile = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Layout className="min-h-screen overflow-hidden">
      <Sider width="15%" style={{ backgroundColor: '#252E38' }}>
        <img src={HOME_ICON.LOGO_TEXT} alt="logo" className="xs:hidden xl:block" />
        <img src={LOGO.APP_LOGO} alt="logo" className="xl:hidden xs:block" />
        <ul className="mt-12 lg:ml-16 lg:flex-none xl:ml-10 xs:ml-2 ss:ml-3 xss:ml-4 smm:ml-7 md:ml-10">
          {ProfileMenuItems.map((item) => (
            <li className="py-6" key={item.key}>
              <Button
                icon={<item.Icon />}
                className="menu h-full border-0 p-0 text-xl font-popins text-gray-300 flex justify-center items-center"
              >
                <p className="m-0 xl:block xs:hidden">{item.label}</p>
              </Button>
            </li>
          ))}
        </ul>
      </Sider>
      <Layout>
        <Content className="bg-blue-900">
          <img
            src="https://images.unsplash.com/photo-1704972841788-86fac20fc87e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="cover"
            className="h-44 w-full"
          />
          <div className="relative">
            <Avatar
              size={100}
              className="absolute -top-32 left-8 z-10"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <Form
              name="basic"
              className="mt-20 w-full md:w-2/3 flex flex-col items-center relative"
              onFinish={onFinish}
            >
              <Row className="w-full" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <h3 className="absolute -top-2 left-3 px-2 mb-0 text-gray-300 bg-blue-900 z-10 rounded-md">
                    Username
                  </h3>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: (
                          <Alert
                            className="bg-transparent text-base text-red-400"
                            message="Invalid username"
                            banner
                            type="error"
                          />
                        ),
                      },
                    ]}
                    className="border-2 rounded-lg border-gray-300 w-full mb-10 flex flex-col"
                  >
                    <Input className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
                  </Form.Item>
                  <h3 className="absolute top-24 left-3 px-2 mb-0 text-gray-300 bg-blue-900 z-10 rounded-md">Email</h3>
                  <Form.Item
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
                    ]}
                    className="border-2 rounded-lg border-gray-300 w-full mb-10 flex flex-col"
                  >
                    <Input className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
                  </Form.Item>
                  <h3 className="absolute top-24 left-3 px-2 mb-0 text-gray-300 bg-blue-900 z-10 rounded-md">
                    Date of Birth
                  </h3>
                  <Form.Item
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
                    ]}
                    className="mt-2 border-2 rounded-lg border-gray-300 w-full mb-10 flex flex-col"
                  >
                    <Input
                      type="password"
                      className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <h3 className="absolute -top-2 left-3 px-2 mb-0 text-gray-300 bg-blue-900 z-10 rounded-md">Email</h3>
                  <Form.Item
                    name="address"
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
                    ]}
                    className="border-2 rounded-lg border-gray-300 w-full mb-10 flex flex-col"
                  >
                    <Input className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
                  </Form.Item>
                  <h3 className="absolute top-24 left-3 px-2 mb-0 text-gray-300 bg-blue-900 z-10 rounded-md">
                    Date of Birth
                  </h3>
                  <Form.Item
                    name="abc"
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
                    ]}
                    className="mt-2 border-2 rounded-lg border-gray-300 w-full mb-10 flex flex-col"
                  >
                    <Input
                      type="cde"
                      className="h-14 bg-transparent border-none text-white focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item className="w-2/3 mt-2">
                <Button type="primary" htmlType="submit" className="h-12 w-30 bg-orange-400">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainProfile
