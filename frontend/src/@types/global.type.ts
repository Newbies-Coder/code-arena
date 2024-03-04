export type routeTypes = {
  home: string
  profile: string
  login: string
  register: string
  newPassword: string
  forgotPassword: string
  verification: string
  congratulation: string
  passwordResetSuccess: string
  notFound: string
  admin: routeAdminTypes
  detailCoding: string
  resetPassword: string
  chat: string
}

export type routeAdminTypes = {
  home: string
  login: string
  resetPassword: string
  createNewPassword: string
  profile: string
  user: string
  addUser: string
  updateUser: string
  course: string
  message: string
  loginInfo: string
}
