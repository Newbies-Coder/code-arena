import { ObjectId } from 'mongodb'
import { TokenType, UserGenderType, UserRole, UserVerifyStatus } from '~/constants/enums'

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
export type LoginResultType = {
  _id: string
  email: string
  username: string
  access_token: string
  refresh_token: string
}

export type ResultCheckTokenType = {
  _id: ObjectId
  email: string
  role: string
  token_type: TokenType.AccessToken | TokenType.RefreshToken
  iat: string
  exp: string
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

export type UploadThumbnailType = {
  thumbnailUrl: string
}

export type PaginationType<T> = {
  items: T[]
  page: number
  limit: number
  total_pages: number
  total_items: number
}

export type ParsedGetAllUserUrlQuery = {
  page?: string
  limit?: string
  userId?: string
  sort_by?: string
  created_at?: string
}

export type ParsedGetUserByRoleUrlQuery = {
  page?: string
  limit?: string
  includes?: UserRole.User | UserRole.Admin | UserRole.Moderator
}

export type ParsedGetAllUserFavoriteUrlQuery = {
  page?: string
  limit?: string
  created_at?: string
}

export type ParsedBannerUrlQuery = {
  page?: string
  limit?: string
  bannerId?: string
  sort_by?: string
  sort_order?: string
}

export type ParsedGetAllUserBlockedUrlQuery = {
  page?: string
  limit?: string
  created_at?: 'asc' | 'desc'
}
