import { Button, Calendar, Col, Row } from 'antd'
import Progression from '../../components/Progression'
import Statistic from '../../components/Statistic'
import './style.scss'
import Overview from '../../components/Overview'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { format } from 'date-fns'

const MainHome = () => {
  return (
    <Row className="py-2">
      <Col xs={24} lg={24} xl={18}>
        <Progression />
        <Statistic />
      </Col>
      <Col xs={24} lg={0} xl={6} className="py-2 mb-20 flex flex-col gap-2 fixed right-0 w-[332px]">
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
  )
}

export default MainHome
