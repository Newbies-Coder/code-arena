import { userType } from '@/@types/user.type'
import { Avatar, Button } from 'antd'
import React from 'react'
import './style.scss'

type listItemType = {
  user: userType
  buttonText: string
  buttonDisplay?: string
}

type listType = {
  list: userType[]
  buttonText: string
  buttonDisplay?: string
}

const UserItem: React.FC<listItemType> = ({ user, buttonText, buttonDisplay }) => (
  <div className="flex justify-between items-center my-2 rounded-lg border-2 py-2 px-4 cursor-pointer">
    <div>
      <Avatar
        size={60}
        src={
          user.avatar === ''
            ? 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            : user.avatar
        }
      />
      <span className="font-popins text-lg ml-4 text-white">{user.username}</span>
    </div>
    <Button className={`font-popins text-blue-900 bg-white border-0 ${buttonDisplay}`}>{buttonText}</Button>
  </div>
)

const UserVerticalList: React.FC<listType> = ({ list, buttonText, buttonDisplay }) => {
  return (
    <div className="list-member overflow-y-auto h-[180px]">
      {list.map((user: userType) => (
        <UserItem key={user._id} user={user} buttonText={buttonText} buttonDisplay={buttonDisplay} />
      ))}
    </div>
  )
}

export default UserVerticalList
