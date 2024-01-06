import { Button, Calendar, Col, Row } from 'antd'
import Progression from '../../components/Progression'
import Statistic from '../../components/Statistic'
import Overview from '../../components/Overview'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import './style.scss'

const MainHome = () => {
  return (
    <Row className="bg-[#001529] h-full border-t border-[#949a9f]">
      <Col xs={24} lg={18} xl={18} className="p-2">
        <h2 className="ml-2 text-3xl font-bold font-popins leading-9 text-orange-500">Number progression chart</h2>
        <Progression />
        <Statistic />
      </Col>
      <Col xs={24} lg={6} xl={6} className="p-2">
        <h2 className="ml-2 text-3xl font-bold font-popins leading-9 text-orange-500">Overviews</h2>
        <Overview />
        <Calendar
          className="border border-white "
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
