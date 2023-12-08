import { Avatar, Button, Card, Col, Menu, MenuTheme } from 'antd'
import { HomeIcon, LibraryIcon, NewsIcon, SettingIcon, StoreIcon, UserIcon } from '../Icons'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'
import { friendList } from '@/mocks/home.data'

const SidebarLeft = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark')

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
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
          <Menu
            items={[
              { label: 'Home', key: 'home', icon: <HomeIcon className="h-5 w-5" /> },
              { label: 'News', key: 'news', icon: <NewsIcon className="h-4 w-4" /> },
              { label: 'Library', key: 'library', icon: <LibraryIcon className="h-4 w-4" /> },
              { label: 'Store', key: 'store', icon: <StoreIcon className="h-4 w-4" /> },
            ]}
            style={{ backgroundColor: '#0e1820', color: 'white', fontFamily: 'Poppins, sans-serif' }}
          />
        </div>
        <div className="flex justify-around items-center py-4">
          <p className="text-gray-opacity self-auto m-0">New Members</p>
          <Button type="link" className="text-gray-opacity p-0">
            See all
          </Button>
        </div>
        <div>
          <ul>
            {friendList.map((friend, index) => (
              <li className="mx-0 mt-2" key={friend.key}>
                <Card
                  size="small"
                  className="bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                  style={{ width: '95%', marginLeft: '5px' }}
                  bodyStyle={{ paddingTop: '8px', paddingBottom: '8px' }}
                >
                  <div className="flex justify-center items-center p-0">
                    <Avatar size={40} className="flex justify-center items-center bg-gray-300">
                      <UserIcon />
                    </Avatar>
                    <div className="pl-4">
                      <p className="m-0 text-white font-popins">{friend.name}</p>
                      <span className="text-gray-opacity">{friend.status}</span>
                    </div>
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
              marginTop: '15px',
            }}
          />
        </div>
      </div>
    </Sider>
  )
}

export default SidebarLeft
