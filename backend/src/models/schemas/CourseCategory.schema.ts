import { ObjectId } from 'mongodb'

interface CourseCategoryType {
  _id?: ObjectId
  name: string
  slug: string
  updated_at?: Date
  created_at?: Date
}

export default class CourseCategory {
  _id?: ObjectId
  name: string
  slug: string
  updated_at: Date
  created_at: Date

  constructor(item: CourseCategoryType) {
    this._id = item._id
    this.name = item.name
    this.slug = item.slug
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
