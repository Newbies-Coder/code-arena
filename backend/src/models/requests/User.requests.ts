import { ObjectId } from 'mongodb'
import { TokenType, UserRole } from '~/constants/enums'

export interface LoginPayload {
  email: string
  password: string
}

export interface AccessTokenPayload {
  _id: string
  username: string
  email: string
  role: UserRole
  token_type: TokenType.AccessToken
}

export interface RefreshTokenPayload {
  _id: string
  username: string
  email: string
  role: UserRole
  token_type: TokenType.RefreshToken
}

export interface RefreshTokenBody {
  refresh_token: string
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

export interface ResendVerifyOTPBody {
  email: string
}

export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}

export interface ResetPasswordBody {
  email: string
  password: string
}

export interface ChangePasswordBody {
  old_password: string
  password: string
}

export interface InfoTokenType {
  _id: ObjectId
  email: string
  role: string
  token_type: TokenType.AccessToken | TokenType.RefreshToken
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

export interface FavoriteBody {
  friendId: string
}
