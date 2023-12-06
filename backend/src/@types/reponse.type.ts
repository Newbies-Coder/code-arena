import { ObjectId } from 'mongodb'
import { UserGenderType, UserRole, UserVerifyStatus } from '~/constants/enums'

export type ResultRegisterType = {
  _id: string
  username: string
  email: string
  access_token: string
  refresh_token: string
}

export type ResultRefreshTokenType = {
  access_token: string
  refresh_token: string
}

export type ResultLoginType = {
  _id: string
  fullName: string
  email: string
  access_token: string
  refresh_token: string
}

export type UserResponseType = {
  _id?: ObjectId
  username: string
  fullName?: string
  email: string
  phone?: string
  date_of_birth: Date
  age?: number
  role?: UserRole
  forgot_password_token?: string
  gender?: UserGenderType
  verify?: UserVerifyStatus
  bio?: string
  address?: string
  website?: string
  avatar?: string
  cover_photo?: string
  isOnline?: Boolean
  created_at?: Date
  updated_at?: Date
}

export type UploadAvatarType = {
  avatarUrl: string
}
