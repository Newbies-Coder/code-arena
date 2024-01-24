import { Col, Layout, Row } from 'antd'
import './style.scss'
import CarouselItem from '@/components/CarouselItem'
import SliderItem from '@/components/SliderItem'
import SidebarLeft from '@/components/SidebarLeft'
import SidebarRight from '@/components/SidebarRight'
import HeaderItem from '@/components/HeaderItem'
const { Content } = Layout

const MainHome = () => {
  return (
    <div className="wrapper p-0 m-0 bg-gray-900">
      <Layout style={{ height: '100%', backgroundColor: '#0e1820' }}>
        <div>
          <HeaderItem />
        </div>
        <Layout>
          <Row>
            <Col xs={{ span: 0 }} xl={{ span: 4 }}>
              <SidebarLeft />
            </Col>
            <Col className="mt-16" xs={{ span: 24 }} xl={{ span: 16 }}>
              <Content className="w-full overflow-y-auto">
                <div className="p-8 bg-blue-900">
                  <CarouselItem />
                  <p className="pt-10 font-popins lg:text-3xl text-white xs:text-base">Continue Watching</p>
                  <div className="xs:mx-2 ">
                    <SliderItem />
                  </div>
                  <p className="pt-10 font-popins lg:text-3xl text-white xs:text-base">Popular Courses</p>
                  <div className="xs:mx-2 ">
                    <SliderItem />
                  </div>
                  <div className="xs:mx-2 ">
                    <SliderItem />
                  </div>
                  <div className="xs:mx-2 ">
                    <SliderItem />
                  </div>
                  <div className="xs:mx-2 ">
                    <SliderItem />
                  </div>
                </div>
              </Content>
            </Col>
            <Col xs={{ span: 0 }} xl={{ span: 4 }}>
              <SidebarRight />
            </Col>
          </Row>
        </Layout>
      </Layout>
    </div>
  )
}

export default MainHome
