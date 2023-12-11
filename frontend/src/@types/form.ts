export type FieldType = {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  date?: string
}

export type FormItemPropsType = {
  name: string
  placeholder: string
  Icon: React.ElementType
  inputType?: string
  rules?: string
}

export type SocialMediaType = {
  key: string
  url?: string
  alt?: string
  icon?: React.ElementType
}

export type OTPType = {
  type: string
  maxLength: number
  min: number
  max: number
}
