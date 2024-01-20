import { MenuItemType } from '@/@types/admin.type'
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
  const href = window.location.href
  const [title, setTitle] = useState('')

  useEffect(() => {
    const url = href.slice(href.indexOf('/admin', 1)) as keyof typeof titles
    const titles = {
      '/admin': 'Dashboard',
      '/admin/user': 'User',
      '/admin/course': 'Course',
      '/admin/message': 'Message',
      '/admin/profile': 'Personal information',
    }

    setTitle(titles[url] || '')
  }, [href])

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
    <Layout className="min-h-screen bg-[#001529]">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="border-r border-[#6e7479]"
      >
        <Link to={'/admin'} className={`fixed top-0 flex justify-center mb-2 ${collapsed && 'w-20'}`}>
          {!collapsed ? (
            <img src={HOME_ICON.LOGO_TEXT} alt="logo" />
          ) : (
            <img src={LOGO.APP_LOGO} alt="logo" className="mt-1 p-2 bg-gray-300 rounded-full" />
          )}
        </Link>
        <Menu items={items} collapsed={collapsed} />
        <div
          className={clsx([
            'flex flex-col items-center fixed bottom-14 left-2 gap-2',
            !collapsed ? 'w-[180px]' : 'w-[60px]',
          ])}
        >
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
      <Layout className="w-full md:w-9/12 h-full">
        <Header
          className={clsx(
            'flex justify-between fixed top-0 right-0 h-16 border-bottom border-[#6e7479]',
            !collapsed ? 'left-[200px]' : 'left-[80px]',
          )}
        >
          <h3 className="text-white text-xl">{title}</h3>
          <div className="flex items-center">
            <Button className="h-10 w-10 px-2 mx-1 rounded-full border-yellow-400 flex justify-center items-center">
              <NoNotiIcon />
            </Button>
            <AvatarProfile />
          </div>
        </Header>
        <Content
          className={clsx(
            'fixed top-16 bottom-0 right-0 overflow-y-auto no-scrollbar',
            !collapsed ? 'left-[200px]' : 'left-[80px]',
          )}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
