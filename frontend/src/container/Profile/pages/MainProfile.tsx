import { HOME_ICON, LOGO } from '@/constants/images'
import { Alert, Avatar, Button, Form, Input, Layout, Radio, RadioChangeEvent } from 'antd'
import './style.scss'
import { ProfileMenuItems } from '@/mocks/home.data'
import { useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { CameraOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/config'
import requestApi from '@/utils/interceptors'
import { toast } from 'react-toastify'
import { ProfileType } from '@/@types/form.type'
import { StatusCodes } from 'http-status-codes'

const { Content } = Layout

const MainProfile = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)

  const [userData, setUserData] = useState({
    username: '',
    fullName: '',
    phone: '',
    date_of_birth: '',
    address: '',
    bio: '',
  })

  const [gender, setGender] = useState()
  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value)
  }
  const onFinish = async (values: ProfileType) => {
    const user = { ...values, gender }
    console.log(user)

    const loadingToast = toast.loading('Updating...')
    try {
      const res = await requestApi('users/@me/profile', 'PUT', user)
      const { message } = res.data
      toast.update(loadingToast, {
        render: message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch (error: any) {
      const { message } = error.response.data
      let errMessage = message
      if (error.response.status === StatusCodes.UNPROCESSABLE_ENTITY && error.response.data) {
        const { msg } = error.response.data.errors.address
        errMessage = msg
      }
      toast.update(loadingToast, {
        render: errMessage,
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })
    }
  }

  useEffect(() => {
    ;(async () => {
      if (isAuthenticated) {
        try {
          const res = await requestApi('users/@me/profile', 'GET', {})
          const { username, fullName, phone, date_of_birth, address, gender, bio } = res.data.data
          setUserData({ username, fullName, phone, date_of_birth, address, bio })
          setGender(gender)
          console.log(gender)
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [isAuthenticated])
  return (
    <Layout className="min-h-screen overflow-hidden">
      <Layout>
        <Content className="bg-blue-900">
          <img
            src="https://images.unsplash.com/photo-1704972841788-86fac20fc87e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="cover"
            className="xs:h-36 lg:h-44 3xl:h-80 w-full"
          />
          <div className="relative">
            <Avatar
              size={{ xs: 80, sm: 90, md: 90, lg: 100, xl: 120, xxl: 140 }}
              className="absolute xs:-top-32 lg:-top-40 xs:left-3 lg:left-32 3xl:-top-60 z-10"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <span className="absolute xs:-top-[85px] lg:-top-[115px] 3xl:-top-[180px] xl:-top-[110px] xs:left-28 lg:left-64 xl:left-64 3xl:left-72 z-10 text-xl font-popins text-white">
              Ngoc Uyen
            </span>
            <Button
              className="absolute xs:-top-20 smm:-top-[70px] lg:-top-[100px] xl:-top-[75px] 3xl:-top-[135px] xs:left-16 smm:left-[70px] lg:left-52 xl:left-52 3xl:left-56 z-10 bg-blue-700 text-white rounded-full p-0 m-0 border-4 border-blue-900"
              icon={<CameraOutlined />}
            ></Button>

            <div className="w-full xs:mt-20 lg:mt-24 3xl:mt-44 3xl:px-40 lg:px-40 xs:px-5">
              <Form
                name="basic"
                initialValues={{ remember: true }}
                className="w-full flex flex-col items-center relative mt-4"
                onFinish={onFinish}
                fields={[
                  {
                    name: ['username'],
                    value: userData.username,
                  },
                  {
                    name: ['fullname'],
                    value: userData.fullName,
                  },
                  {
                    name: ['phone'],
                    value: userData.phone,
                  },
                  {
                    name: ['date_of_birth'],
                    value: userData.date_of_birth.split('T')[0],
                  },
                  {
                    name: ['address'],
                    value: userData.address,
                  },
                  {
                    name: ['bio'],
                    value: userData.bio,
                  },
                ]}
              >
                <div className="flex flex-col w-full lg:flex-row lg:gap-12 3xl:gap-16">
                  <div className="w-full relative">
                    <h3 className="absolute -top-3 left-3 px-2 mb-0 text-white bg-blue-900 z-10 rounded-md">
                      Username
                    </h3>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: (
                            <Alert
                              className="bg-transparent xs:text-xs lg:text-base text-red-700"
                              message="Please input your username"
                              banner
                              type="error"
                            />
                          ),
                        },
                      ]}
                      className="border-2 rounded-lg border-white w-full mb-8 flex flex-col"
                    >
                      <Input className="h-12 bg-transparent border-none text-white text-base focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
                    </Form.Item>
                  </div>

                  <div className="w-full relative">
                    <h3 className="absolute -top-3 left-3 px-2 mb-0 text-white bg-blue-900 z-10 rounded-md">
                      Full name
                    </h3>
                    <Form.Item
                      name="fullname"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: (
                      //       <Alert
                      //         className="bg-transparent xs:text-xs lg:text-base text-red-700"
                      //         message="Please input your fullname"
                      //         banner
                      //         type="error"
                      //       />
                      //     ),
                      //   },
                      // ]}
                      className="border-2 rounded-lg border-white w-full mb-8 flex flex-col"
                    >
                      <Input className="h-12 bg-transparent border-none text-white text-base focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none " />
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:flex-row lg:gap-12 3xl:gap-16">
                  <div className="w-full relative">
                    <h3 className="absolute -top-3 left-3 px-2 mb-0 text-white bg-blue-900 z-10 rounded-md">Phone</h3>
                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: (
                            <Alert
                              className="bg-transparent xs:text-xs lg:text-base text-red-700"
                              message="Please input your phone"
                              banner
                              type="error"
                            />
                          ),
                        },
                      ]}
                      className="border-2 rounded-lg border-white w-full mb-8 flex flex-col"
                    >
                      <Input className="h-12 bg-transparent border-none text-white text-base focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none " />
                    </Form.Item>
                  </div>
                  <div className="w-full relative">
                    <h3 className="absolute -top-3 left-3 px-2 mb-0 text-white bg-blue-900 z-10 rounded-md">
                      Date of birth
                    </h3>
                    <Form.Item
                      name="date_of_birth"
                      rules={[
                        {
                          required: true,
                          message: (
                            <Alert
                              className="bg-transparent xs:text-xs lg:text-base text-red-700"
                              message="Please input your date of birth"
                              banner
                              type="error"
                            />
                          ),
                        },
                      ]}
                      className="border-2 rounded-lg border-white w-full mb-8 flex flex-col"
                    >
                      <Input
                        className="h-12 bg-transparent border-none text-white text-base focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none"
                        placeholder="YYYY-MM-DD"
                      />
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:flex-row lg:gap-12 3xl:gap-16">
                  <div className="w-full relative">
                    <h3 className="absolute -top-3 left-3 px-2 mb-0 text-white bg-blue-900 z-10 rounded-md">Address</h3>
                    <Form.Item
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: (
                            <Alert
                              className="bg-transparent xs:text-xs lg:text-base text-red-700"
                              message="Please input your address"
                              banner
                              type="error"
                            />
                          ),
                        },
                      ]}
                      className="border-2 rounded-lg border-white w-full mb-8 flex flex-col"
                    >
                      <Input className="h-12 bg-transparent border-none text-white text-base focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none" />
                    </Form.Item>
                  </div>
                  <div className="w-full relative flex mt-3">
                    <h3 className="text-white xs:text-sm ss:text-base">Gender</h3>
                    <Form.Item className="xs:ml-8 lg:ml-20">
                      <Radio.Group onChange={onChange} value={gender}>
                        <Radio value="Male" className="text-white font-popins" checked={gender === 'Male'}>
                          Male
                        </Radio>
                        <Radio
                          value="Female"
                          className="3xl:ml-20 lg:ml-10 xs:mt-2 ss:mt-0 text-white font-popins"
                          checked={gender === 'Female'}
                        >
                          Female
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-col w-full lg:flex-row lg:gap-12 3xl:gap-16">
                  <div className="w-full relative">
                    <h3 className="absolute -top-3 left-3 px-2 mb-0 text-white bg-blue-900 z-10 rounded-md">Bio</h3>
                    <Form.Item
                      name="bio"
                      rules={[
                        {
                          required: true,
                          message: (
                            <Alert
                              className="bg-transparent xs:text-xs lg:text-base text-red-700"
                              message="Please input your bio"
                              banner
                              type="error"
                            />
                          ),
                        },
                      ]}
                      className="border-2 rounded-lg border-white w-full mb-8 flex flex-col h-24"
                    >
                      <TextArea className="h-12 bg-transparent border-none text-white text-base focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none " />
                    </Form.Item>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Form.Item className="mt-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="h-12 w-60 bg-purple-600 border-2 border-white rounded-full font-popins text-base btn-hover"
                    >
                      Update
                    </Button>
                  </Form.Item>
                  <Form.Item className="mt-2">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="h-12 w-60 bg-purple-600 border-2 border-white rounded-full font-popins text-base btn-hover"
                    >
                      Back Home
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainProfile
