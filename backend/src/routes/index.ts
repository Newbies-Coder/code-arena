import { Router } from 'express'
import userRouter from './v1/users.routes'
import authRouter from './v1/auth.routes'
const rootRouter = Router()

rootRouter.use('/v1/users', userRouter)
rootRouter.use('/v1/auth', authRouter)

export default rootRouter
