import { MenuType } from '@/@types/home'
import { menuItems } from '@/mocks/home.data'
import { useState } from 'react'

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState<MenuType[]>(menuItems)
  const handleClickMenu = (index: number) => {
    const updatedMenuItems = [...menuItems]
    updatedMenuItems[index] = { ...updatedMenuItems[index], active: !updatedMenuItems[index].active }
    setVisible(updatedMenuItems)
  }
  return (
    <div>
      <ul>
        {menuItems.map((item) => (
          <div key={item.key}>
            <li
              key={item.key}
              onClick={() => {
                handleClickMenu(item.key)
              }}
              className={visible[item.key].active ? 'flex justify-between hover:bg-gray-opacity py-2 my-2' : 'hidden'}
            >
              <div className="flex items-center">
                <item.LineIcon />
                <p className="font-popins text-white m-0 pl-6">{item.label}</p>
              </div>
              <item.Icon className="mr-4" />
            </li>
            <li
              onClick={() => handleClickMenu(item.key)}
              className={
                visible[item.key].active
                  ? `hidden`
                  : `relative flex justify-between ${item.color} py-2 rounded-r-3xl my-2`
              }
            >
              <div className="flex items-center">
                <item.LineIcon />
                <p className="font-popins text-white m-0 pl-6">{item.label}</p>
              </div>
              <div className="absolute bg-black z-10 p-2 rounded-full right-1 bottom-[3px]">
                <item.IconActive />
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Navbar
