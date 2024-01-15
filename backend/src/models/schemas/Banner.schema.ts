import { ObjectId } from 'mongodb'

interface BannerType {
  _id?: ObjectId
  user_id: ObjectId
  url: string
  slug: string
  description?: string
  created_at?: Date
  update_at?: Date
  _destroy?: boolean
}

export default class Banner {
  _id?: ObjectId
  user_id: ObjectId
  url: string
  slug: string
  description: string
  created_at: Date
  update_at: Date
  _destroy: boolean

  constructor(item: BannerType) {
    this._id = item._id
    this.user_id = item.user_id
    this.slug = item.slug || ''
    this.url = item.url
    this.description = item.description || ''
    this.created_at = item.created_at || new Date()
    this.update_at = item.update_at || new Date()
    this._destroy = item._destroy || false
  }
}
