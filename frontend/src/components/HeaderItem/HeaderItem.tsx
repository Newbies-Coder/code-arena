import { Header } from 'antd/es/layout/layout'
import { HomeIcon, LettersIcon, NoNotiIcon, SearchIcon, UserIcon } from '../Icons'
import { DownOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Input, MenuProps, Popover, Row, Space, message } from 'antd'
import { HOME_ICON } from '@/constants/images'
import { useState } from 'react'

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

const text = <span>Title</span>

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

const HeaderItem = () => {
  const [open, setOpen] = useState(false)
  const hide = () => {
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return (
    <Header className="fixed h-16 top-0 w-full bg-blue-900 z-10 px-6" style={{ width: '100%' }}>
      <div className="flex justify-between items-center">
        <img src={HOME_ICON.LOGO_TEXT} alt="logo" className="sm:w-32 lg:w-44" />
        <div className="flex justify-between items-center relative w-full md:w-auto">
          <SearchIcon className="absolute z-10 ml-2 " />
          <Input
            className="px-10 rounded-full text-gray-800 text-base xl:w-128 lg:w-64 w-full"
            placeholder="Search"
          ></Input>
        </div>
        <div className="flex items-center">
          <div>
            <ul className="flex justify-between items-center pt-4">
              <li className="flex justify-center items-center w-28 h-10 mx-2 bg-purple-900 rounded-full border border-gray-500">
                <img src={HOME_ICON.GOLD} alt="gold" />
                <span className="text-white font-popins">100.000</span>
              </li>
              <li className="flex justify-center items-center w-24 h-10 mx-2 bg-purple-900 rounded-full border border-gray-500">
                <img src={HOME_ICON.FLAG} alt="flag" />
                <Dropdown menu={{ items: items, onClick }} className="text-gray-500 pl-2">
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
          <Popover placement="bottomRight" title={text} content={content} trigger="click">
            <Button className="h-10 w-10 px-2 mx-1 rounded-full border-yellow-400 flex justify-center items-center">
              <NoNotiIcon />
            </Button>
          </Popover>
          <Popover
            placement="bottomRight"
            title={text}
            content={content}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button className="h-10 w-10 px-2 mx-1 rounded-full border-purple-700 flex justify-center items-center">
              <LettersIcon />
            </Button>
          </Popover>
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
  )
}

export default HeaderItem
