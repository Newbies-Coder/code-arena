import { ObjectId } from 'mongodb'

type ProblemTestCaseType = {
  _id: ObjectId
  problem_id: ObjectId
  input: string
  output: string
  time_limit: number
  memory_limit: number
  created_at?: Date
  updated_at?: Date
}

export default class ProblemTestCase {
  _id: ObjectId
  problem_id: ObjectId
  input: string
  output: string
  time_limit: number
  memory_limit: number
  created_at: Date
  updated_at: Date

  constructor(item: ProblemTestCaseType) {
    this._id = item._id
    this.problem_id = item.problem_id
    this.input = item.input
    this.output = item.output
    this.time_limit = item.time_limit
    this.memory_limit = item.memory_limit
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at
  }
}
