import { ObjectId } from 'mongodb'

interface CloseFriendsType {
  _id?: ObjectId
  userId: ObjectId
  friendId: ObjectId
  created_at?: Date
}

export default class CloseFriends {
  _id?: ObjectId
  userId: ObjectId
  friendId: ObjectId
  created_at: Date

  constructor(item: CloseFriendsType) {
    this._id = item._id
    this.userId = item.userId
    this.friendId = item.friendId
    this.created_at = item.created_at || new Date()
  }
}
