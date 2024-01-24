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

export type TokeType = {
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
