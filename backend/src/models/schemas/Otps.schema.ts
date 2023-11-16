import { ObjectId } from 'mongodb'

interface OTPType {
  _id?: ObjectId
  email: string
  otp: string
  expiredIn?: Date
  created_at?: Date
  updated_at?: Date
}

export default class OTP {
  _id?: ObjectId
  email: string
  otp: string
  expiredIn: Date
  created_at: Date
  updated_at: Date

  constructor(item: OTPType) {
    this._id = item._id
    this.email = item.email
    this.otp = item.otp
    this.expiredIn = item.expiredIn || new Date(Date.now() + 5 * 60000)
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || null
  }
}
