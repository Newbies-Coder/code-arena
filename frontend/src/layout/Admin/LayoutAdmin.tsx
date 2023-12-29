import { HOME_ICON } from '@/constants/images'
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header, Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
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
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
]

export default function LayoutAdmin({ children }: { children: JSX.Element }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="min-h-[100vh]">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Link to={'/admin'}>
          <img src={HOME_ICON.LOGO_TEXT} alt="logo" className="xs:hidden xl:block" />
        </Link>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="w-full md:w-9/12">
        <Header>Header</Header>
        <Content className="h-screen">{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
