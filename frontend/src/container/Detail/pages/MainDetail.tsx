import { Col, Layout, Row, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Header } from 'antd/es/layout/layout'
const MainDetail = () => {
  return (
    // <Layout className="min-h-screen">
    //   <Sider style={{ background: '#252E38' }}></Sider>
    //   <Layout>
    //     <Header className="fixed top-0 w-full bg-blue-900 "></Header>
    //     <Layout>
    //       <Content className="w-full overflow-y-auto bg-gray-600"></Content>
    //     </Layout>
    //   </Layout>
    // </Layout>
    <Layout className="min-h-screen">
      <Row className="min-h-screen">
        <Col xl={{ span: 2 }}>
          <Sider style={{ background: '#252E38' }}></Sider>
        </Col>
        <Col>
          <Header className="fixed top-0 w-full bg-blue-900"></Header>
          <Row>
            <Content className="w-full overflow-y-auto bg-gray-600"></Content>
          </Row>
        </Col>
      </Row>
      <Sider style={{ background: '#252E38' }}></Sider>
    </Layout>
  )
}

export default MainDetail
