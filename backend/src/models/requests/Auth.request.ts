export interface CreateUserBody {
  fullName: string
  username: string
  email: string
  phone: string
  password: string
  confirm_password: string
  date_of_birth: string
  role: string
  address: string
  gender: string
}

export interface UpdateUserBody {
  fullName?: string
  username?: string
  email?: string
  phone?: string
  date_of_birth?: string
  role?: string
  verify?: string
  address?: string
  gender?: string
  bio?: string
  website?: string
}
