import { CodeArenaIcon, ForumIcon, RankIcon, ResultIcon } from '@/components/Icons'
import { HOME_ICON, LOGO } from '@/constants/images'
import { Button, Col, Dropdown, Layout, MenuProps, Popover, Row, Space, message } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import AvatarProfile from '../../components/AvatarProfile'
import {
  ArrowLeftOutlined,
  BorderOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  CompassOutlined,
  DownOutlined,
  PlayCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import React, { useState } from 'react'
import './style.scss'
import CustomedButton from '../../components/CustomedButton'
import HeaderItem from '@/components/HeaderItem'

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

const MainDetail = () => {
  return (
    <Layout className="min-h-screen">
      <HeaderItem classNameInput="hidden" />
      <Col xl={1}>
        <Sider
          style={{ position: 'fixed', background: '#252E38', width: '100%', height: '100%' }}
          width={70}
          className="flex flex-col justify-center items-center py-3 z-20"
        >
          <div className="flex justify-center items-center h-11 w-11 rounded-full bg-gray-400">
            <img src={LOGO.APP_LOGO} />
          </div>
          <ul className="mt-8">
            <li className="text-center text-white py-6">
              <ArrowLeftOutlined className="text-xl" /> <p className="m-0 text-base pt-2 font-popins">BACK</p>
            </li>
            <li className="text-center text-white py-6">
              <BulbOutlined className="text-xl" /> <p className="m-0 text-base pt-2 font-popins">HINTS</p>
            </li>
            <li className="flex flex-col justify-center items-center text-center text-white py-6">
              <RankIcon /> <p className="m-0 text-base pt-2 font-popins">RANK</p>
            </li>
            <li className="flex flex-col justify-center items-center text-center text-white py-6">
              <ForumIcon /> <p className="m-0 text-base pt-2 font-popins">FORUM</p>
            </li>
            <li className="flex flex-col justify-center items-center text-center text-white py-6">
              <ResultIcon /> <p className="m-0 text-base pt-2 font-popins">RESULTS</p>
            </li>
          </ul>
        </Sider>
      </Col>
      <Col xl={23}>
        <Layout>
          <Content>
            <Row className="h-full flex justify-center" style={{ marginTop: '64px' }}>
              <Col xl={10} className="bg-gray-300 min-h-screen">
                <div className="lesson fixed overflow-y-auto h-96 text-black w-[40%] p-4">
                  <h2>Example hhhhhhhhhhhhhhhhh</h2>
                </div>
              </Col>
              <Col xl={14} className="min-h-screen">
                <div className="bg-cool-gray-800">
                  <div className="fixed w-[56%] border-b-4 border-blue-900 bg-cool-gray-800 px-4 z-10">
                    <div className="flex justify-between items-center h-16">
                      <div>
                        <Dropdown
                          menu={{ items: goItems }}
                          placement="bottomRight"
                          className="bg-cool-gray-700 py-2 px-6 rounded-lg text-teal-400 font-popins"
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              GO
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                        <Dropdown
                          menu={{ items: goItems }}
                          placement="bottomRight"
                          className="bg-cool-gray-700 py-2 px-6 rounded-lg ml-4 text-teal-400 font-popins"
                        >
                          <a onClick={(e) => e.preventDefault()}>
                            <Space>
                              THEME
                              <DownOutlined />
                            </Space>
                          </a>
                        </Dropdown>
                      </div>
                      <div>
                        <Button className="coding-header-button p-0 m-0 h-6 w-6 rounded-full border-0 mr-7">
                          <SyncOutlined className="text-white text-xl" />
                        </Button>
                        <Button className="coding-header-button p-0 m-0 h-6 w-6 rounded-full border-0">
                          <BorderOutlined className="text-white text-xl" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="coding-area fixed overflow-y-auto w-[56%] bg-cool-gray-800 h-[387px] mt-16 text-white p-4">
                    <p>long content</p>
                    {Array.from({ length: 100 }, (_, index) => (
                      <React.Fragment key={index}>
                        {index % 20 === 0 && index ? 'more' : '...'}
                        <br />
                      </React.Fragment>
                    ))}
                    <p>end</p>
                  </div>
                  <div className="fixed bg-cool-gray-800 bottom-0 w-[56%] h-56 p-6 border-t-4 border-blue-900">
                    <Row>
                      <Col xl={18}>
                        <p className="font-popins text-base text-white">Test cases</p>
                        <div className="list-test-case overflow-y-auto overflow-x-hidden h-36">
                          <ul className="p-4 py-0">
                            <li className="flex justify-between items-center w-full h-16 p-4 my-2 bg-cool-gray-700 rounded-full">
                              <p className="font-popins text-lg text-white m-0">01&nbsp;&nbsp;Test case</p>
                              <CheckCircleFilled className="text-green-400 text-3xl bg-white rounded-full" />
                            </li>
                            <li className="flex justify-between items-center w-full h-16 p-4 my-2 bg-cool-gray-700 rounded-full">
                              <p className="font-popins text-lg text-white m-0">02&nbsp;&nbsp;Test case</p>
                              <CloseCircleFilled className="text-red-600 text-3xl bg-white rounded-full" />
                            </li>
                            <li className="flex justify-between items-center w-full h-16 p-4 my-2 bg-cool-gray-700 rounded-full">
                              <p className="font-popins text-lg text-white m-0">03&nbsp;&nbsp;Test case</p>
                              <CheckCircleFilled className="text-green-400 text-3xl bg-white rounded-full" />
                            </li>
                          </ul>
                        </div>
                      </Col>
                      <Col xl={6}>
                        <div className="p-4">
                          {
                            <CustomedButton
                              label="RUN CODE"
                              Icon={PlayCircleOutlined}
                              classNameButton="border-0"
                              classNameIcon="text-2xl font-popins"
                            />
                          }
                          <div className="pt-4">
                            {
                              <CustomedButton
                                label="SUBMIT"
                                Icon={CompassOutlined}
                                classNameButton="border-0"
                                classNameIcon="text-2xl font-popins"
                              />
                            }
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Col>
    </Layout>
  )
}

export default MainDetail
