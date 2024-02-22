import { MenuItemType } from '@/@types/admin.type'
import DarkMode from '@/components/DarkMode'
import { CourserIcon, DashboardIcon, LogoutIcon, MessageIcon, SettingIcon, UsersIcon } from '@/components/Icons'
import Menu from '@/components/Menu'
import { HOME_ICON, LOGO } from '@/constants/images'
import { ACCESS_TOKEN, clearStore } from '@/utils/setting'
import { Button } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import { ArrowRightOutlined } from '@ant-design/icons'

const items: MenuItemType[] = [
  { label: 'Dashboard', icon: <DashboardIcon color="#00D1FF" />, link: '/admin', active: false, color: '#00D1FF' },
  { label: 'User', icon: <UsersIcon color="#F449F4" />, link: '/admin/user', active: false, color: '#F449F4' },
  { label: 'Course', icon: <CourserIcon color="#FFE500" />, link: '/admin/course', active: false, color: '#FFE500' },
  { label: 'Message', icon: <MessageIcon color="#5F3EBC" />, link: '/admin/message', active: false, color: '#5F3EBC' },
]

export default function LayoutAdmin({ children }: { children: JSX.Element }) {
  const [collapsed, setCollapsed] = useState(false)
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])
  const navigate = useNavigate()

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

  const handleLogout = () => {
    clearStore(ACCESS_TOKEN)
    navigate('/admin/login')
  }

  return (
    <div className="bg-[#001529]">
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={clsx(
          'border-r border-[#6e7479] fixed top-0 left-0 bottom-0 flex flex-col text-white',
          !collapsed ? 'w-[180px]' : 'w-[60px]',
        )}
      >
        <div>
          <Link to={'/admin'} className={`flex justify-center mb-2 w-full`}>
            {!collapsed ? (
              <img src={HOME_ICON.LOGO_TEXT} alt="logo" />
            ) : (
              <img src={LOGO.APP_LOGO} alt="logo" className="mt-1 p-2 bg-gray-300 rounded-full" />
            )}
          </Link>
          <Menu items={items} collapsed={collapsed} />
        </div>
        <div className={clsx('flex flex-col gap-2 px-2 fixed bottom-2', !collapsed ? 'w-[200px]' : 'w-[80px]')}>
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
            onClick={handleLogout}
          >
            {!collapsed ? 'Log out' : <LogoutIcon />}
          </Button>
          <Button className="text-white w-full h-10" onClick={() => setCollapsed((prev) => !prev)}>
            <ArrowRightOutlined />
          </Button>
        </div>
      </Sider>
      <div className={clsx('fixed top-0 right-0 bottom-0', !collapsed ? 'left-[200px]' : 'left-[80px]')}>
        <Content className="w-full h-full overflow-y-auto no-scrollbar">{children}</Content>
      </div>
    </div>
  )
}
