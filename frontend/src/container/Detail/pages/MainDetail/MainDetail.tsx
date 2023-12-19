import { ForumIcon, RankIcon, ResultIcon } from '@/components/Icons'
import { LOGO } from '@/constants/images'
import { Button, Col, Layout, Row } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { ArrowLeftOutlined, BulbOutlined } from '@ant-design/icons'
import './style.scss'
import HeaderItem from '@/components/HeaderItem'
import CodeEditor from '../../components/CodeEditor'

const MainDetail = () => {
  return (
    <Layout className="max-h-screen">
      <HeaderItem classNameInput="hidden" />
      {/* <Col xl={1}> */}
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
      {/* </Col> */}
      {/* <Col xl={23}> */}
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
                <div className="fixed w-full">
                  <CodeEditor />
                </div>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
      {/* </Col> */}
    </Layout>
  )
}

export default MainDetail
