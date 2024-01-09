import { Card, Col, Row } from 'antd'
import './style.scss'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { DASHBOARD_ADMIN_ICON } from '@/constants/images'

export default function Progression() {
  return (
    <Row className="mx-2 flex justify-center">
      <Col xs={24} md={11} lg={11} xl={6}>
        <Card
          title={
            <p className="my-2">
              Numerical order <br /> granted
            </p>
          }
          className="mb-2 mx-2 bg-gradient-to-b from-[#EC4887] to-[#B954A4]"
          bordered={false}
        >
          <div className="flex justify-between">
            <div className="flex flex-col-reverse">
              <img src={DASHBOARD_ADMIN_ICON.BAR_CHART} alt="line-chart" className="h-11"></img>
            </div>
            <div className="w-20">
              <h4 className="text-center text-white text-base font-bold">4.221</h4>
              <div className="p-1 bg-[#c663a8] rounded-3xl text-[#FFE500] font-semibold">
                <ArrowUpOutlined />
                <span className="ml-2">32,41%</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} md={11} lg={11} xl={6}>
        <Card
          title={
            <p className="my-2">
              Numerical order <br /> granted
            </p>
          }
          className="mb-2 mx-2 bg-gradient-to-b from-[#7155BF] to-[#8375CC]"
          bordered={false}
        >
          <div className="flex flex-row-reverse">
            <div className="absolute bottom-5 left-6 right-0 overflow-hidden">
              <div className="flex flex-col-reverse">
                <img src={DASHBOARD_ADMIN_ICON.CLOUD} alt="cloud_image" className="h-11"></img>
              </div>
            </div>
            <div className="z-10 w-20">
              <h4 className="text-center text-white text-base font-bold">4.221</h4>
              <div className="p-1 bg-[#c663a8] rounded-3xl text-[#FFE500]">
                <ArrowDownOutlined />
                <span className="ml-2">32,41%</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} md={11} lg={11} xl={6}>
        <Card
          title={
            <p className="my-2">
              Numerical order <br /> waiting
            </p>
          }
          className="mb-2 mx-2 bg-gradient-to-r from-[#46c4f2] to-[#619bdd]"
          bordered={false}
        >
          <div className="flex justify-between items-center">
            <img src={DASHBOARD_ADMIN_ICON.LINE_CHART} alt="line-chart" className="w-20"></img>
            <div className="w-20">
              <h4 className="text-center text-white text-base font-bold">468</h4>
              <div className="p-1 bg-[#c663a8] rounded-3xl text-[#FFE500] font-semibold">
                <ArrowUpOutlined />
                <span className="ml-2">56,41%</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} md={11} lg={11} xl={6}>
        <Card
          title={
            <p className="my-2">
              Numerical order <br /> has skipped
            </p>
          }
          className="mb-2 mx-2 bg-gradient-to-b from-[#feb62d] to-red-400"
          bordered={false}
        >
          <div className="flex justify-between">
            <div className="flex flex-col-reverse">
              <img src={DASHBOARD_ADMIN_ICON.BAR_CHART} alt="line-chart" className="h-11"></img>
            </div>
            <div className="w-20">
              <h4 className="text-center text-white text-base font-bold">4.221</h4>
              <div className="p-1 bg-[#c663a8] rounded-3xl text-[#FFE500] font-semibold">
                <ArrowUpOutlined />
                <span className="ml-2">32,41%</span>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}
