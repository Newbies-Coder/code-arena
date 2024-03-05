import { friendList } from '@/mocks/home.data'
import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Badge, Card, Input, Tabs, TabsProps } from 'antd'

const messageContent = 'Hey Alex which one do you prefer?'
const maxLength = 10

const items: TabsProps['items'] = [
  {
    key: '1',
    label: (
      <Badge dot style={{ borderColor: '#F00' }} className="text-white font-popins">
        DIRECT
      </Badge>
    ),
    children: (
      <>
        <div className="relative">
          <SearchOutlined className="absolute z-10 ml-3 top-[14px]" />
          <Input
            className="px-8 h-10 font-popins rounded-full text-base w-full bg-blue-900 text-white border-White border-2 placeholder:text-white placeholder:font-popins"
            placeholder="Search"
          />
        </div>
        <div className="bg-blue-900">
          <div className="list-member overflow-y-auto xl:h-[400px] xs:h-[270px] ss:h-[370px] xss:h-[430px] smm:h-[500px] md:h-[700px] lg:h-[1000px] 3xl:h-[750px] mt-2">
            <ul>
              {friendList.map((friend) => (
                <li className="mx-0 mt-2" key={friend.key}>
                  <Card
                    size="small"
                    className="bg-blue-opacity mx-4 border-white hover:border hover:border-gray-opacity"
                    style={{ width: '95%', marginLeft: '5px' }}
                    bodyStyle={{ padding: '10px 12px' }}
                  >
                    <div className="flex items-center p-0">
                      <Avatar
                        size={40}
                        className="flex justify-center items-center bg-gray-300"
                        src="https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg"
                      ></Avatar>
                      <span
                        className={
                          friend.status === 'online'
                            ? 'absolute rounded-full h-3 w-3 border bg-green-400 bottom-3 left-10'
                            : 'absolute rounded-full h-3 w-3 border bg-gray-500 bottom-3 left-10'
                        }
                      ></span>
                      <div className="xs:ml-2 smm:ml-4 md:ml-2 lg:ml-4">
                        <p className="m-0 text-white font-popins text-sm">{friend.name}</p>
                        {messageContent.length < maxLength ? (
                          <span className="text-gray-opacity">{messageContent}</span>
                        ) : (
                          <span className="text-gray-opacity">{messageContent.substring(0, maxLength) + '...'}</span>
                        )}
                      </div>
                      <div className="absolute right-3">
                        <p className="m-0 text-gray-500 font-popins text-sm">4:00</p>
                        <div className="bg-purple-600 rounded-full h-5 w-5 text-[10px] text-white font-popins flex justify-center items-center">
                          3
                        </div>
                      </div>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    key: '2',
    label: (
      <Badge dot style={{ borderColor: '#F00' }} className="text-white font-popins">
        GROUP
      </Badge>
    ),
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: (
      <Badge dot style={{ borderColor: '#F00' }} className="text-white font-popins">
        PUBLIC
      </Badge>
    ),
    children: 'Content of Tab Pane 3',
  },
]

const Tabbar = () => {
  return <Tabs defaultActiveKey="1" items={items} className="min-h-screen  text-white" />
}

export default Tabbar
