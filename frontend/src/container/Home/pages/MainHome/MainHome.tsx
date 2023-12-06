import { BackendIcon, DesignIcon, FrontendIcon, HomeIcon, NewsIcon } from '@/components/Icons'
import { Button, Card, Col, Layout, Row } from 'antd'
import './style.scss'
import CarouselItem from '@/components/CarouselItem'
import SliderItem from '@/components/SliderItem'
import SidebarLeft from '@/components/SidebarLeft'
import SidebarRight from '@/components/SidebarRight'
import HeaderItem from '@/components/HeaderItem'
import { useState } from 'react'
const { Content } = Layout

const MainHome = () => {
  return (
    <Layout style={{ height: '100%', backgroundColor: '#0e1820' }}>
      <div>
        <HeaderItem />
      </div>
      <Layout>
        <Row>
          <Col style={{ height: '100%' }} xs={{ span: 0 }} xl={{ span: 3 }}>
            <SidebarLeft />
          </Col>
          <Col style={{ height: '100%', marginTop: '64px' }} xs={{ span: 24 }} xl={{ span: 18 }}>
            <Content style={{ width: '100%', overflow: 'initial', height: '100%' }}>
              <div style={{ padding: 24, backgroundColor: '#0e1820', height: '100%' }}>
                <CarouselItem />
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}
                >
                  <Col span={8}>
                    <Card
                      hoverable
                      size="small"
                      className="bg-blue-900 border-gray-opacity hover:border-gray-500 rounded-2xl"
                    >
                      <div className="flex justify-center items-center">
                        <DesignIcon />
                        <div className="text-white ml-2">
                          <span className="xs:hidden xs:text-xs lg:block">6/12 watched</span>
                          <h2 className="mb-0 text-base">UI/UX DESIGN</h2>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      hoverable
                      size="small"
                      className="bg-blue-900 border-gray-opacity hover:border-gray-500 rounded-2xl"
                    >
                      <div className="flex justify-center items-center">
                        <FrontendIcon className="h-10 w-10" />
                        <div className="text-white ml-2">
                          <span className="xs:hidden xs:text-xs lg:block">6/12 watched</span>
                          <h2 className="mb-0 text-base">FRONTEND</h2>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card
                      hoverable
                      size="small"
                      className="bg-blue-900 border-gray-opacity hover:border-gray-500 rounded-2xl"
                    >
                      <div className="flex justify-center items-center">
                        <BackendIcon className="h-10 w-10" />
                        <div className="text-white ml-2">
                          <span className="xs:hidden xs:text-xs lg:block">6/12 watched</span>
                          <h2 className="mb-0 text-base">BACKEND</h2>
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
                <p className="pt-10 font-popins text-3xl text-white">Continue Watching</p>
                <div className="mx-10">
                  <SliderItem />
                </div>
                <p className="pt-10 font-popins text-3xl text-white">Popular Courses</p>
              </div>
            </Content>
          </Col>
          <Col style={{ height: '100%' }} xs={{ span: 0 }} xl={{ span: 3 }}>
            <SidebarRight />
          </Col>
        </Row>
      </Layout>
    </Layout>
  )
}

export default MainHome
