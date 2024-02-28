import { ObjectId } from 'mongodb'

type MemberType = Partial<{
  memberId: ObjectId
  nickname?: string
  avatar?: string
  // Notifications will not be sent before this time
  suppressNotificationTime?: Date
  created_at?: Date
}>

export default class Member {
  memberId: ObjectId
  nickname?: string
  avatar?: string
  suppressNotificationTime?: Date
  created_at: Date

  constructor(item: MemberType) {
    this.memberId = item.memberId
    this.nickname = item.nickname
    this.avatar = item.avatar
    this.suppressNotificationTime = item.suppressNotificationTime || new Date()
    this.created_at = item.created_at || new Date()
  }
}
