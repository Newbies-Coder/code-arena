import { HOME_ICON } from '@/constants/images'
import { Button, Layout } from 'antd'
import './style.scss'
import { ProfileMenuItems } from '@/mocks/home.data'
const { Sider, Content } = Layout

const MainProfile = () => {
  return (
    <>
      <Layout className="h-screen">
        <Sider width="15%" style={{ backgroundColor: '#252E38' }}>
          <img src={HOME_ICON.LOGO_TEXT} alt="logo" />
          <ul className="mt-12 lg:ml-16 lg:flex-none xl:ml-10 xs:ml-2 ss:ml-3 xss:ml-4 smm:ml-7 md:ml-10">
            {ProfileMenuItems.map((item) => (
              <li className="py-6" key={item.key}>
                <Button
                  icon={<item.Icon />}
                  className="menu h-full border-0 p-0 text-xl font-popins text-gray-300 flex justify-center items-center"
                >
                  <p className="m-0 xl:block xs:hidden">{item.label}</p>
                </Button>
              </li>
            ))}
          </ul>
        </Sider>
        <Layout>
          <Content>Content</Content>
        </Layout>
      </Layout>
    </>
  )
}

export default MainProfile
