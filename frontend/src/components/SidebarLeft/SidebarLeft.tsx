import { Avatar, Button, Card, Col, Menu } from 'antd'
import { HomeIcon, LibraryIcon, NewsIcon, SettingIcon, StoreIcon, UserIcon } from '../Icons'
import Sider from 'antd/es/layout/Sider'
import { useState } from 'react'

const SidebarLeft = () => {
  return (
    <Col style={{ width: '100%' }}>
      <Sider
        className="mt-16 h-screen left-0 border-r lg:block z-10"
        style={{
          position: 'fixed',
          background: '#0e1820',
          borderRightColor: 'rgba(255, 255, 255, 0.20)',
          width: '100%',
        }}
      >
        <div>
          <div className="flex flex-col justify-between w-full">
            <div>
              <Menu
                items={[
                  { label: 'Home', key: 'home', icon: <HomeIcon /> },
                  { label: 'News', key: 'news', icon: <NewsIcon /> },
                  { label: 'Library', key: 'library', icon: <LibraryIcon /> },
                  { label: 'Store', key: 'store', icon: <StoreIcon /> },
                ]}
                style={{ backgroundColor: '#0e1820', color: 'white', fontFamily: 'Poppins, sans-serif' }}
              />
            </div>
            <div className="flex justify-around items-center">
              <p className="text-gray-opacity self-auto m-0">New Members</p>
              <Button type="link" className="text-gray-opacity p-0">
                See all
              </Button>
            </div>
            <div>
              <ul>
                <li className="mx-0 mt-2">
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
                        <p className="m-0 text-white font-popins">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </div>
                  </Card>
                </li>
                <li className="mx-0 mt-2">
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
                        <p className="m-0 text-white font-popins">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </div>
                  </Card>
                </li>
                <li className="mx-0 mt-2">
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
                        <p className="m-0 text-white font-popins">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </div>
                  </Card>
                </li>
                <li className="mx-0 mt-2 ">
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
                        <p className="m-0 text-white font-popins">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </div>
                  </Card>
                </li>
              </ul>
            </div>
            <div>
              <Menu
                items={[
                  { label: 'Theme', key: 'home' },
                  { label: 'Setting', key: 'news', icon: <SettingIcon /> },
                ]}
                style={{
                  backgroundColor: '#0e1820',
                  color: 'white',
                  fontFamily: 'Poppins, sans-serif',
                  marginTop: '50px',
                }}
              />
            </div>
          </div>
        </div>
      </Sider>
    </Col>
  )
}

export default SidebarLeft
