import { ObjectId } from 'mongodb'

type ProblemDiscussionType = {
  _id?: ObjectId
  problem_id: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
}

export default class ProblemDiscussion {
  _id: ObjectId
  problem_id: ObjectId
  content: string
  created_at: Date
  updated_at: Date

  constructor(item: ProblemDiscussionType) {
    this._id = item._id
    this.problem_id = item.problem_id
    this.content = item.content
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at
  }
}
