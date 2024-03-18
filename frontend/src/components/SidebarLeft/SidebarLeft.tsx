import { Avatar, Card } from 'antd'
import Sider from 'antd/es/layout/Sider'
import './style.scss'
import { LiPurpleLineIcon, SettingIcon } from '../Icons'
import Navbar from '../Navbar'
import { useEffect, useState } from 'react'
import requestApi from '@/utils/interceptors'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '@/redux/config'
import { setFollowList } from '@/redux/userReducer/userReducer'

const SidebarLeft = () => {
  //get follow list from store
  const followList = useSelector((state: RootState) => state.user.followList)
  const dispatch: DispatchType = useDispatch()
  const isFollow = useSelector((state: RootState) => state.user.isFollow)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await requestApi('users/follows', 'GET', {})
        dispatch(setFollowList(res.data.data))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [isFollow])

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
            {followList.map((follower) => (
              <li className="mx-0 mt-2" key={follower._id}>
                <Card
                  size="small"
                  className="bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                  style={{ width: '95%', marginLeft: '5px' }}
                  bodyStyle={{ padding: '10px 12px' }}
                >
                  <div className="flex items-center p-0">
                    <Avatar
                      size={40}
                      className="flex justify-center items-center bg-gray-300"
                      src={
                        follower.avatar === ''
                          ? 'https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg'
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
