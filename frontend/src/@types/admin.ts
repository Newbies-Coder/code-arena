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

export type DataType = {
  key: React.Key
  id: string
  name: string
  phone: string
  email: string
  role: string
  status: React.ReactElement | string
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
