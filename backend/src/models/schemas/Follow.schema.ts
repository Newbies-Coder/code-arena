import { ObjectId } from 'mongodb'

interface FollowType {
  _id?: ObjectId
  followerId: ObjectId
  followedId: ObjectId
  created_at?: Date
}

export default class Follow {
  _id?: ObjectId
  followerId: ObjectId
  followedId: ObjectId
  created_at: Date

  constructor(item: FollowType) {
    this._id = item._id
    this.followedId = item.followedId
    this.followerId = item.followerId
    this.created_at = item.created_at || new Date()
  }
}
