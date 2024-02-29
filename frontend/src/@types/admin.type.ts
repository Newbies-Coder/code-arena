export type MenuType = {
  items: MenuItemType[]
  collapsed: boolean
}

export type MenuItemType = {
  label: string
  icon: React.ReactNode
  link: string
  active: boolean
  color: string
}

export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}

export enum UserVerifyStatus {
  Unverified = 'Unverified',
  Verified = 'Verified',
  Celerity = 'Celerity',
  Banned = 'Banned',
}

export enum UserGenderType {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type UserDataType = {
  key?: React.Key
  _id: string
  fullName: string
  username: string
  phone: string
  email: string
  role: UserRole
  verify: UserVerifyStatus
  date_of_birth: string
  address: string
  gender: UserGenderType
  bio: string
  website: string
  _destroy: boolean
}

export type AccountType = UserDataType & {
  password: string
  confirm_password: string
}

export type LoginInfoDataType = {
  key: React.Key
  id: string
  name: string
  email: string
  role: string
  loginTime: string
  logoutTime: string
}

export type ProfileDataType = {
  fullName: string
  username: string
  phone: string
  date_of_birth: string
  address: string
  gender: string
  avatar: string
  cover_photo: string
}
