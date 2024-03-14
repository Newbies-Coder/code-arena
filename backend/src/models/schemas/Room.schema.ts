import { ObjectId } from 'mongodb'
import Member from '~/models/schemas/Member.schema'

export const roomTypes = ['single', 'multiple'] as const

export type RoomType = (typeof roomTypes)[number]

interface RoomT {
  _id?: ObjectId
  name?: string
  type?: RoomType
  isPrivate: boolean
  pinnedMessage?: ObjectId
  owner?: ObjectId
  avatar?: string
  background?: string
  emote?: string
  password?: string
  isDeleted: boolean
  updated_at?: Date
  created_at?: Date
}

export default class Room {
  _id?: ObjectId
  name: string
  owner?: ObjectId
  type: RoomType
  isPrivate: boolean
  pinnedMessage?: ObjectId
  password?: string
  avatar?: string
  background?: string
  emote?: string
  isDeleted: boolean
  updated_at: Date
  created_at: Date

  constructor(item: RoomT) {
    this._id = item._id
    this.type = item.type
    this.name = item.name
    this.owner = item.owner
    this.isPrivate = item.isPrivate || false
    this.password = item.password
    this.avatar = item.avatar
    this.emote = item.emote
    this.pinnedMessage = item.pinnedMessage
    this.background = item.background
    this.isDeleted = item.isDeleted || false
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
