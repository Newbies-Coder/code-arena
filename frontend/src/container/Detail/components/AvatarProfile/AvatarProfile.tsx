import { DispatchType } from '@/redux/config'
import { setAuthenticationStatus } from '@/redux/userReducer/userReducer'
import { ACCESS_TOKEN, REFRESH_TOKEN, clearCookie, clearStore, getCookie, getStore } from '@/utils/setting'
import { DownOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Dropdown, MenuProps, Row, Space } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RootState } from '@/redux/config'
import requestApi from '@/utils/interceptors'

const AvatarProfile = () => {
  const dispatch: DispatchType = useDispatch()

  const handleLogout = async () => {
    const refresh_token = getCookie(REFRESH_TOKEN)
    const token = getStore(ACCESS_TOKEN)
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/users/logout',
        { refresh_token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const { message } = res.data
      dispatch(setAuthenticationStatus(false))
      clearStore(ACCESS_TOKEN)
      clearCookie(REFRESH_TOKEN)
      toast.success(message, { autoClose: 2000 })
    } catch (error: any) {
      const { message } = error.response.data
      toast.error(message, { autoClose: 2000 })
    }
  }

  const menuItems: MenuProps['items'] = [
    {
      label: <a href="/profile">Profile</a>,
      key: '0',
      style: { width: '150px' },
    },
    {
      type: 'divider',
    },
    {
      label: 'Log out',
      key: '2',
      style: { width: '150px' },
      onClick: handleLogout,
    },
  ]

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  const access_token = getStore(ACCESS_TOKEN)
  const [userData, setUserData] = useState({ username: '', avatar: '' })

  useEffect(() => {
    if (isAuthenticated && access_token) {
      requestApi('users/@me/profile', 'GET', {})
        .then((res) => {
          const { username, avatar } = res.data.data
          setUserData({ username, avatar })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isAuthenticated])

  return (
    <Row>
      <Col xs={24} sm={24} md={0} lg={0} xl={0}>
        <div className="flex justify-between items-center w-10 h-10 bg-blue-900 rounded-full border border-gray-500">
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']} className="text-white">
            <Button className="h-10 w-10 p-0 rounded-full">
              <Avatar size={37} className="flex justify-between items-center bg-gray-300" src={userData.avatar} />
            </Button>
          </Dropdown>
        </div>
      </Col>
      <Col xs={0} md={24} lg={24} xl={24}>
        <div className="flex justify-between items-center w-auto h-10 bg-blue-900 rounded-full border border-gray-500">
          <Avatar size={37} className="flex justify-between items-center bg-gray-300" src={userData.avatar} />
          <div className="flex justify-between items-center pr-2">
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']} className="text-white">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <span className="text-xl ml-2">{userData.username}</span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default AvatarProfile
