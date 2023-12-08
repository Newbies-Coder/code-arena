import { Request } from 'express'
import User from '~/models/schemas/Users.schema'

export interface RequestType extends Request {
  user: User
}
