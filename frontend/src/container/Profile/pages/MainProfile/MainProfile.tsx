import { Alert, Avatar, Button, Form, Input, Layout, Modal, Radio, RadioChangeEvent, Typography } from 'antd'
import './style.scss'
import { useEffect, useRef, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { CameraOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '@/redux/config'
import requestApi from '@/utils/interceptors'
import { toast } from 'react-toastify'
import { ProfileType } from '@/@types/form.type'
import { StatusCodes } from 'http-status-codes'
import { useNavigate } from 'react-router-dom'
import Fancybox from '@/components/Fancybox'
import { objectLength } from '@/utils/setting'
import { userType } from '@/@types/user.type'
import Title from 'antd/es/typography/Title'
import { setFollowerList } from '@/redux/userReducer/userReducer'

const { Content } = Layout

const MainProfile = () => {
  const isAuthenticated: boolean = useSelector((state: RootState) => state.user.isAuthenticated)
  const followList: userType[] = useSelector((state: RootState) => state.user.followList)
  const followerList: userType[] = useSelector((state: RootState) => state.user.followerList)
  const navigate = useNavigate()
  const dispatch: DispatchType = useDispatch()

  const [userData, setUserData] = useState({
    username: '',
    fullname: '',
    phone: '',
    date_of_birth: '',
    address: '',
    bio: '',
    avatar: '',
    cover_photo: '',
  })
  //state of radio button gender
  const [gender, setGender] = useState()
  const onChange = (e: RadioChangeEvent) => {
    setGender(e.target.value)
  }

  //function inplement updating information of user
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

  //get information of user
  const fetchUser = async () => {
    try {
      const res = await requestApi('users/@me/profile', 'GET', {})
      const { username, fullname, phone, date_of_birth, address, gender, bio, avatar, cover_photo } = res.data.data
      setUserData({ username, fullname, phone, date_of_birth, address, bio, avatar, cover_photo })
      setGender(gender)
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
  }, [isAuthenticated, userData.avatar, userData.cover_photo, followList])

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
      const updateUser = { ...userData, avatar: avatarUrl }
      setUserData(updateUser)

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
      const updateUser = { ...userData, cover_photo: thumbnailUrl }
      setUserData(updateUser)

      toast.update(uploadCover, { render: message, isLoading: false, type: 'success', autoClose: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  //for modal of list following
  const [isModalFollowingOpen, setIsModalFollowingOpen] = useState(false)
  const showModalFollowing = async () => {
    setIsModalFollowingOpen(true)
  }

  const handleFollowingOk = () => {
    setIsModalFollowingOpen(false)
  }

  const handleFollowingCancel = () => {
    setIsModalFollowingOpen(false)
  }

  //for modal of list follower
  const [isModalFollowerOpen, setIsModalFollowerOpen] = useState(false)
  //state list of users that are following me
  const showModalFollower = async () => {
    setIsModalFollowerOpen(true)
    try {
      const res = await requestApi('users/followers', 'GET', {})
      console.log(res.data.data)

      // dispatch(setFollowerList(res.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleFollowerOk = () => {
    setIsModalFollowerOpen(false)
  }

  const handleFollowerCancel = () => {
    setIsModalFollowerOpen(false)
  }

  return (
    <Layout className="min-h-screen overflow-hidden">
      <Layout>
        <Content className="bg-blue-900">
          <div className="relative">
            <Fancybox>
              <a href={userData.cover_photo} data-fancybox="gallery">
                <img src={userData.cover_photo} alt="cover" className="xs:h-36 lg:h-44 3xl:h-80 w-full object-cover" />
              </a>
            </Fancybox>

            <input style={{ display: 'none' }} ref={coverRef} type="file" onChange={handleFileThumbnailChange} />
            <Button
              className="absolute btn-cover right-10 top-5 h-8 w-40 bg-purple-600 border-2 border-white rounded-full font-popins text-sm text-white btn-hover"
              icon={<CameraOutlined />}
              onClick={handleChangeCoverClick}
            >
              Change Cover
            </Button>
          </div>
          <div className="relative">
            <Fancybox>
              <a href={userData.avatar} data-fancybox="gallery">
                <Avatar
                  size={{ xs: 80, sm: 90, md: 90, lg: 100, xl: 120, xxl: 140 }}
                  className="absolute xs:-top-32 lg:-top-[140px] xl:-top-[150px] xs:left-3 lg:left-32 3xl:-top-60 z-10 border-2 border-white"
                  src={userData.avatar}
                />
              </a>
            </Fancybox>
            <div className="absolute xs:-top-[85px] lg:-top-[95px] 3xl:-top-[180px] xl:-top-[95px] xs:left-28 lg:left-64 xl:left-64 3xl:left-72 z-10 font-popins text-white">
              <h2 className="text-xl">Ngoc Uyen</h2>
              <p>
                <span className="cursor-pointer" onClick={showModalFollowing}>
                  {objectLength(followList)} following
                </span>
                <Modal
                  className="p-0"
                  styles={{
                    body: { maxHeight: '500px', background: '#ffffff33', borderRadius: 'inherit' },
                    content: { height: '100%', overflowY: 'auto' },
                  }}
                  open={isModalFollowingOpen}
                  onOk={handleFollowingOk}
                  onCancel={handleFollowingCancel}
                  footer={null}
                >
                  <div className="py-3 px-5">
                    <Title level={2}>Following</Title>
                    {followList.map((user: userType) => (
                      <div
                        key={user._id}
                        className="flex justify-between items-center my-2 rounded-lg border-2 py-2 px-4 cursor-pointer"
                      >
                        <div>
                          <Avatar
                            size={60}
                            src={
                              user.avatar === ''
                                ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                : user.avatar
                            }
                          />
                          <span className="font-popins text-lg ml-4">{user.username}</span>
                        </div>
                        <Button className="font-popins text-white bg-blue-900 border-0">Following</Button>
                      </div>
                    ))}
                  </div>
                </Modal>
                <span className="ml-6 cursor-pointer" onClick={showModalFollower}>
                  {objectLength(followerList) > 1 ? `${objectLength(followerList)} ` + 'followers' : 'follower'}
                </span>
                <Modal
                  className="p-0"
                  styles={{
                    body: { maxHeight: '500px', background: '#ffffff33', borderRadius: 'inherit' },
                    content: { height: '100%', overflowY: 'auto' },
                  }}
                  open={isModalFollowerOpen}
                  onOk={handleFollowerOk}
                  onCancel={handleFollowerCancel}
                  footer={null}
                >
                  <div className="py-3 px-5">
                    <Title level={2}>Followers</Title>
                    {followerList.map((user: userType) => (
                      <div
                        key={user._id}
                        className="flex justify-between items-center my-2 rounded-lg border-2 py-2 px-4 cursor-pointer"
                      >
                        <div>
                          <Avatar
                            size={60}
                            src={
                              user.avatar === ''
                                ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                : user.avatar
                            }
                          />
                          <span className="font-popins text-lg ml-4">{user.username}</span>
                        </div>
                        <Button className="font-popins text-white bg-blue-900 border-0">Following</Button>
                      </div>
                    ))}
                  </div>
                </Modal>
              </p>
            </div>
            <input name="image" style={{ display: 'none' }} ref={inputRef} type="file" onChange={handleFileChange} />
            <Button
              className="absolute btn-avatar xs:-top-20 smm:-top-[70px] lg:-top-[80px] xl:-top-[60px] 3xl:-top-[135px] xs:left-16 smm:left-[70px] lg:left-52 xl:left-52 3xl:left-56 z-10 bg-purple-600 text-white rounded-full p-0 m-0 border-4 border-blue-900"
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
                    value: userData.fullname,
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
                    <Form.Item name="fullname" className="border-2 rounded-lg border-white w-full mb-8 flex flex-col">
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
