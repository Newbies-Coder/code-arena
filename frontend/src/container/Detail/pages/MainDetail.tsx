import { CodeArenaIcon, ForumIcon, HomeIcon, LettersIcon, NoNotiIcon, RankIcon, ResultIcon } from '@/components/Icons'
import { HOME_ICON, LOGO } from '@/constants/images'
import { Button, Col, Dropdown, Layout, MenuProps, Popover, Row, Space, message } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
import AvatarProfile from '../components/AvatarProfile'
import { ArrowLeftOutlined, BulbOutlined, DownOutlined } from '@ant-design/icons'
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

const goItems: MenuProps['items'] = [
  {
    label: 'item 1',
    key: '1',
  },
  {
    label: 'item 2',
    key: '2',
  },
]

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

const MainDetail = () => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }
  return (
    <Layout className="min-h-screen">
      <Sider
        style={{ position: 'fixed', background: '#252E38', width: '72px', height: '100%' }}
        width={72}
        className="flex flex-col justify-center items-center py-3 z-20"
      >
        <div className="flex justify-center items-center h-11 w-11 rounded-full bg-gray-400">
          <img src={LOGO.APP_LOGO} />
        </div>
        <ul className="mt-8">
          <li className="text-center text-[#fff] py-6">
            <ArrowLeftOutlined className="text-xl" /> <p className="m-0 text-base pt-2 font-popins">BACK</p>
          </li>
          <li className="text-center text-[#fff] py-6">
            <BulbOutlined className="text-xl" /> <p className="m-0 text-base pt-2 font-popins">HINTS</p>
          </li>
          <li className="flex flex-col justify-center items-center text-center text-[#fff] py-6">
            <RankIcon /> <p className="m-0 text-base pt-2 font-popins">RANK</p>
          </li>
          <li className="flex flex-col justify-center items-center text-center text-[#fff] py-6">
            <ForumIcon /> <p className="m-0 text-base pt-2 font-popins">FORUM</p>
          </li>
          <li className="flex flex-col justify-center items-center text-center text-[#fff] py-6">
            <ResultIcon /> <p className="m-0 text-base pt-2 font-popins">RESULTS</p>
          </li>
        </ul>
      </Sider>
      <Layout>
        {/* truyền props */}
        <Header className="fixed h-16 top-0 w-full bg-blue-900 z-10 px-8">
          <div className="flex justify-between items-center h-full">
            <CodeArenaIcon className="pl-14" />
            <div className="flex items-center">
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
          </div>
        </Header>
        <Content>
          <Row className="w-full h-full flex justify-center mt-16">
            <Col xl={10} className="bg-gray-300 w-1/2 min-h-screen"></Col>
            <Col xl={14} className="bg-cool-gray-800 w-1/2 min-h-screen"></Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainDetail
