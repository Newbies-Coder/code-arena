export type ResultRegisterType = {
  _id: string
  fullName: string
  email: string
  access_token: string
  refresh_token: string
}

export type ResultRefreshTokenType = {
  access_token: string
  refresh_token: string
}
