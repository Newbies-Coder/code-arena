import { ObjectId } from 'mongodb'

type ProblemSubmissionType = {
  _id?: ObjectId
  problem_id: ObjectId
  user_id: ObjectId
  code: string
  language: string
  is_accepted: string
  time: number // Time to finish
  memory: number // Number of bytes used
  created_at?: Date
  updated_at?: Date
}

export default class ProblemSubmission {
  _id: ObjectId
  problem_id: ObjectId
  user_id: ObjectId
  code: string
  language: string
  is_accepted: string
  time: number // Time to finish
  memory: number // Number of bytes used
  created_at: Date
  updated_at: Date

  constructor(item: ProblemSubmissionType) {
    this._id = item._id
    this.problem_id = item.problem_id
    this.user_id = item.user_id
    this.code = item.code
    this.language = item.language
    this.is_accepted = item.is_accepted
    this.time = item.time
    this.memory = item.memory
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at
  }
}
