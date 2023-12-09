import Sider from 'antd/es/layout/Sider'
import { UserIcon } from '../Icons'
import { Avatar, Button, Card } from 'antd'
import { BG, HOME_ICON } from '@/constants/images'
import { friendList } from '@/mocks/home.data'
const SidebarRight = () => {
  return (
    <Sider
      className="sider fixed mt-16 h-screen right-0 border-l overflow-y-auto"
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
            <Avatar
              className="bg-gray-200 mb-4"
              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
            ></Avatar>
            <div className="bg-orange-400 h-10 w-8 rounded-md">
              <img src={HOME_ICON.THIRD} className="pt-1" />
            </div>
          </div>
          <div>
            <Avatar
              className="bg-gray-200 mb-4"
              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
            ></Avatar>
            <div className="bg-yellow-200 h-20 w-8 rounded-md">
              <img src={HOME_ICON.FIRST} className="pt-12" />
            </div>
          </div>
          <div>
            <Avatar
              className="bg-gray-200 mb-4"
              src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
            ></Avatar>
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
          {friendList.map((friend) => (
            <li className="mx-0 mt-2" key={friend.key}>
              <Card
                size="small"
                className="bg-blue-opacity mx-4 border-transparent hover:border hover:border-gray-opacity"
                style={{ width: '95%', marginLeft: '5px' }}
                bodyStyle={{ padding: '6px 12px' }}
              >
                <div className="flex  items-center p-0">
                  <Avatar
                    size={40}
                    className="flex justify-center items-center bg-gray-300"
                    src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
                  ></Avatar>
                  <div className="ml-4">
                    <p className="m-0 text-white font-popins text-xs">{friend.name}</p>
                    <span className="text-gray-opacity">{friend.status}</span>
                  </div>
                  <div className="relative w-16">
                    <Button className="absolute h-4 p-0 ml-2 w-full top-0 border-gray-opacity text-[10px] text-yellow-200">
                      Follow
                    </Button>
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
