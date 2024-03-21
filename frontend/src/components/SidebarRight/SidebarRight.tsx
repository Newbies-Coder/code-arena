import Sider from 'antd/es/layout/Sider'
import { Avatar, Button, Card } from 'antd'
import { HOME_ICON } from '@/constants/images'
import { UserAddOutlined } from '@ant-design/icons'
import './style.scss'
import { useEffect } from 'react'
import requestApi from '@/utils/interceptors'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '@/redux/config'
import { setIsFollow, setNotFollowList } from '@/redux/userReducer/userReducer'
import { toast } from 'react-toastify'
import { userType } from '@/@types/user.type'

const SidebarRight = () => {
  const notFollowList = useSelector((state: RootState) => state.user.notFollowList)
  const isFollow = useSelector((state: RootState) => state.user.isFollow)
  const unfollow = useSelector((state: RootState) => state.user.unfollow)

  const dispatch: DispatchType = useDispatch()
  const getNotFollowUser = async () => {
    try {
      const res = await requestApi('users/not-follows', 'GET', {})
      dispatch(setNotFollowList(res.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotFollowUser()
  }, [isFollow, unfollow])

  const handleFollowUser = async (_id: string) => {
    try {
      const res = await requestApi(`users/follow/${_id}`, 'POST', {})
      toast.success(res.data.message, { autoClose: 3000 })
      dispatch(setIsFollow(true))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Sider
      className="sider fixed mt-16 h-screen right-0 border-l"
      style={{
        position: 'fixed',
        background: '#0e1820',
        borderLeftColor: 'rgba(255, 255, 255, 0.20)',
      }}
      width={'17%'}
    >
      <Card className="bg-blue-900 mx-2 border-gray-opacity px-2">
        <div className="flex justify-between items-end h-full">
          <div>
            <Avatar
              className="bg-gray-200 mb-4"
              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
            ></Avatar>
            <div className="bg-orange-400 h-10 w-8 rounded-md">
              <img src={HOME_ICON.THIRD} className="pt-1" />
            </div>
          </div>
          <div>
            <Avatar
              className="bg-gray-200 mb-4"
              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
            ></Avatar>
            <div className="bg-yellow-200 h-20 w-8 rounded-md">
              <img src={HOME_ICON.FIRST} className="pt-12" />
            </div>
          </div>
          <div>
            <Avatar
              className="bg-gray-200 mb-4"
              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
            ></Avatar>
            <div className="bg-gray-200 h-16 w-8 rounded-md">
              <img src={HOME_ICON.SECOND} className="pt-8" />
            </div>
          </div>
        </div>
      </Card>
      <Card className="bg-blue-900 mx-2 border-gray-opacity mt-5">
        <div className="h-32 bg-gray-500"></div>
      </Card>
      <div className="flex justify-around items-center ">
        <p className="text-gray-opacity self-auto m-0 my-2 mr-40">New Members</p>
      </div>
      <div className="list-friend overflow-y-auto h-[260px]">
        <ul>
          {notFollowList.map((user: userType) => (
            <li className="mx-0 mt-2" key={user._id}>
              <Card
                size="small"
                className="relative bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                style={{ width: '95%', marginLeft: '5px' }}
                bodyStyle={{ padding: '10px 12px' }}
              >
                <div className="flex  items-center p-0">
                  <Avatar
                    size={40}
                    className="flex justify-center items-center bg-gray-300 relative"
                    src={
                      user.avatar === ''
                        ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        : user.avatar
                    }
                  ></Avatar>
                  <span
                    className={
                      user.isOnline === true
                        ? 'absolute rounded-full h-3 w-3 border bg-green-400 bottom-3 left-10'
                        : 'absolute rounded-full h-3 w-3 border bg-gray-500 bottom-3 left-10'
                    }
                  ></span>
                  <div className="ml-2">
                    <p className="m-0 text-white font-popins text-xs">{user.username}</p>
                    <span className="text-gray-opacity">{user.isOnline === true ? 'online' : 'offline'}</span>
                  </div>
                  <div className="absolute w-14 right-10 bottom-3">
                    <Button
                      className="btn-follow h-4 p-0 ml-8 w-auto border-gray-opacity text-[10px] text-yellow-200"
                      icon={<UserAddOutlined />}
                      onClick={() => {
                        handleFollowUser(user._id)
                        dispatch(setIsFollow(false))
                      }}
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Sider>
  )
}

export default SidebarRight
