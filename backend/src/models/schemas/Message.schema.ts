import { ObjectId } from 'mongodb'

export const attachmentTypes = ['image' , 'video'] as const

export type AttachmentType = (typeof attachmentTypes)[number]

export type Attachment = {
  type: AttachmentType
  content: string
}

type MessageType = {
  _id?: ObjectId
  sender: ObjectId
  room: ObjectId
  emotes?: Record<string, number>
  content?: string
  attachments?: Attachment[]
  updated_at?: Date
  created_at?: Date
}

export default class Message {
  _id?: ObjectId
  sender: ObjectId
  room: ObjectId
  updated_at: Date
  created_at: Date
  content?: string
  attachments?: Attachment[]

  constructor(item: MessageType) {
    this._id = item._id
    this.sender = item.sender
    this.room = item.room
    this.content = item.content
    this.attachments = item.attachments
    this.attachments = item.attachments
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
