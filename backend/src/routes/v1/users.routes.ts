import { Router } from 'express'
import userController from '~/controllers/users.controllers'

const userRouter = Router()

/**
 * Description: Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login', userController.login)

export default userRouter
