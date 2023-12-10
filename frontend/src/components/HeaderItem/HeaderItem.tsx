import { Header } from 'antd/es/layout/layout'
import { HomeIcon, LettersIcon, NoNotiIcon, SearchIcon } from '../Icons'
import { DownOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, MenuProps, Popover, Space, message } from 'antd'
import { HOME_ICON, LOGO } from '@/constants/images'
import { useState } from 'react'
import AvatarProfile from '@/container/Detail/components/AvatarProfile'

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

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

const HeaderItem = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return (
    <Header className="fixed h-16 top-0 w-full bg-blue-900 z-20 px-4" style={{ width: '100%' }}>
      <div className="flex justify-between items-center">
        <img src={HOME_ICON.LOGO_TEXT} alt="logo" className="xs:hidden xl:block" />
        <img src={LOGO.APP_LOGO} className="xl:hidden xs:block" />
        <div className="flex justify-between items-center relative px-2 w-full md:w-auto">
          <SearchIcon className="absolute z-10 ml-2 " />
          <Input
            className="px-8 rounded-full text-gray-800 text-base xl:w-128 lg:w-64 w-full"
            placeholder="Search"
          ></Input>
        </div>
        <div className="flex items-center">
          <div>
            <ul className="md:flex md:justify-between md:items-center pt-4 xs:hidden ">
              <li className="flex justify-center items-center w-28 h-10 mx-2 bg-purple-900 rounded-full border border-gray-500">
                <img src={HOME_ICON.GOLD} alt="gold" />
                <span className="text-white font-popins">100.000</span>
              </li>
              <li className="flex justify-center items-center w-24 h-10 mx-2 bg-purple-900 rounded-full border border-gray-500">
                <img src={HOME_ICON.FLAG} alt="flag" className="md:hidden lg:block" />
                <Dropdown menu={{ items: items, onClick }} placement="bottomRight" className="text-gray-500 pl-2">
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
          <Popover placement="bottomRight" content={content} trigger="click" className="xs:hidden xss:block">
            <Button className="h-10 w-10 px-2 mx-1 rounded-full border-yellow-400 flex justify-center items-center">
              <NoNotiIcon />
            </Button>
          </Popover>
          <Popover
            placement="bottomRight"
            content={content}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            className="xs:hidden xss:block"
          >
            <Button className="h-10 w-10 px-2 mx-1 rounded-full border-purple-700 flex justify-center items-center">
              <LettersIcon />
            </Button>
          </Popover>
          <AvatarProfile />
        </div>
      </div>
    </Header>
  )
}

export default HeaderItem
