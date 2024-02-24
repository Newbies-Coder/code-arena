import { Button, Calendar, Col, Row } from 'antd'
import Progression from '../../components/Progression'
import Statistic from '../../components/Statistic'
import './style.scss'
import Overview from '../../components/Overview'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Header } from 'antd/es/layout/layout'
import { NoNotiIcon } from '@/components/Icons'
import AvatarProfile from '@/container/Detail/components/AvatarProfile'

const MainHome = () => {
  return (
    <>
      <Header className="flex justify-between sticky top-0 z-50">
        <h3 className="text-white text-xl">Dashboard</h3>
        <div className="flex items-center">
          <Button className="h-10 w-10 px-2 mx-1 rounded-full border-yellow-400 flex justify-center items-center">
            <NoNotiIcon />
          </Button>
          <AvatarProfile />
        </div>
      </Header>
      <Row className="py-2 overflow-y-auto no-scrollbar">
        <Col xs={24} lg={24} xl={18}>
          <Progression />
          <Statistic />
        </Col>
        <Col xs={24} lg={0} xl={6} className="py-2 mb-20 hidden xl:flex flex-col gap-2 w-[332px]">
          <Overview />
          <Calendar
            className="border border-white"
            fullscreen={false}
            mode="month"
            headerRender={({ value, onChange }) => {
              return (
                <div className="p-4 flex justify-around items-center text-orange-500 font-bold bg-[#001529] rounded-t-lg">
                  <Button
                    icon={<LeftOutlined color="#f37007" className="text-[#f37007]" />}
                    onClick={() => {
                      const now = value.clone().month(value.month() - 1)
                      onChange(now)
                    }}
                  />
                  <span>{format(new Date(value.toDate()), 'MMM d yyyy')}</span>
                  <Button
                    icon={<RightOutlined className="text-[#f37007]" />}
                    onClick={() => {
                      const now = value.clone().month(value.month() + 1)
                      onChange(now)
                    }}
                  />
                </div>
              )
            }}
          />
        </Col>
      </Row>
    </>
  )
}

export default MainHome
