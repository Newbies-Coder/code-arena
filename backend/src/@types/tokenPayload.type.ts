import { SignOptions } from 'jsonwebtoken'
import { TokenType, UserRole } from '~/constants/enums'

export type TokenPayloadType = {
  _id: string
  email: string
  role?: UserRole
  token_type: TokenType
}

export type SignTokenType = {
  payload: TokenPayloadType
  privateKey: string
  options: SignOptions
}

export type VerifyTokenType = {
  token: string
  secretOrPublicKey: string
}
