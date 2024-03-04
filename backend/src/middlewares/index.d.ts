declare namespace Express {
  import { ObjectId } from 'mongodb'
  export interface Request {
    user?: {
      _id: ObjectId
      role: UserRole
      email: string
      username: string
    }
  }
}
