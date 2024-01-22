import { ObjectId } from 'mongodb'

interface CourseType {
  _id?: ObjectId
  name?: string
  slug?: string
  category?: ObjectId
  content?: string
  updated_at?: Date
  created_at?: Date
}

export default class Course {
  _id?: ObjectId
  name: string
  slug: string
  category: ObjectId
  content: string
  updated_at: Date
  created_at: Date

  constructor(item: CourseType) {
    this._id = item._id
    this.name = item.name
    this.slug = item.slug
    this.category = item.category
    this.content = item.content
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || new Date()
  }
}
