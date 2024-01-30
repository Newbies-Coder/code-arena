import { UserIcon } from '@/components/Icons'
import { DownOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Dropdown, MenuProps, Row, Space } from 'antd'

const menuItems: MenuProps['items'] = [
  {
    label: <a href="/profile">Profile</a>,
    key: '0',
    style: { width: '150px' },
  },
  {
    type: 'divider',
  },
  {
    label: <a href="/login">Login</a>,
    key: '2',
    style: { width: '150px' },
  },
  {
    label: 'Log out',
    key: '3',
    style: { width: '150px' },
  },
]

const AvatarProfile = () => {
  return (
    <Row>
      <Col xs={24} sm={24} md={0} lg={0} xl={0}>
        <div className="flex justify-between items-center w-10 h-10 bg-blue-900 rounded-full border border-gray-500">
          <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']} className="text-white">
            <Button className="h-10 w-10 p-0 rounded-full">
              <Avatar size={37} className="flex justify-between items-center bg-gray-300">
                <UserIcon />
              </Avatar>
            </Button>
          </Dropdown>
        </div>
      </Col>
      <Col xs={0} md={24} lg={24} xl={24}>
        <div className="flex justify-between items-center w-40 h-10 bg-blue-900 rounded-full border border-gray-500">
          <Avatar size={36} className="flex justify-between items-center bg-gray-300">
            <UserIcon />
          </Avatar>
          <div className="flex justify-between items-center pr-2">
            <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']} className="text-white">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  NGOC UYEN
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default AvatarProfile
