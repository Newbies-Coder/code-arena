export type CourseType = {
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
  active: boolean
}
