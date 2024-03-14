import { ObjectId } from 'mongodb'

type InvitationStatus = 'pending' | 'accepted' | 'rejected'

type InvitationType = Partial<{
  _id: ObjectId
  room: ObjectId
  sender: ObjectId
  recipient: ObjectId
  status: InvitationStatus
  dueTo: Date
  created_at: Date
}>

export default class Invitation {
  _id: ObjectId
  room: ObjectId
  sender: ObjectId
  recipient: ObjectId
  status: InvitationStatus
  dueTo: Date
  created_at?: Date

  constructor(item: InvitationType) {
    this._id = item._id
    this.room = item.room
    this.sender = item.sender
    this.recipient = item.recipient
    this.dueTo = item.dueTo
    this.status = item.status || 'pending'
    this.created_at = item.created_at || new Date()
  }
}
