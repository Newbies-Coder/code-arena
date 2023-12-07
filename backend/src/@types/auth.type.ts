import { UserRole } from '~/constants/enums'

export type GenerateOTPResult = {
  code: string
  email: string
}

export type AuthUser = {
  _id: string
  role: UserRole
  email: string
}

export const authProviders = ['github', 'facebook', 'google', 'linkedin'] as const

export type AuthProvider = (typeof authProviders)[number]
