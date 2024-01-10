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
