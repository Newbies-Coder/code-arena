export type userType = {
  _id: string
  username: string
  email: string
  access_token: string
  refresh_token: string
}

export type userState = {
  login: userType | null
  register: userType | null
  verify: userType | null
  resendOTP: userType | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  email: string | null
}

export type userLoginType = {
  _id: string
  username: string
  email: string
  role: string
  token_type: string
  iat: string
  exp: string
}
