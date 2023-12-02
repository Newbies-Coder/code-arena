import {
  CyanLineIcon,
  FrontendIcon,
  HomeIcon,
  LettersIcon,
  LibraryIcon,
  NewsIcon,
  NoNotiIcon,
  PinkLineIcon,
  PurpleLineIcon,
  SearchIcon,
  SettingIcon,
  StoreIcon,
  UserIcon,
  YellowLineIcon,
} from '@/components/Icons'
import { HOME_ICON, LOGO } from '@/constants/images'
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Dropdown,
  Input,
  Layout,
  Menu,
  MenuProps,
  Skeleton,
  Space,
  message,
} from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useState } from 'react'
import './style.scss'
import { DownOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
const { Header, Content } = Layout

const onClick: MenuProps['onClick'] = ({ key }) => {
  message.info(`Click on item ${key}`)
}

const items: MenuProps['items'] = [
  {
    icon: <HomeIcon />,
    label: 'ENG',
    key: '1',
  },
  {
    icon: <HomeIcon />,
    label: 'VIE',
    key: '2',
  },
]

const menuItems: MenuProps['items'] = [
  {
    label: <a href="">Profile</a>,
    key: '0',
  },
  {
    type: 'divider',
  },
  {
    label: 'Log out',
    key: '2',
  },
]

const contentStyle: React.CSSProperties = {
  height: '250px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  borderRadius: '20px',
}

const MainHome = () => {
  return (
    <Layout className="h-screen">
      <Header className="fixed h-16 top-0 w-full bg-blue-900 z-10">
        <div className="flex justify-between items-center">
          <img src={HOME_ICON.LOGO_TEXT} alt="logo" />
          <div className="flex justify-between items-center relative">
            <SearchIcon className="absolute z-10 ml-2 " />
            <Input className="px-10 rounded-full text-gray-800 text-base w-128" placeholder="Search"></Input>
          </div>
          <div className="flex items-center">
            <div>
              <ul className="flex justify-between items-center pt-4">
                <li className="flex justify-center items-center w-32 h-10 mx-2 bg-purple-900 rounded-full border border-gray-500">
                  <img src={HOME_ICON.GOLD} alt="gold" />
                  <span className="text-white font-popins">100.000</span>
                </li>
                <li className="flex justify-center items-center w-24 h-10 mx-2 bg-purple-900 rounded-full border border-gray-500">
                  <img src={HOME_ICON.FLAG} alt="flag" />
                  <Dropdown menu={{ items: items, onClick }} className="text-gray-500">
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        ENG
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center h-10 w-10 mx-2 rounded-full border border-yellow-400">
              <NoNotiIcon />
            </div>
            <div className="flex justify-center items-center h-10 w-10 mx-2 rounded-full border border-purple-700">
              <LettersIcon />
            </div>
            <div className="flex justify-between items-center w-32 h-10 bg-blue-900 rounded-full border border-gray-500">
              <Avatar size={36} className="flex justify-between items-center bg-gray-300">
                <UserIcon />
              </Avatar>
              <div className="flex justify-between items-center pr-2">
                <Dropdown menu={{ items: menuItems }} trigger={['click']} className="text-white">
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      N UYEN
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <Layout>
        <div>
          <Sider
            className="mt-16 h-screen left-0 border-r"
            style={{
              position: 'fixed',
              background: '#0e1820',
              borderRightColor: 'rgba(255, 255, 255, 0.20)',
              width: '100%',
            }}
          >
            <div>
              <div className="flex flex-col justify-center w-full">
                <ul className="w-full">
                  <li className="flex justify-between items-center pr-3 py-3 w-full">
                    <div className="flex justify-center items-center">
                      <CyanLineIcon />
                      <h3 className="text-white font-popins text-sm pl-5 m-0">Home</h3>
                    </div>
                    <HomeIcon />
                  </li>
                  <li className="flex justify-between items-center pr-3 py-3 w-full">
                    <div className="flex justify-center items-center">
                      <PinkLineIcon />
                      <h3 className="text-white font-popins text-sm pl-5 m-0">News</h3>
                    </div>
                    <NewsIcon />
                  </li>
                  <li className="flex justify-between items-center pr-3 py-3 w-full">
                    <div className="flex justify-center items-center">
                      <YellowLineIcon />
                      <h3 className="text-white font-popins text-sm pl-5 m-0">Library</h3>
                    </div>
                    <LibraryIcon />
                  </li>
                  <li className="flex justify-between items-center pr-3 py-3 w-full">
                    <div className="flex justify-center items-center">
                      <PurpleLineIcon />
                      <h3 className="text-white font-popins text-sm pl-5 m-0">Store</h3>
                    </div>
                    <StoreIcon />
                  </li>
                </ul>
                <div className="flex justify-around items-center">
                  <p className="text-gray-opacity self-auto m-0">New Members</p>
                  <Button type="link" className="text-gray-opacity p-0">
                    See all
                  </Button>
                </div>
                <div className="mx-1">
                  <ul>
                    <li className="flex justify-center items-center w-full h-14 my-2 bg-blue-opacity border-none rounded-md">
                      <Avatar size={36} className="flex justify-center items-center bg-gray-300">
                        <UserIcon />
                      </Avatar>
                      <div className="pl-3">
                        <p className="m-0 text-white">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </li>
                    <li className="flex justify-center items-center w-full h-14 my-2 bg-blue-opacity border-none rounded-md">
                      <Avatar size={36} className="flex justify-center items-center bg-gray-300">
                        <UserIcon />
                      </Avatar>
                      <div className="pl-3">
                        <p className="m-0 text-white">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </li>
                    <li className="flex justify-center items-center w-full h-14 my-2 bg-blue-opacity border-none rounded-md">
                      <Avatar size={36} className="flex justify-center items-center bg-gray-300">
                        <UserIcon />
                      </Avatar>
                      <div className="pl-3">
                        <p className="m-0 text-white">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </li>
                    <li className="flex justify-center items-center w-full h-14 my-2 bg-blue-opacity border-none rounded-md">
                      <Avatar size={36} className="flex justify-center items-center bg-gray-300">
                        <UserIcon />
                      </Avatar>
                      <div className="pl-3">
                        <p className="m-0 text-white">Anne Couture</p>
                        <span className="text-gray-opacity">online</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Sider>
        </div>
        <Content style={{ margin: '64px 200px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, backgroundColor: '#0e1820' }}>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
            <div className="flex justify-around items-center pt-6">
              <Card className="w-80 bg-blue-opacity rounded-2xl">
                <p>Card content</p>
              </Card>
              <Card className="w-80 bg-blue-opacity rounded-2xl">
                <p>Card content</p>
              </Card>
              <Card className="w-80 bg-blue-opacity rounded-2xl">
                <p>Card content</p>
              </Card>
            </div>
            <p className="pt-10 font-popins text-3xl text-white">Continue Watching</p>
            <div className="flex justify-between items-center px-10 ">
              <Card
                hoverable
                // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                className="border-2 border-gray-opacity w-60"
              >
                <img src={LOGO.APP_LOGO} alt="" className="relative" />
                <div>
                  <FrontendIcon />
                  <span>FRONT END</span>
                </div>
              </Card>

              {/* <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                className="border-2 border-gray-opacity w-80"
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
              <Card
                hoverable
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                className="border-2 border-gray-opacity w-80"
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card> */}
            </div>
            <p className="text-white">long content</p>
            {Array.from({ length: 200 }, (_, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index ? 'more' : '...'}
                <br />
              </React.Fragment>
            ))}
          </div>
        </Content>
        <div>
          <Sider
            className="sider fixed mt-16 h-screen right-0 border-l"
            style={{
              width: '100%',
              position: 'fixed',
              background: '#0e1820',
              borderLeftColor: 'rgba(255, 255, 255, 0.20)',
            }}
          >
            sider right
          </Sider>
        </div>
      </Layout>
    </Layout>
  )
}

export default MainHome
