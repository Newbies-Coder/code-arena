declare namespace Express {
  import { AuthUser } from '~/@types/auth.type'

  export interface Request {
    user?: AuthUser
  }
}
