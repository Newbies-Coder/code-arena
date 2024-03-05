import { Avatar, Badge, Button, Card, Col, Input, Layout, Row } from 'antd'
import './style.scss'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import HeaderItem from '@/components/HeaderItem'
import {
  AddIcon,
  EmojiIcon,
  FriendIcon,
  ImageIcon,
  MessIcon,
  MessagePurpleIcon,
  MoreIcon,
  PhoneIcon,
  SendMessageIcon,
  VideoIcon,
} from '@/components/Icons'
import { ChatMessage } from '@/mocks/chat.data'
import Tabbar from '../../components/Tabbar/Tabbar'
import { useState } from 'react'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { friendList } from '@/mocks/home.data'
import { UserAddOutlined } from '@ant-design/icons'

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
                      <Tabbar />
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
                    <div className=" bg-blue-900 border-[1px] border-gray-opacity h-full max-h-[calc(100vh-80px)]">
                      <div className="flex justify-between items-center h-20">
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
                      <div className="list-member xl:h-[510px] 3xl:h-[850px] flex flex-col justify-between bg-blue-900 border-gray-opacity border-t-[1px] overflow-y-auto">
                        {ChatMessage.map((item) => {
                          return (
                            <div
                              className="flex flex-row p-5"
                              style={{ justifyContent: item.incoming ? 'start' : 'end' }}
                            >
                              <div
                                className="p-2 border-1 rounded-full w-max"
                                style={{
                                  backgroundColor: item.incoming ? '#fff' : '#9061f9',
                                  borderBottomLeftRadius: item.incoming ? '0' : 'full',
                                  borderBottomRightRadius: item.outgoing ? '0' : 'full',
                                }}
                              >
                                <h3>{item.message}</h3>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div>
                        <Input
                          className="px-8 h-10 font-popins rounded-xl text-base w-full bg-blue-900 text-white border-White border-2 placeholder:text-gray-500 placeholder:font-popins"
                          placeholder="Type your message"
                          styles={{ input: { backgroundColor: '#0e1820', color: '#fff' } }}
                          suffix={
                            <>
                              <Button className="border-0 m-0 p-0">
                                <EmojiIcon />
                              </Button>
                              <Button className="border-0 m-0 p-0">
                                <ImageIcon />
                              </Button>
                              <Button className="border-0 m-0 p-0">
                                <SendMessageIcon />
                              </Button>
                            </>
                          }
                        />
                      </div>
                    </div>
                  </Content>
                </Col>
              </Row>
            </Layout>
          </Col>
          <Col xl={{ span: 5 }} xs={{ span: 0 }}>
            <Sider width="100%" style={{ background: '#0e1820', height: '100%' }} className="bg-blue-900 px-2">
              <div>
                <h2 className="font-popins text-white text-2xl">Notifications</h2>
                <div className="list-member overflow-y-auto xl:h-[280px]  3xl:h-[450px] mt-2">
                  <ul>
                    {friendList.map((friend) => (
                      <li className="mx-0 mt-2" key={friend.key}>
                        <Card
                          size="small"
                          className="bg-blue-opacity mx-4 border-0"
                          style={{ width: '95%', marginLeft: '5px' }}
                          bodyStyle={{ padding: '10px' }}
                        >
                          <div className="flex  p-0">
                            <Avatar
                              size={40}
                              className="flex justify-center items-center bg-gray-300"
                              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
                            ></Avatar>

                            <div className="ml-2">
                              <p className="m-0 text-white font-popins text-xs">
                                <span className="text-blue-600">@{friend.name}</span> mentioned you in 'trip to go'
                                <span className="absolute text-gray-400 text-[10px] right-5 bottom-3">1 min ago</span>
                              </p>
                            </div>
                          </div>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h2 className="font-popins text-white text-2xl">Suggestions</h2>
                <div className="list-member overflow-y-auto xl:h-[280px]  3xl:h-[450px] mt-2">
                  <ul>
                    {friendList.map((friend) => (
                      <li className="mx-0 mt-2" key={friend.key}>
                        <Card
                          size="small"
                          className="bg-blue-opacity mx-4 border-0"
                          style={{ width: '95%', marginLeft: '5px' }}
                          bodyStyle={{ padding: '10px 12px' }}
                        >
                          <div className="flex items-center p-0">
                            <Avatar
                              size={40}
                              className="flex justify-center items-center bg-gray-300"
                              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
                            ></Avatar>

                            <div className="xs:ml-2 smm:ml-4 md:ml-2 lg:ml-4">
                              <p className="m-0 text-white font-popins text-sm">{friend.name}</p>

                              <span className="text-gray-opacity">7 mutual friends</span>
                            </div>
                            <div className="absolute right-3">
                              <Button
                                className="rounded-full w-16 h-6 p-0 m-0 bg-gradient-to-r from-[#B14AFD] to-[#7753EB] border-0 text-white font-popins text-xs"
                                icon={<UserAddOutlined className="h-4 w-4" />}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Sider>
          </Col>
        </Row>
      </Layout>
    </Layout>
  )
}

export default ChatPage
