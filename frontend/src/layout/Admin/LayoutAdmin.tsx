import { MenuItemType } from '@/@types/admin'
import DarkMode from '@/components/DarkMode'
import {
  CourserIcon,
  DashboardIcon,
  LogoutIcon,
  MessageIcon,
  NoNotiIcon,
  SettingIcon,
  UsersIcon,
} from '@/components/Icons'
import Menu from '@/components/Menu'
import { HOME_ICON, LOGO } from '@/constants/images'
import AvatarProfile from '@/container/Detail/components/AvatarProfile'
import { Button, Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const items: MenuItemType[] = [
  { label: 'Dashboard', icon: <DashboardIcon color="#00D1FF" />, link: '/admin', active: false, color: '#00D1FF' },
  { label: 'User', icon: <UsersIcon color="#F449F4" />, link: '/admin/user', active: false, color: '#F449F4' },
  { label: 'Course', icon: <CourserIcon color="#FFE500" />, link: '/admin/course', active: false, color: '#FFE500' },
  { label: 'Message', icon: <MessageIcon color="#5F3EBC" />, link: '/admin/message', active: false, color: '#5F3EBC' },
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
        className="relative border-r border-[#cccc]"
      >
        <Link to={'/admin'} className="flex justify-center mb-2">
          {!collapsed ? (
            <img src={HOME_ICON.LOGO_TEXT} alt="logo" />
          ) : (
            <img src={LOGO.APP_LOGO} alt="logo" className="mt-1 p-1 bg-gray-300 rounded-full" />
          )}
        </Link>
        <Menu items={items} collapsed={collapsed} />
        <div className="flex flex-col items-center absolute bottom-14 left-2 right-2 gap-2">
          <div className="w-full h-8 flex items-center justify-between px-2">
            {!collapsed && <span className="text-sm font-semibold text-white">Theme</span>}
            <DarkMode />
          </div>
          <Button type="text" className="w-full h-8 flex items-center justify-between px-2">
            {!collapsed && <span className="text-sm font-semibold text-white">Settings</span>}
            <SettingIcon className={collapsed ? 'w-full' : ''} />
          </Button>
          <Button
            icon={!collapsed && <LogoutIcon />}
            className={clsx(['h-10 text-white flex items-center w-full'])}
            classNames={{ icon: 'ml-2' }}
          >
            {!collapsed ? 'Log out' : <LogoutIcon />}
          </Button>
        </div>
      </Sider>
      <Layout className="w-full md:w-9/12">
        <Header className="flex justify-between">
          <h3 className="text-white text-xl">{window.location.href.includes('/profile') && 'Personal information'}</h3>
          <div className="flex items-center">
            <Button className="h-10 w-10 px-2 mx-1 rounded-full border-yellow-400 flex justify-center items-center">
              <NoNotiIcon />
            </Button>
            <AvatarProfile />
          </div>
        </Header>
        <Content className="h-full">{children}</Content>
      </Layout>
    </Layout>
  )
}
