import { Avatar, Button, Card, Col, Menu, MenuTheme, Row } from 'antd'
import {
  CyanLineIcon,
  HomeIcon,
  LibraryIcon,
  NewsIcon,
  SelectedHomeIcon,
  SettingIcon,
  StoreIcon,
  UserIcon,
} from '../Icons'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { friendList, menuItems } from '@/mocks/home.data'
import './style.scss'
import { MenuType } from '@/@types/home'
import { log } from 'console'

const SidebarLeft = () => {
  const [visible, setVisible] = useState<MenuType[]>(menuItems)
  const handleClickMenu = (index: number) => {
    const updatedMenuItems = [...menuItems]
    updatedMenuItems[index] = { ...updatedMenuItems[index], active: !updatedMenuItems[index].active }
    setVisible(updatedMenuItems)
  }

  return (
    <Sider
      className="sider-left mt-16 h-screen left-0 border-r lg:block z-10"
      style={{
        position: 'fixed',
        background: '#0e1820',
        borderRightColor: 'rgba(255, 255, 255, 0.20)',
      }}
      width={255}
    >
      <div className="flex flex-col justify-between w-full pt-2">
        <div>
          <ul>
            {menuItems.map((item) => (
              <>
                <li
                  key={item.key}
                  onClick={() => handleClickMenu(item.key)}
                  className={visible[item.key].active ? 'flex justify-between hover:bg-gray-opacity py-2' : 'hidden'}
                >
                  <div className="flex items-center">
                    <item.LineIcon />
                    <p className="font-popins text-white m-0 pl-6">{item.label}</p>
                  </div>
                  <item.Icon className="mr-4" />
                </li>
                <li
                  onClick={() => handleClickMenu(item.key)}
                  className={
                    visible[item.key].active
                      ? `hidden`
                      : `relative flex justify-between ${item.color} py-2 rounded-r-3xl`
                  }
                >
                  <div className="flex items-center">
                    <item.LineIcon />
                    <p className="font-popins text-white m-0 pl-6">{item.label}</p>
                  </div>
                  <div className="absolute bg-black z-10 p-2 rounded-full right-1 bottom-[3px]">
                    <item.IconActive />
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-gray-opacity self-auto ml-2">New Members</p>
        </div>
        <div className="list-member overflow-y-auto h-[355px]">
          <ul>
            {friendList.map((friend) => (
              <li className="mx-0 mt-2" key={friend.key}>
                <Card
                  size="small"
                  className="bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                  style={{ width: '95%', marginLeft: '5px' }}
                  bodyStyle={{ padding: '10px 12px' }}
                >
                  <div className="flex  items-center p-0">
                    <Avatar
                      size={40}
                      className="flex justify-center items-center bg-gray-300"
                      src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
                    ></Avatar>
                    <span
                      className={
                        friend.status === 'online'
                          ? 'absolute rounded-full h-3 w-3 border bg-green-400 bottom-3 left-10'
                          : 'absolute rounded-full h-3 w-3 border bg-gray-500 bottom-3 left-10'
                      }
                    ></span>
                    <div className="ml-4">
                      <p className="m-0 text-white font-popins text-xs">{friend.name}</p>
                      <span className="text-gray-opacity">{friend.status}</span>
                    </div>
                    <div className="relative w-14"></div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Menu
            items={[
              {
                label: 'Theme',
                key: 'home',
              },
              { label: 'Setting', key: 'news', icon: <SettingIcon className="h-4 w-4" /> },
            ]}
            style={{
              backgroundColor: '#0e1820',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              marginTop: '10px',
            }}
          />
        </div>
      </div>
    </Sider>
  )
}

export default SidebarLeft
