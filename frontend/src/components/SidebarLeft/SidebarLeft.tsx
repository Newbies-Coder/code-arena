import { Avatar, Button, Card, Modal, Space, Tabs, Tooltip } from 'antd'
import Sider from 'antd/es/layout/Sider'
import './style.scss'
import { LiPurpleLineIcon, SettingIcon } from '../Icons'
import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import requestApi from '@/utils/interceptors'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '@/redux/config'
import { addToFavorite, setFollowList, setUnFollow } from '@/redux/userReducer/userReducer'
import { userType } from '@/@types/user.type'
import { MessageOutlined, StarFilled, StarOutlined, UserAddOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { objectLength } from '@/utils/setting'
import Title from 'antd/es/typography/Title'

const onChange = (key: string) => {
  console.log(key)
}

const SidebarLeft = () => {
  //get follow list from store
  const followList = useSelector((state: RootState) => state.user.followList)
  const dispatch: DispatchType = useDispatch()
  const isFollow = useSelector((state: RootState) => state.user.isFollow)
  const unfollow = useSelector((state: RootState) => state.user.unfollow)
  const [buttonState, setButtonState] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('users/follows', 'GET', {})
        dispatch(setFollowList(res.data.data))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [isFollow, unfollow])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<userType>({ cover_photo: '', avatar: '', _id: '', username: '' })
  const [followingUserList, setFollowingUserList] = useState([])
  const [followedUserList, setFollowedUserList] = useState([])
  const [favoriteList, setFavoriteList] = useState<userType[]>([])
  const showModal = async (_id: string) => {
    setIsModalOpen(true)
    setButtonState(false)
    Promise.all([
      requestApi(`users/profile/${_id}`, 'GET', {}),
      requestApi(`users/${_id}/followers`, 'GET', {}),
      requestApi(`users/${_id}/following`, 'GET', {}),
      requestApi('users/favorite', 'GET', {}),
    ])
      .then(async ([resProfile, resFollower, resFollowing, resFavoriteList]) => {
        const resultProfile = await resProfile.data
        const resultFollower = await resFollower.data
        const resultFollowing = await resFollowing.data
        const resultFavoriteList = await resFavoriteList.data
        setSelectedUser(resultProfile.data)
        setFollowedUserList(resultFollower.data)
        setFollowingUserList(resultFollowing.data)
        setFavoriteList(resultFavoriteList.data.items)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleUnfollow = async (_id: string) => {
    try {
      const res = await requestApi(`users/unfollow/${_id}`, 'DELETE', {})
      toast.success(res.data.message)
      dispatch(setUnFollow(true))
    } catch (error) {
      console.log(error)
    }
  }

  //function of adding user to favorite following list
  const handleLikeUser = async (_id: string) => {
    try {
      const res = await requestApi('users/favorite', 'POST', { friendId: _id })
      console.log(res)
      toast.success(res.data.message)
      dispatch(addToFavorite(true))
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  //function of removing user to favorite following list
  const handleUnlikeUser = async (_id: string) => {
    try {
      const res = await requestApi(`users/favorite/${_id}`, 'DELETE', {})
      console.log(res)
      toast.success(res.data.message)
      dispatch(addToFavorite(false))
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const isLike = (list: userType[], id: string) => {
    const hadFollowed = list.some((obj: userType) => obj._id === id)
    return hadFollowed
  }

  return (
    <Sider
      className="sider-left mt-16 h-screen left-0 border-r lg:block z-10"
      style={{
        position: 'fixed',
        background: '#0e1820',
        borderRightColor: 'rgba(255, 255, 255, 0.20)',
      }}
      width={'17%'}
    >
      <div className="flex flex-col justify-between w-full pt-2">
        <Navbar />
        <div>
          <p className="text-gray-opacity self-auto ml-2 mb-1">Your Friends</p>
        </div>
        <div className="list-member overflow-y-auto h-[282px]">
          <ul>
            {followList.map((follower: userType) => (
              <li className="mx-0 mt-2" key={follower._id}>
                <Card
                  size="small"
                  className="bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                  style={{ width: '95%', marginLeft: '5px', cursor: 'pointer' }}
                  bodyStyle={{ padding: '10px 12px' }}
                  onClick={() => showModal(follower._id)}
                >
                  <div className="flex items-center p-0">
                    <Avatar
                      size={40}
                      className="flex justify-center items-center bg-gray-300"
                      src={
                        follower.avatar === ''
                          ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                          : follower.avatar
                      }
                    ></Avatar>
                    <span
                      className={
                        follower.isOnline === true
                          ? 'absolute rounded-full h-3 w-3 border bg-green-400 bottom-3 left-10'
                          : 'absolute rounded-full h-3 w-3 border bg-gray-500 bottom-3 left-10'
                      }
                    ></span>
                    <div className="ml-4">
                      <p className="m-0 text-white font-popins text-xs">{follower.username}</p>
                      <span className="text-gray-opacity">{follower.isOnline === true ? 'online' : 'offline'}</span>
                    </div>
                  </div>
                </Card>
                <Modal
                  className="p-0"
                  styles={{ body: { height: '500px' }, content: { overflowY: 'auto' } }}
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <div className="w-full">
                    <img
                      className="object-cover h-56 w-full"
                      src={
                        selectedUser.cover_photo === ''
                          ? 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                          : selectedUser.cover_photo
                      }
                      alt="cover"
                    />
                    <Avatar
                      size={150}
                      src={
                        selectedUser.avatar === ''
                          ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                          : selectedUser.avatar
                      }
                      className="-mt-20 ml-4 border-1 border-black"
                    />
                    <h2 className="font-popins text-lg -mt-[72px] ml-44 mb-0">{selectedUser.username}</h2>
                    <Tooltip title="Add to favorite list">
                      <Button
                        className="absolute -mt-16 right-64 bg-black text-yellow-300"
                        shape="circle"
                        icon={isLike(favoriteList, selectedUser._id) ? <StarFilled /> : <StarOutlined />}
                        onClick={() => {
                          isLike(favoriteList, selectedUser._id)
                            ? handleUnlikeUser(selectedUser._id)
                            : handleLikeUser(selectedUser._id)
                        }}
                      />
                    </Tooltip>
                    <Button
                      className="absolute font-popins -mt-16 right-32 bg-blue-900 text-white"
                      icon={<MessageOutlined />}
                    >
                      Message
                    </Button>
                    <Button
                      className="absolute font-popins -mt-16 right-2 bg-blue-900 text-white"
                      icon={<UserAddOutlined />}
                      onClick={() => {
                        handleUnfollow(selectedUser._id)
                        dispatch(setUnFollow(false))
                        setButtonState(true)
                        setIsModalOpen(false)
                      }}
                    >
                      {buttonState === false ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Space className="-mt-4">
                      <span className="font-popins text-sm ml-44">{objectLength(followedUserList)} follower</span>
                      <span className="font-popins text-sm">{objectLength(followingUserList)} following</span>
                    </Space>
                  </div>
                  <Tabs
                    className="p-4"
                    defaultActiveKey="1"
                    items={[
                      {
                        key: '1',
                        label: (
                          <Title level={5} style={{ margin: 0 }}>
                            Follower
                          </Title>
                        ),
                        children: (
                          <>
                            {followedUserList.map((user: userType) => (
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
                            ,
                          </>
                        ),
                      },
                      {
                        key: '2',
                        label: (
                          <Title level={5} style={{ margin: 0 }}>
                            Following
                          </Title>
                        ),
                        children: (
                          <>
                            {followingUserList.map((user: userType) => (
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
                            ,
                          </>
                        ),
                      },
                    ]}
                    onChange={onChange}
                  />
                  ;
                </Modal>
              </li>
            ))}
          </ul>
        </div>
        <div className="3xl:mt-56">
          <ul>
            <li className="flex justify-between hover:bg-gray-opacity py-2 mt-2 pr-3">
              <div className="flex items-center">
                <LiPurpleLineIcon />
                <p className="font-popins text-white m-0 pl-6">Theme</p>
              </div>
              <div>
                <input type="checkbox" id="switch" className="switch-input" />
                <label htmlFor="switch" className="switch" />
              </div>
            </li>
            <li className="flex justify-between hover:bg-gray-opacity py-2 mt-2 pr-3">
              <div className="flex items-center">
                <LiPurpleLineIcon />
                <p className="font-popins text-white m-0 pl-6">Setting</p>
              </div>
              <SettingIcon />
            </li>
          </ul>
        </div>
      </div>
    </Sider>
  )
}

export default SidebarLeft
