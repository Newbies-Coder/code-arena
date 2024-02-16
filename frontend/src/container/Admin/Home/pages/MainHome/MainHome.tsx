import { Col, Row } from 'antd'
import Progression from '../../components/Progression'
import Statistic from '../../components/Statistic'
import './style.scss'

const MainHome = () => {
  return (
    <Row className="border-t border-[#949a9f]">
      <h2 className="ml-2 text-3xl font-bold font-popins leading-9 text-orange-500">Number progression chart</h2>
      <Progression />
      <Statistic />
    </Row>
  )
}

export default MainHome
