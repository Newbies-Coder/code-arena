export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  fullName: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutBody {
  refresh_token: string
}
