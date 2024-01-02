import { ObjectId } from 'mongodb'
import { ParsedUrlQuery } from 'querystring'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterBody {
  username: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutBody {
  refresh_token: string
}

export interface ForgotPasswordBody {
  email: string
}

export interface VerifyOTPBody {
  otp: string
}

export interface RefreshTokenBody {
  refresh_token: string
}

export interface ChangePasswordBody {
  email: string
  password: string
}

export interface ResendVerifyOTPBody {
  email: string
}

export interface ResetPasswordBody {
  email: string
  password: string
  confirm_password: string
}

export interface InfoTokenType {
  _id: ObjectId
  email: string
  role: string
  token_type: string
  iat: number
  exp: number
}

export interface BlockUserBody {
  blockedId: string
}
export interface UpdateProfileBody {
  fullName?: string
  username?: string
  email?: string
  phone?: string
  date_of_birth?: Date
  bio?: string
  address?: string
}

export interface GetUsersByRoleQuery extends ParsedUrlQuery {
  includes: string
  pageNumber: string
  limit: string
}

export interface FavoriteBody {
  friendId: string
}
