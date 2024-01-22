import { ObjectId } from 'mongodb'

export type RoomType = 'direct' | 'group'

interface RoomT {
  _id?: ObjectId
  name?: string
  type?: RoomType
  updated_at?: Date
  created_at?: Date
}

export default class Room {
  _id?: ObjectId
  name: string
  type: RoomType
  updated_at: Date
  created_at: Date

  constructor(item: RoomT) {
    this._id = item._id
    this.type = item.type
    this.name = item.name
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
