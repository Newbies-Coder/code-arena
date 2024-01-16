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

export type userState = {
  userLogin: userType
  userRegister: userType
  userVerify: userType
  userResendOTP: userType
}
