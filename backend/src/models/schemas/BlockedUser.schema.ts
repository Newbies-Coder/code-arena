import { ObjectId } from 'mongodb'

interface BlockedUserType {
  _id?: ObjectId
  blockerId: ObjectId
  blockedId: ObjectId
  created_at?: Date
  updated_at?: Date
}

export default class BlockedUser {
  _id: ObjectId
  blockerId: ObjectId
  blockedId: ObjectId
  created_at: Date
  updated_at: Date

  constructor(user: BlockedUserType) {
    this._id = user._id
    this.blockedId = user.blockedId
    this.blockerId = user.blockerId
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || null
  }
}
