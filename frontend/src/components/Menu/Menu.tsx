import { MenuItemType, MenuType } from '@/@types/admin.type'
import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Menu(props: MenuType) {
  const [menu, setMenu] = useState(props.items)
  const handleItemActive = (index: number) => {
    const menuUpdate = [...props.items]
    menuUpdate[index] = { ...menuUpdate[index], active: true }
    setMenu(menuUpdate)
  }
  return (
    <div className={clsx(['mt-2 fixed top-16', props.collapsed ? 'w-20' : 'w-48'])}>
      {menu.map((item: MenuItemType, index: number) => (
        <div key={index} className="flex my-2 mr-2 text-white" onClick={() => handleItemActive(index)}>
          <div style={{ border: `1px solid ${item.color}` }}></div>
          <Link
            to={item.link}
            className={clsx([
              'flex justify-between items-center w-full p-1 text-sm font-semibold',
              item.active && 'rounded-r-3xl',
            ])}
            style={item.active ? { backgroundColor: item.color } : {}}
          >
            <span className="ml-4">{!props.collapsed && item.label}</span>
            <div className={clsx(['p-2', item.active && `bg-black rounded-full`])}>{item.icon}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}
