export interface userType {
  email?: string
  username?: string
  access_token?: string
  refresh_token?: string
}

export interface userState {
  userLogin: userType
  userRegister: userType
}
