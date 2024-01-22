import { ObjectId } from 'mongodb'

export type MessageType = 'message' | 'attachment'

interface MessageT {
  _id?: ObjectId
  user_id: ObjectId
  channel_id: ObjectId
  content: string
  updated_at?: Date
  created_at?: Date
}

export default class Message {
  _id?: ObjectId
  content: string
  user_id: ObjectId
  channel_id: ObjectId
  updated_at: Date
  created_at: Date

  constructor(item: MessageT) {
    this._id = item._id
    this.content = item.content
    this.user_id = item.user_id
    this.channel_id = item.channel_id
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
