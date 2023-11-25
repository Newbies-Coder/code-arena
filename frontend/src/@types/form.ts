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
}
