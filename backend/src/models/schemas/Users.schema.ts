import { ObjectId } from 'mongodb'
import { AuthProvider } from '~/@types/auth.type'
import { UserRole, UserVerifyStatus, UserGenderType } from '~/constants/enums'

// var number = moment().year()
//  - Number(moment('2000-02-22T00:00:00.000Z').format('YYYY'))
interface UserType {
  _id?: ObjectId
  username?: string
  fullName?: string
  email: string
  phone?: string
  date_of_birth?: Date
  age?: number
  password?: string
  providerId?: string
  provider?: AuthProvider
  role?: UserRole
  gender?: UserGenderType
  verify?: UserVerifyStatus
  bio?: string
  address?: string
  website?: string
  avatar?: string
  cover_photo?: string
  isOnline?: Boolean
  _destroy?: Boolean
  password_change_at?: Date
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  fullName: string
  username: string
  email: string
  phone: string
  date_of_birth?: Date
  age: number
  password?: string
  providerId?: string
  provider?: AuthProvider
  role: UserRole
  gender: UserGenderType
  verify: UserVerifyStatus
  bio: string
  address: string
  website: string
  avatar: string
  cover_photo: string
  isOnline: Boolean
  _destroy: Boolean
  password_change_at: Date
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    this._id = user._id
    this.website = user.website || ''
    this.username = user.username
    this.fullName = user.fullName || ''
    this.email = user.email
    this.phone = user.phone || ''
    this.age = user.age || null
    this.gender = user.gender || null
    this.date_of_birth = user.date_of_birth || new Date()
    this.password = user.password
    this.provider = user.provider
    this.providerId = user.providerId
    this.role = user.role || UserRole.User
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.bio = user.bio || ''
    this.address = user.address || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
    this.isOnline = user.isOnline || false
    this._destroy = user._destroy || false
    this.password_change_at = user.password_change_at || null
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || null
  }
}
