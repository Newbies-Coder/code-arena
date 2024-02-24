import { Alert, Avatar, Button, Form, Input, Layout, Radio, RadioChangeEvent } from 'antd'
import './style.scss'
import { useEffect, useRef, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { CameraOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/config'
import requestApi from '@/utils/interceptors'
import { toast } from 'react-toastify'
import { ProfileType } from '@/@types/form.type'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router-dom'
import Fancybox from '@/components/Fancybox'

const { Content } = Layout

const MainProfile = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    username: '',
    fullName: '',
    phone: '',
    date_of_birth: '',
    address: '',
    bio: '',
    avatar: '',
    cover_photo: '',
  })

  const [avatarURL, setAvatarURL] = useState('')
  const [coverURL, setCoverURL] = useState('')
  const [gender, setGender] = useState()

  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value)
  }
  const onFinish = async (values: ProfileType) => {
    const user = { ...values, gender }
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

  const fetchUser = async () => {
    try {
      const res = await requestApi('users/@me/profile', 'GET', {})
      const { username, fullName, phone, date_of_birth, address, gender, bio, avatar, cover_photo } = res.data.data
      setUserData({ username, fullName, phone, date_of_birth, address, bio, avatar, cover_photo })
      setGender(gender)
      setAvatarURL(avatar)
      setCoverURL(cover_photo)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (isAuthenticated) {
        fetchUser()
      }
    })()
  }, [isAuthenticated, avatarURL, coverURL])

  const inputRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const handleChangeAvatarClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleChangeCoverClick = () => {
    if (coverRef.current) {
      coverRef.current.click()
    }
  }

  //upload avatar
  const handleFileChange = async (event: any) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    //  reset file input
    event.target.value = null

    let formData = new FormData()
    formData.append('image', fileObj)
    const uploadAvatar = toast.loading('Updating...')
    try {
      const res = await requestApi('users/@me/avatar', 'POST', formData, {
        'Content-Type': 'multipart/form-data',
      })
      const { message } = res.data
      const { avatarUrl } = res.data.data
      setAvatarURL(avatarUrl)

      toast.update(uploadAvatar, { render: message, isLoading: false, type: 'success', autoClose: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  //upload cover photo
  const handleFileThumbnailChange = async (event: any) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    //  reset file input
    event.target.value = null

    let formData = new FormData()
    formData.append('image', fileObj)
    const uploadCover = toast.loading('Updating...')
    try {
      const res = await requestApi('users/@me/thumbnail', 'POST', formData, {
        'Content-Type': 'multipart/form-data',
      })
      const { message } = res.data
      const { thumbnailUrl } = res.data.data
      setCoverURL(thumbnailUrl)

      toast.update(uploadCover, { render: message, isLoading: false, type: 'success', autoClose: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout className="min-h-screen overflow-hidden">
      <Layout>
        <Content className="bg-blue-900">
          <div className="relative">
            <Fancybox>
              <a href={coverURL} data-fancybox="gallery">
                <img src={coverURL} alt="cover" className="xs:h-36 lg:h-44 3xl:h-80 w-full object-cover" />
              </a>
            </Fancybox>

            <input style={{ display: 'none' }} ref={coverRef} type="file" onChange={handleFileThumbnailChange} />
            <Button
              className="absolute btn-cover right-10 top-5 border-white border-2 bg-gray-opacity font-popins text-white"
              icon={<CameraOutlined />}
              onClick={handleChangeCoverClick}
            >
              Change Cover
            </Button>
          </div>
          <div className="relative">
            <Fancybox>
              <a href={avatarURL} data-fancybox="gallery">
                <Avatar
                  size={{ xs: 80, sm: 90, md: 90, lg: 100, xl: 120, xxl: 140 }}
                  className="absolute xs:-top-32 lg:-top-[140px] xl:-top-[150px] xs:left-3 lg:left-32 3xl:-top-60 z-10"
                  src={avatarURL}
                />
              </a>
            </Fancybox>
            <div className="absolute xs:-top-[85px] lg:-top-[95px] 3xl:-top-[180px] xl:-top-[95px] xs:left-28 lg:left-64 xl:left-64 3xl:left-72 z-10 font-popins text-white">
              <h2 className="text-xl">Ngoc Uyen</h2>
              <p>
                <span>0 following</span>
                <span className="ml-6">0 follower</span>
              </p>
            </div>
            <input name="image" style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />
            <Button
              className="absolute btn-avatar xs:-top-20 smm:-top-[70px] lg:-top-[80px] xl:-top-[60px] 3xl:-top-[135px] xs:left-16 smm:left-[70px] lg:left-52 xl:left-52 3xl:left-56 z-10 bg-blue-700 text-white rounded-full p-0 m-0 border-4 border-blue-900"
              icon={<CameraOutlined />}
              onClick={handleChangeAvatarClick}
            ></Button>

            <div className="w-full xs:mt-20 lg:mt-24 3xl:mt-44 3xl:px-40 lg:px-40 xs:px-5">
              <Form
                name="information"
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
                      onClick={() => {
                        navigate('/')
                      }}
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
