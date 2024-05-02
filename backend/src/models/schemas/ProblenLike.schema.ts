import { ObjectId } from 'mongodb'

type ProblemLikeType = {
  _id?: ObjectId
  problem_id: ObjectId
  user_id: string
  value: boolean // True: Like, False: Dislike
  created_at?: Date
  updated_at?: Date
}

export default class ProblemLike {
  _id?: ObjectId
  problem_id: ObjectId
  user_id: string
  value: boolean // True: Like, False: Dislike
  created_at: Date
  updated_at: Date

  constructor(item: ProblemLikeType) {
    this._id = item._id
    this.problem_id = item.problem_id
    this.user_id = item.user_id
    this.value = item.value
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at
  }
}
