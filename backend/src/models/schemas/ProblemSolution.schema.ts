import { ObjectId } from 'mongodb'

type ProblemSolutionType = {
  _id?: string
  problem_id: ObjectId
  strategy_id: ObjectId[]
  title: string
  language: string
  content: string // Markdown
  created_at?: Date
  updated_at?: Date
}

export default class ProblemSolution {
  _id?: string
  problem_id: ObjectId
  strategy_id: ObjectId[]
  title: string
  language: string
  content: string // Markdown
  created_at: Date
  updated_at: Date

  constructor(item: ProblemSolutionType) {
    this._id = item._id
    this.problem_id = item.problem_id
    this.strategy_id = item.strategy_id
    this.title = item.title
    this.language = item.language
    this.content = item.content
    this.created_at = item.created_at || new Date()
    this.updated_at = item.updated_at
  }
}
