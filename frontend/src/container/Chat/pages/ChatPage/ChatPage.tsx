import { Avatar, Badge, Button, Card, Col, Input, Layout, Row } from 'antd'
import './style.scss'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import HeaderItem from '@/components/HeaderItem'
import {
  AddIcon,
  FriendIcon,
  MessIcon,
  MessagePurpleIcon,
  MoreIcon,
  PhoneIcon,
  SearchIcon,
  VideoIcon,
} from '@/components/Icons'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { friendList } from '@/mocks/home.data'

const onChange = (key: string) => {
  console.log(key)
}

const messageContent = 'Hey Alex which one do you prefer?'
const maxLength = 10

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <Badge dot style={{ borderColor: '#F00' }} className="text-white font-popins">
        DIRECT
      </Badge>
    ),
    children: (
      <>
        <div className="relative">
          <SearchOutlined className="absolute z-10 ml-3 top-[14px]" />
          <Input
            className="px-8 h-10 font-popins rounded-full text-base w-full bg-blue-900 text-white border-White border-2 placeholder:text-white placeholder:font-popins"
            placeholder="Search"
          />
        </div>
        <div className="bg-blue-900">
          <div className="list-member overflow-y-auto xl:h-[400px] xs:h-[270px] ss:h-[370px] xss:h-[430px] smm:h-[500px] md:h-[700px] lg:h-[1000px] 3xl:h-[750px] mt-2">
            <ul>
              {friendList.map((friend) => (
                <li className="mx-0 mt-2" key={friend.key}>
                  <Card
                    size="small"
                    className="bg-blue-opacity mx-4 border-white hover:border hover:border-gray-opacity"
                    style={{ width: '95%', marginLeft: '5px' }}
                    bodyStyle={{ padding: '10px 12px' }}
                  >
                    <div className="flex items-center p-0">
                      <Avatar
                        size={40}
                        className="flex justify-center items-center bg-gray-300"
                        src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
                      ></Avatar>
                      <span
                        className={
                          friend.status === 'online'
                            ? 'absolute rounded-full h-3 w-3 border bg-green-400 bottom-3 left-10'
                            : 'absolute rounded-full h-3 w-3 border bg-gray-500 bottom-3 left-10'
                        }
                      ></span>
                      <div className="xs:ml-2 smm:ml-4 md:ml-2 lg:ml-4">
                        <p className="m-0 text-white font-popins text-sm">{friend.name}</p>
                        {messageContent.length < maxLength ? (
                          <span className="text-gray-opacity">{messageContent}</span>
                        ) : (
                          <span className="text-gray-opacity">{messageContent.substring(0, maxLength) + '...'}</span>
                        )}
                      </div>
                      <div className="absolute right-3">
                        <p className="m-0 text-gray-500 font-popins text-sm">4:00</p>
                        <div className="bg-purple-600 rounded-full h-5 w-5 text-[10px] text-white font-popins flex justify-center items-center">
                          3
                        </div>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    key: '2',
    label: (
      <Badge dot style={{ borderColor: '#F00' }} className="text-white font-popins">
        GROUP
      </Badge>
    ),
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: (
      <Badge dot style={{ borderColor: '#F00' }} className="text-white font-popins">
        PUBLIC
      </Badge>
    ),
    children: 'Content of Tab Pane 3',
  },
]

const ChatPage = () => {
  return (
    <Layout style={{ height: '100vh' }} className="overflow-hidden bg-blue-900">
      <HeaderItem classNameInput="hidden" />
      <Layout className="lg:mt-20 xs:mt-16">
        <Row className="w-full">
          <Col xl={{ span: 19 }} xs={{ span: 24 }}>
            <Layout>
              <Row className="w-full">
                <Col xl={{ span: 7 }} xs={{ span: 24 }} md={{ span: 8 }}>
                  <Sider width={'100%'} style={{ height: '100%' }}>
                    <div className="w-full flex justify-around items-center bg-blue-900 md:h-20 xs:h-16 border-[1px] border-gray-opacity border-l-0 border-r-0">
                      <Button className="border-none">
                        <Badge count={3} style={{ borderColor: '#F00' }}>
                          <MessagePurpleIcon />
                        </Badge>
                      </Button>
                      <Button className="border-none">
                        <Badge count={3} style={{ borderColor: '#F00' }}>
                          <PhoneIcon />
                        </Badge>
                      </Button>
                      <Button className="border-none">
                        <Badge count={3} style={{ borderColor: '#F00' }}>
                          <MessIcon />
                        </Badge>
                      </Button>
                      <Button className="border-none">
                        <Badge count={3} style={{ borderColor: '#F00' }}>
                          <FriendIcon />
                        </Badge>
                      </Button>
                      <Avatar src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    </div>
                    <div className="h-full bg-blue-900  border-b-[1px] border-gray-opacity p-3">
                      <div className="flex justify-between">
                        <h2 className="text-white text-2xl font-popins">Messages</h2>
                        <AddIcon />
                      </div>
                      <Tabs defaultActiveKey="1" items={items} className="min-h-screen  text-white" />
                    </div>
                  </Sider>
                </Col>
                <Col
                  xl={{ span: 17 }}
                  xs={{ span: 0 }}
                  md={{ span: 16 }}
                  style={{ background: '#0e1820' }}
                  className="border-r-1 border-gray-opacity"
                >
                  <Content>
                    <div className="flex justify-between items-center bg-blue-900 h-20 border-[1px] border-gray-opacity">
                      <div className="flex justify-between items-center mx-4">
                        <Avatar
                          size={50}
                          src="https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        />
                        <div className="ml-4">
                          <p className="mb-1 text-white font-popins text-xl">Ngoc Uyen</p>
                          <span className="text-gray-400">Last seen 3 hours ago</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mx-4 gap-4">
                        <Button className="border-0 h-12 w-12 m-0 p-0">
                          <PhoneIcon />
                        </Button>
                        <Button className="border-0 h-12 w-12 m-0 p-0">
                          <VideoIcon className="h-9 w-9" />
                        </Button>
                        <Button className="border-0 h-12 w-12 m-0 p-0">
                          <MoreIcon />
                        </Button>
                      </div>
                    </div>
                    <div className="min-h-screen bg-blue-900  border-[1px] border-gray-opacity border-t-0">
                      <h1>ghj,</h1>
                    </div>
                  </Content>
                </Col>
              </Row>
            </Layout>
          </Col>
          <Col xl={{ span: 5 }} xs={{ span: 0 }}>
            <Sider width="100%" style={{ background: '#0e1820', height: '100%' }} className="bg-blue-900"></Sider>
          </Col>
        </Row>
      </Layout>
    </Layout>
  )
}

export default ChatPage
