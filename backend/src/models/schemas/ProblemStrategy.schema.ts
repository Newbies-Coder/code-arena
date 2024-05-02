import { ObjectId } from 'mongodb'

type ProblemStrategyType = {
  _id?: ObjectId
  name: string
  created_at?: Date
  updated_at?: Date
}

export default class ProblemStrategy {
  _id: ObjectId
  name: string
  created_at: Date
  updated_at: Date

  constructor(item: ProblemStrategyType) {
    this._id = item._id
    this.name = item.name
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at
  }
}
