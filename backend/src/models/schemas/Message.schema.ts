import { ObjectId } from 'mongodb'

export type MessageType = 'text' | 'image'

type MessageT = {
  _id?: ObjectId
  sender: ObjectId
  room: ObjectId
  emotes: Record<string, number>
  updated_at?: Date
  created_at?: Date
} & (
  | {
      messageType: 'text'
      content: string
    }
  | {
      messageType: 'image'
      images: string[]
    }
)

export default class Message {
  _id?: ObjectId
  sender: ObjectId
  room: ObjectId
  updated_at: Date
  created_at: Date
  messageType: MessageType
  content?: string
  images?: string[]

  constructor(item: MessageT) {
    this._id = item._id
    this.sender = item.sender
    this.room = item.room
    this.messageType = item.messageType

    if (item.messageType == 'text') {
      this.content = item.content
    } else {
      this.images = item.images
    }

    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
