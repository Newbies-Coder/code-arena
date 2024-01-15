import { Router } from 'express'
import userRouter from './v1/users.routes'
import authRouter from './v1/auth.routes'
import bannerRouter from './v1/banners.routes'
import uploadRouter from './v1/upload.routes'
const rootRouter = Router()

rootRouter.use('/v1/users', userRouter)
rootRouter.use('/v1/auth', authRouter)
rootRouter.use('/v1/banners', bannerRouter)
rootRouter.use('/v1/upload', uploadRouter)

export default rootRouter
