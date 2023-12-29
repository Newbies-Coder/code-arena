import { CourserIcon, DashboardIcon, LogoutIcon, MessageIcon, UsersIcon } from '@/components/Icons'
import { HOME_ICON, LOGO } from '@/constants/images'
import AvatarProfile from '@/container/Detail/components/AvatarProfile'
import { BellOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header, Footer } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<Link to={'/admin'}>Dashboard</Link>, '1', <DashboardIcon />),
  getItem(<Link to={'/admin/user'}>User</Link>, '2', <UsersIcon />),
  getItem(<Link to={'/admin/course'}>Course</Link>, '3', <CourserIcon />),
  getItem(<Link to={'/admin/message'}>Message</Link>, '4', <MessageIcon />),
]

export default function LayoutAdmin({ children }: { children: JSX.Element }) {
  const [collapsed, setCollapsed] = useState(false)
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    if (windowSize[0] < 768) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [windowSize])

  return (
    <Layout className="min-h-[100vh]">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="border-r border-[#cccc]"
      >
        <Link to={'/admin'} className="flex justify-center mb-2">
          {!collapsed ? (
            <img src={HOME_ICON.LOGO_TEXT} alt="logo" />
          ) : (
            <img src={LOGO.APP_LOGO} alt="logo" className="mt-1 p-1 bg-gray-300 rounded-full" />
          )}
        </Link>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        {!collapsed ? (
          <Button
            icon={<LogoutIcon />}
            className="m-1 pl-4 h-10 w-48 text-white flex items-center fixed bottom-12"
            classNames={{ icon: 'ml-2' }}
          >
            Log out
          </Button>
        ) : (
          <Button className="m-1 px-6 fixed bottom-12">
            <LogoutIcon />
          </Button>
        )}
      </Sider>
      <Layout className="w-full md:w-9/12">
        <Header className="flex justify-between">
          <h3 className="text-white text-xl">{window.location.href.includes('/profile') && 'Personal information'}</h3>
          <div className="flex items-center">
            <BellOutlined className="text-white text-xl mr-2" />
            <AvatarProfile />
          </div>
        </Header>
        <Content className="h-full">{children}</Content>
      </Layout>
    </Layout>
  )
}
