import { SYS } from '@/constants/images'
import { CameraOutlined, EditFilled } from '@ant-design/icons'
import { Alert, Button, Form, Input, Radio } from 'antd'
import './style.scss'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { ProfileDataType } from '@/@types/admin.type'
import requestApi from '@/utils/interceptors'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { handleApiError } from '@/utils/handleApiError'
import axios from 'axios'
import { ACCESS_TOKEN, getStore } from '@/utils/setting'

export default function MainProfile() {
  const [profileData, setProfileData] = useState<ProfileDataType>({
    fullName: '',
    username: '',
    phone: '',
    date_of_birth: '',
    address: '',
    gender: '',
    avatar: '',
    cover_photo: '',
  })
  const [maleCheck, setMaleCheck] = useState<boolean>(true)
  const [formDisable, setFormDisable] = useState<boolean>(true)
  const token = getStore(ACCESS_TOKEN)
  const avatarRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)

  const handleChangeAvatarClick = () => {
    if (avatarRef.current) {
      avatarRef.current.click()
    }
  }

  const handleChangeCoverClick = () => {
    if (coverRef.current) {
      coverRef.current.click()
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('users/@me/profile', 'GET', {})
        const { username, fullName, phone, date_of_birth, address, gender, avatar, cover_photo } = res.data.data
        if (gender === 'Male') setMaleCheck(true)
        else setMaleCheck(false)
        setProfileData({ username, fullName, phone, date_of_birth, address, gender, avatar, cover_photo })
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const onFinish = async (values: ProfileDataType) => {
    const { username, fullName, address, date_of_birth, phone, gender } = values
    const loadingToast = toast.loading('Updating...')
    try {
      const res = await requestApi('users/@me/profile', 'PUT', {
        fullName,
        username,
        address,
        date_of_birth,
        phone,
        gender,
      })
      const { message } = res.data
      toast.update(loadingToast, {
        render: message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch (error) {
      handleApiError(error)
      toast.clearWaitingQueue()
    }
  }

  //upload avatar
  const handleFileAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    //  reset file input
    event.target.files = null

    const formData = new FormData()
    formData.append('image', fileObj)
    const uploadAvatar = toast.loading('Updating...')
    try {
      const res = await axios.post('http://localhost:8080/api/v1/users/@me/avatar', formData, {
        //config header for file data
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      const { message } = res.data
      const { avatarUrl } = res.data.data
      setProfileData((pre) => ({ ...pre, avatar: avatarUrl }))
      toast.update(uploadAvatar, { render: message, isLoading: false, type: 'success', autoClose: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  //upload cover photo
  const handleFileThumbnailChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    //  reset file input
    event.target.files = null

    const formData = new FormData()
    formData.append('image', fileObj)
    const uploadCover = toast.loading('Updating...')
    try {
      const res = await axios.post('http://localhost:8080/api/v1/users/@me/thumbnail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      const { message } = res.data
      const { thumbnailUrl } = res.data.data
      setProfileData((prev) => ({ ...prev, cover_photo: thumbnailUrl }))
      toast.update(uploadCover, { render: message, isLoading: false, type: 'success', autoClose: 3000 })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="main-profile">
      <div className="relative w-full h-64">
        <img
          src={profileData.cover_photo ? profileData.cover_photo : SYS.IMAGE.BG_PROFILE}
          alt=""
          className="w-full object-fill h-64"
          key={profileData.avatar}
        />
        <input style={{ display: 'none' }} ref={coverRef} type="file" onChange={handleFileThumbnailChange} />
        <Button
          icon={<CameraOutlined />}
          className="absolute top-8 right-8 text-white"
          onClick={handleChangeCoverClick}
        >
          Change Cover
        </Button>
      </div>
      <div className="flex flex-col items-center w-full h-full lg:flex-row p-4">
        <div className="w-full lg:justify-center lg:w-2/5 lg:flex lg:flex-col lg:items-center">
          <div className="relative flex justify-center">
            <img
              src={profileData.avatar ? profileData.avatar : 'https://i.imgur.com/en3BKmy.png'}
              alt=""
              className="w-64 h-64 rounded-full"
              key={profileData.avatar}
            />
            <input style={{ display: 'none' }} ref={avatarRef} type="file" onChange={handleFileAvatarChange} />
            <CameraOutlined
              className="text-2xl bg-[#7b61ff] p-3 rounded-full text-white absolute bottom-0 ml-24 border border-black cursor-pointer"
              onClick={handleChangeAvatarClick}
            />
          </div>
          <h3 className="mt-4 text-4xl text-center text-white">{profileData.fullName}</h3>
        </div>
        <div className="w-full lg:w-3/5">
          <div className="float-right mb-2 ">
            <Button
              className="border-none text-white  flex items-center justify-center"
              onClick={() => setFormDisable((pre) => !pre)}
            >
              <EditFilled />
              <span className="text-lg">{formDisable ? 'Edit' : 'Not Edit'}</span>
            </Button>
          </div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            className="w-full flex flex-col items-center relative mt-4 text-white"
            disabled={formDisable}
            onFinish={onFinish}
            fields={[
              {
                name: ['name'],
                value: profileData.fullName,
              },
              {
                name: ['username'],
                value: profileData.username,
              },
              {
                name: ['phone'],
                value: profileData.phone,
              },
              {
                name: ['date_of_birth'],
                value: profileData.date_of_birth ? format(profileData.date_of_birth, 'yyyy-MM-dd') : '',
              },
              {
                name: ['address'],
                value: profileData.address,
              },
              {
                name: ['gender'],
                value: profileData.gender,
              },
            ]}
          >
            <div className="flex flex-col w-full lg:flex-row lg:gap-6">
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">Name</h3>
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
                  className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
                >
                  <Input
                    className="h-12 bg-transparent border-none text-white text-md focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder={profileData.fullName}
                    style={{ color: 'white' }}
                  />
                </Form.Item>
              </div>
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">Username</h3>
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
                  className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
                >
                  <Input
                    className="h-12 bg-transparent border-none text-white text-md focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder={profileData.username}
                    style={{ color: 'white' }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col w-full lg:flex-row lg:gap-6">
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">Phone</h3>
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
                    {
                      pattern: /^0\d{9}$/g,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Phone not valid!"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
                >
                  <Input
                    type="number"
                    className="h-12 bg-transparent border-none text-white text-md focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder={profileData.phone}
                    style={{ color: 'white' }}
                  />
                </Form.Item>
              </div>
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">
                  Date Of Birth
                </h3>
                <Form.Item
                  name="date_of_birth"
                  rules={[
                    {
                      type: 'date',
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Format date of birth is not valid"
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
                          message="Please input your date of birth"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
                  style={{ color: 'white' }}
                >
                  <Input
                    className="h-12 bg-transparent border-none text-white text-md focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder={
                      profileData.date_of_birth !== '' ? format(profileData.date_of_birth, 'yyyy-MM-dd') : ''
                    }
                    style={{ color: 'white' }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col w-full lg:flex-row lg:gap-6">
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">Address</h3>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please input your address"
                          banner
                          type="error"
                        />
                      ),
                    },
                    {
                      pattern: /^.{10,255}$/g,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Address is not valid"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className="border-2 rounded-lg border-white w-full mb-10 flex flex-col"
                >
                  <Input
                    type="text"
                    className="h-12 bg-transparent border-none text-white text-md focus:shadow-none focus:border-none focus:outline-none focus-visible:shadow-none focus-visible:border-none focus-visible:outline-none placeholder:text-[#7b7878]"
                    placeholder={profileData.address}
                    style={{ color: 'white' }}
                  />
                </Form.Item>
              </div>
              <div className="w-full relative">
                <h3 className="absolute -top-2 left-3 px-2 mb-0 text-white bg-[#001529] z-10 rounded-md">Gender</h3>
                <Form.Item
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: (
                        <Alert
                          className="bg-transparent text-base text-red-700"
                          message="Please select a gender"
                          banner
                          type="error"
                        />
                      ),
                    },
                  ]}
                  className=""
                >
                  <Radio.Group className="mt-5 text-white ml-5">
                    <Radio value="Male" className="text-white text-xl" checked={maleCheck}>
                      Male
                    </Radio>
                    <Radio value="Female" className="text-white text-xl" checked={!maleCheck}>
                      Female
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>

            <Form.Item className="w-full flex justify-center mt-2">
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center justify-center bg-gradient-to-tr --tw-gradient-stops from-[#6A5AF9] to-[#D66EFD] py-4 px-4 text-lg md:text-2xl font-bold h-10 md:h-16 w-[280px] border-none rounded-tl-[30px] rounded-bl-[50px] rounded-tr-[50px] rounded-br-[30px] hover:bg-gradient-to-l hover:bg-white"
              >
                Update
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
