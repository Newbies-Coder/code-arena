import { ObjectId } from "mongodb"

type ProblemType = {
  _id?: ObjectId
  category_id: ObjectId
  total_accepted?: number
  total_submission?: number
  accept_rate?: number
  solution_number?: number
  discussion_count?: number
  is_new_question?: boolean
  title: string
  title_slug: string
  is_paid_only: boolean
  difficulty: string
  like_count?: number
  dislike_count?: number
  content: string //Markdown
  created_at?: Date
  updated_at?: Date
}

export default class Problem {
  _id?: ObjectId
  category_id: ObjectId
  total_accepted: number
  total_submission: number
  accept_rate: number
  solution_number: number
  discussion_count: number
  is_new_question: boolean
  title: string
  title_slug: string
  is_paid_only: boolean
  difficulty: string
  like_count: number
  dislike_count: number
  content: string //Markdown
  created_at: Date
  updated_at: Date

  constructor(item: ProblemType) {
    this._id = item._id
    this.category_id = item.category_id
    this.total_accepted = item.total_accepted || 0
    this.total_submission = item.total_submission || 0
    this.accept_rate = item.accept_rate || 0
    this.solution_number = item.solution_number || 0
    this.discussion_count = item.discussion_count || 0
    this.is_new_question = item.is_new_question || true
    this.title = item.title
    this.title_slug = item.title_slug
    this.is_paid_only = item.is_paid_only
    this.difficulty = item.difficulty
    this.like_count = item.like_count || 0
    this.dislike_count = item.dislike_count || 0
    this.content = item.content
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at || null
  }
}
