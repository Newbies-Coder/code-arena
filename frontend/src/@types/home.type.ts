export type CourseType = {
  id: number
  bgImage: string
  Icon: React.ElementType
  title: string
  description: string
  progressPercent: number
}

export type FriendType = {
  key: number
  name: string
  status: string
}

export type MenuType = {
  key: number
  label: string
  Icon: React.ElementType
  IconActive: React.ElementType
  LineIcon: React.ElementType
  color: string
  active?: boolean
}

export type HeaderType = {
  classNameInput?: string
}

export type CodeEditorType = {
  initialValue: string
  onChange(value: string): void
}

export type ToastifyType = {
  title?: string
  description: string
  type: 'success' | 'info' | 'warning' | 'error'
  onButtonClick?: (type: 'success' | 'info' | 'warning' | 'error') => void
}

export type ProfileMenuType = {
  key: number
  label: string
  Icon: React.ElementType
}
