import { ObjectId } from 'mongodb'

type BannedMemberType = {
  _id?: ObjectId
  room: ObjectId
  user: ObjectId
  dueTo: Date
  created_at?: Date
}

export default class BannedMember {
  _id: ObjectId
  room: ObjectId
  user: ObjectId
  dueTo?: Date
  created_at: Date

  constructor(item: BannedMemberType) {
    this.room = item.room
    this.dueTo = item.dueTo
    this.user = item.user
    this.created_at = item.created_at || new Date()
  }
}
