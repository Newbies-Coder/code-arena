import { UserGenderType, UserRole, UserVerifyStatus } from '~/constants/enums'

export interface CreateUserBody {
  fullName: string
  username: string
  email: string
  phone: string
  password: string
  confirm_password: string
  date_of_birth: string
  role: UserRole
  address: string
  gender: UserGenderType
}

export interface UpdateUserBody {
  fullName?: string
  username?: string
  phone?: string
  date_of_birth?: Date
  role?: UserRole
  verify?: UserVerifyStatus
  address?: string
  gender?: UserGenderType
  bio?: string
  website?: string
}
