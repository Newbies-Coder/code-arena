export interface userType {
  email?: string
  passWord?: string
  accessToken?: string
  refreshToken?: string
}

export interface userState {
  userLogin: userType
  userRegister: userType
}
