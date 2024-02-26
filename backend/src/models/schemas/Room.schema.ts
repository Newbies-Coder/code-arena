import { ObjectId } from 'mongodb'
import Member from '~/models/schemas/Member.schema'

export type RoomType = 'single' | 'multiple'

interface RoomT {
  _id?: ObjectId
  name?: string
  type?: RoomType
  isPrivate: boolean
  owner?: ObjectId
  member: Member[]
  avatar?: string
  background?: string
  password?: string
  isDeleted: boolean
  updated_at?: Date
  created_at?: Date
}

export default class Room {
  _id?: ObjectId
  name: string
  owner: ObjectId
  type: RoomType
  isPrivate: boolean
  password?: string
  avatar?: string
  background?: string
  member: Member[]
  isDeleted: boolean
  updated_at: Date
  created_at: Date

  constructor(item: RoomT) {
    this._id = item._id
    this.type = item.type
    this.name = item.name
    this.owner = item.owner
    this.isPrivate = item.isPrivate || false
    this.member = item.member
    this.password = item.password
    this.avatar = item.avatar
    this.background = item.background
    this.isDeleted = item.isDeleted || false
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
