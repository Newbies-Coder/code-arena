import { DownOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import { useState } from 'react'

const items = ['All', 'Admin', 'User', 'Moderator']

export default function RoleDropdown() {
  const [roleSelected, setRoleSelected] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuClick = (e: { key: React.Key }) => {
    setRoleSelected(Number(e.key))
    setIsOpen(false)
  }

  return (
    <div className="min-w-[300px]">
      <p className="text-white">Role name</p>
      <div className="relative">
        <Button
          className="w-full h-11 flex flex-row-reverse items-center justify-between text-white"
          icon={<DownOutlined />}
          onClick={() => setIsOpen(!isOpen)}
        >
          {items[roleSelected]}
        </Button>
        {isOpen && (
          <Menu onClick={handleMenuClick} className="absolute mt-2 left-0 right-0 rounded-lg z-10 shadow-gray-400">
            {items.map((item, key) => (
              <Menu.Item key={key}>{item}</Menu.Item>
            ))}
          </Menu>
        )}
      </div>
    </div>
  )
}
