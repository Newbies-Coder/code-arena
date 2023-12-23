import { ForumIcon, RankIcon, ResultIcon } from '@/components/Icons'
import { LOGO } from '@/constants/images'
import { Button, Col, Dropdown, Layout, MenuProps, Row, Select, Space } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
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
import './style.scss'
import HeaderItem from '@/components/HeaderItem'
import CodeEditor from '../../components/CodeEditor'
import { useState } from 'react'
import CustomedButton from '../../components/CustomedButton'

const ThemeItems: MenuProps['items'] = [
  {
    label: 'VSCode Dark',
    key: '1',
  },
  {
    label: 'VSCode Light',
    key: '2',
  },
]

const testCases = [
  { key: '01', title: 'Test case', icon: <CheckCircleFilled className="text-green-400 text-3xl" />, show: false },
  { key: '02', title: 'Test case', icon: <CloseCircleFilled className="text-red-600 text-3xl" />, show: false },
  { key: '03', title: 'Test case', icon: <CheckCircleFilled className="text-green-400 text-3xl" />, show: false },
]

const MainDetail = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const [visibleTestCase, setVisibleTestCase] = useState<boolean[]>(Array(testCases.length).fill(false))

  const toggleTestCase = (index: number) => {
    const newVisibleTestCase = [...visibleTestCase]
    newVisibleTestCase[index] = !newVisibleTestCase[index]
    setVisibleTestCase(newVisibleTestCase)
  }
  return (
    <Layout className="max-h-screen">
      <HeaderItem classNameInput="hidden" />
      <Sider
        style={{ position: 'fixed', background: '#252E38', width: '100%', height: '100%' }}
        width={70}
        className="flex flex-col justify-center items-center py-3 z-20"
      >
        <div className="flex justify-center items-center h-11 w-11 rounded-full bg-gray-400 ml-6">
          <img src={LOGO.APP_LOGO} />
        </div>
        <ul className="mt-8">
          <li className="text-center text-white py-6">
            <Button className="border-none text-white">
              <ArrowLeftOutlined className="text-xl" />
              <p className="m-0 text-base pt-2 font-popins">BACK</p>
            </Button>
          </li>
          <li className="text-center text-white py-6">
            <Button className="border-none text-white">
              <BulbOutlined className="text-xl" />
              <p className="m-0 text-base pt-2 font-popins">HINTS</p>
            </Button>
          </li>
          <li className="flex flex-col justify-center items-center text-center text-white py-6">
            <Button className="border-none text-white">
              <span>
                <RankIcon />
              </span>
              <p className="m-0 text-base pt-2 font-popins">RANK</p>
            </Button>
          </li>
          <li className="flex flex-col justify-center items-center text-center text-white py-6">
            <Button className="border-none text-white">
              <span>
                <ForumIcon />
              </span>
              <p className="m-0 text-base pt-2 font-popins">FORUM</p>
            </Button>
          </li>
          <li className="flex flex-col justify-center items-center text-center text-white py-6">
            <Button className="border-none text-white">
              <span>
                <ResultIcon />
              </span>
              <p className="m-0 text-base pt-2 font-popins">RESULTS</p>
            </Button>
          </li>
        </ul>
      </Sider>
      <Layout>
        <Content>
          <Row className="h-full flex justify-center" style={{ margin: '64px 0 0 70px' }}>
            <Col xl={10} md={10} xs={5} className="bg-gray-300 min-h-screen overflow-y-auto">
              <div className="min-h-screen text-black xl:w-[38%] md:w-[20%] pl-6 ">
                <div className="lesson-guide fixed h-screen xl:w-[38%] md:w-[32%] font-popins overflow-y-auto">
                  <div>
                    <h2 className="text-xl font-bold">Example</h2>
                    <p>a=7</p>
                    <p>b=3</p>
                    <p>return 10</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col xl={14} md={14} xs={19} className="min-h-screen bg-cool-gray-800">
              <div className=" min-h-screen w-full">
                <div className="fixed md:w-[53%] lg:w-[54.5%] xl:w-[55.6%] border-b-4 border-blue-900 bg-cool-gray-800 px-4 z-10 overflow-y-auto">
                  <div className="flex justify-between items-center h-16">
                    <div>
                      <Select
                        className="bg-cool-gray-700 rounded-lg ml-4 text-teal-400 font-popins"
                        defaultValue="Javascript"
                        style={{ width: 120, border: '0', color: '#00D1FF' }}
                        options={[
                          { value: 'javascript', label: 'Javascript' },
                          { value: 'htmlcss', label: 'HTML/CSS' },
                        ]}
                        bordered
                      />
                      <Dropdown
                        menu={{ items: ThemeItems }}
                        placement="bottomRight"
                        className="bg-cool-gray-700 py-2 px-6 rounded-lg ml-4 text-teal-400 font-popins"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            theme
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
                <div className="fixed w-full">
                  <CodeEditor onChange={(value) => setInput(value)} initialValue="const a = 1;" />
                </div>
                <div className="fixed bg-cool-gray-800 bottom-0 md:w-[53%] lg:w-[54.5%] xl:w-[55.6%] xl:h-56 md:h-64 p-4 border-t-4 border-blue-900">
                  <Row>
                    <Col xl={18} md={16} sm={12}>
                      <div className="overflow-y-auto overflow-x-hidden">
                        <p className="font-popins text-base text-white">Test cases</p>
                        <div className="list-test-case overflow-y-auto overflow-x-hidden h-36 mr-2">
                          <div className="py-0 mr-3 md:h-52">
                            {testCases.map((item, index) => (
                              <div key={index}>
                                <div className="w-full h-14 px-4 bg-cool-gray-700 rounded-full my-3">
                                  <div
                                    onClick={() => toggleTestCase(index)}
                                    className="flex justify-between items-center w-full h-14 p-4 my-2 bg-cool-gray-700 rounded-full"
                                  >
                                    <p className="font-popins text-lg text-white m-0">
                                      {item.key}&nbsp;&nbsp;{item.title}
                                    </p>
                                    {item.icon}
                                  </div>
                                </div>
                                {visibleTestCase[index] && (
                                  <div className="h-16 w-full transition-transform text-white border border-gray-opacity bg-gray-800 rounded-sm p-2 px-4 text-md mt-2">
                                    <p>Input</p>
                                    <p>Output</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl={6} md={8} sm={12}>
                      <div className="xl:mt-6 md:mt-[38px] flex flex-col items-center">
                        <CustomedButton
                          label="RUN CODE"
                          Icon={PlayCircleOutlined}
                          classNameButton="border-0"
                          classNameIcon="text-2xl font-popins"
                        />
                        <CustomedButton
                          label="SUBMIT"
                          Icon={CompassOutlined}
                          classNameButton="border-0 mt-3"
                          classNameIcon="text-2xl font-popins"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainDetail
