import { ObjectId } from 'mongodb'

type MemberType = {
  _id?: ObjectId
  memberId: ObjectId
  roomId: ObjectId
  nickname?: string
  avatar?: string
  // Notifications will not be sent before this time
  suppressNotificationTime?: Date
  created_at?: Date
}

export default class Member {
  _id: ObjectId
  memberId: ObjectId
  roomId: ObjectId
  nickname?: string
  avatar?: string
  suppressNotificationTime?: Date
  created_at: Date

  constructor(item: MemberType) {
    this.memberId = item.memberId
    this.nickname = item.nickname
    this.roomId = item.roomId
    this.avatar = item.avatar
    this.suppressNotificationTime = item.suppressNotificationTime || new Date()
    this.created_at = item.created_at || new Date()
  }
}
