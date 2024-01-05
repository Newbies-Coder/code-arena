import { Col, Row } from 'antd'
import Progression from '../../components/Progression'
import Statistic from '../../components/Statistic'

const MainHome = () => {
  return (
    <Row className="bg-[#001529] h-full border-t border-[#949a9f]">
      <Col xs={24} lg={18} xl={18}>
        <h2 className="ml-2 text-3xl font-bold font-popins leading-9 text-orange-500">Number progression chart</h2>
        <Progression />
        <Statistic />
      </Col>
      <Col xs={12} lg={6} xl={6}>
        <h2 className="ml-2 text-3xl font-bold font-popins leading-9 text-orange-500">Overviews</h2>
      </Col>
    </Row>
  )
}

export default MainHome
