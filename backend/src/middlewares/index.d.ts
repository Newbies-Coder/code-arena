declare namespace Express {
  export interface Request {
    user?: {
      _id: string
      role: UserRole
      email: string
      username: string
    }
  }
}
