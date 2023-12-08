import Sider from 'antd/es/layout/Sider'
import { UserIcon } from '../Icons'
import { Avatar, Button, Card } from 'antd'
import { HOME_ICON } from '@/constants/images'
import { friendList } from '@/mocks/home.data'
const SidebarRight = () => {
  return (
    <Sider
      className="sider fixed mt-16 h-screen right-0 border-l"
      style={{
        position: 'fixed',
        background: '#0e1820',
        borderLeftColor: 'rgba(255, 255, 255, 0.20)',
      }}
      width={255}
    >
      <Card className="bg-blue-900 mx-4 border-gray-opacity px-2">
        <div className="flex justify-between items-end h-full">
          <div>
            <Avatar className="bg-gray-200 mb-4"></Avatar>
            <div className="bg-orange-400 h-10 w-8 rounded-md">
              <img src={HOME_ICON.THIRD} className="pt-1" />
            </div>
          </div>
          <div>
            <Avatar className="bg-gray-200 mb-4"></Avatar>
            <div className="bg-yellow-200 h-20 w-8 rounded-md">
              <img src={HOME_ICON.FIRST} className="pt-12" />
            </div>
          </div>
          <div>
            <Avatar className="bg-gray-200 mb-4"></Avatar>
            <div className="bg-gray-200 h-16 w-8 rounded-md">
              <img src={HOME_ICON.SECOND} className="pt-8" />
            </div>
          </div>
        </div>
      </Card>
      <Card className="bg-blue-900 mx-2 border-gray-opacity mt-10"></Card>
      <div className="flex justify-around items-center pt-6">
        <p className="text-gray-opacity self-auto m-0">Your Friends</p>
        <Button type="link" className="text-gray-opacity p-0">
          See all
        </Button>
      </div>
      <div>
        <ul>
          {friendList.map((friend, index) => (
            <li className="mx-0 mt-2" key={friend.key}>
              <Card
                size="small"
                className="bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                style={{ width: '95%', marginLeft: '5px' }}
                bodyStyle={{ paddingTop: '8px', paddingBottom: '8px' }}
              >
                <div className="flex justify-center items-center p-0">
                  <Avatar size={40} className="flex justify-center items-center bg-gray-300">
                    <UserIcon />
                  </Avatar>
                  <div className="pl-4">
                    <p className="m-0 text-white font-popins">{friend.name}</p>
                    <span className="text-gray-opacity">{friend.status}</span>
                    <Button className="h-4 ml-3 p-0 m-0 px-4 border-gray-opacity text-[10px] text-yellow-200"></Button>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Sider>
  )
}

export default SidebarRight
