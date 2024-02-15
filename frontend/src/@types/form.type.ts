import { Rule } from 'antd/es/form'

export type FieldType = {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  date?: string
}

export type LoginFieldType = {
  email: string
  password: string
}

export type RegisterFieldType = {
  username: string
  email: string
  password: string
  confirm_password: string
  date_of_birth?: string
}

export type TokenType = {
  refresh_token: string
}

export type FormItemPropsType = {
  name: string
  placeholder: string
  Icon: React.ElementType
  inputType?: string
  rules?: Rule[]
  pattern?: string
}

export type SocialMediaType = {
  key: string
  url?: string
  alt?: string
  icon?: React.ElementType
}

export type ProfileType = {
  username: string
  fullname: string
  address: string
  email: string
  date_of_birth: string
  bio: string
  phone: string
}
