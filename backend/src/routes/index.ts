import { Router } from 'express'
import userRouter from './v1/users.routes'
const rootRouter = Router()

rootRouter.use('/v1/users', userRouter)

export default rootRouter
