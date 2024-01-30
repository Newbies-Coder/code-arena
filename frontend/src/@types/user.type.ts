export type userType = {
  username?: string
  email?: string
  password?: string
  confirm_password?: string
  date_of_birth?: string
  accessToken?: string
  refreshToken?: string
  message?: string
  access_token?: string
  refresh_token?: string
  otp?: string
}

export type userLoginType = {
  _id: string
  username: string
  email: string
  access_token: string
  refresh_token: string
}

export type userState = {
  login: userLoginType | null
  register: userType
  verify: userType
  resendOTP: userType
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  isAdmin: boolean
}
