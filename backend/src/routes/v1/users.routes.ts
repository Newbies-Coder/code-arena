import { Router } from 'express'
import userController from '~/controllers/users.controllers'

const userRouter = Router()

/**
 * Description: Login a user with email and password
 * Path: /login/password
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login/password', userController.login)


/**
 * Description: Login a user with github
 * Path: /login/github
 * Method: GET
 * Body:
 */
userRouter.get('/login/github')

/**
 * Description: Login a user with google
 * Path: /login/google
 * Method: GET
 * Body:
 */
userRouter.get('/login/google')

/**
 * Description: Login a user with facebook
 * Path: /login/facebook
 * Method: GET
 * Body:
 */
userRouter.get('/login/facebook')

/**
 * Description: Login a user with linkin
 * Path: /login/linkin
 * Method: GET
 * Body:
 */
userRouter.get('/login/linkin')


/**
 * Description: Logout a user
 * Path: /logout
 * Method: POST
 * Body: 
 * Header: { Authorization: Bearer token }
 */

userRouter.post("/logout")


/**
 * Description: Register a user
 * Path: /register
 * Method: POST
 * Body: {email: string, password: string}
 */

userRouter.post('/register', userController.register)

/**
 * Description: Change user password
 * Path: /change-password
 * Method: PUT
 * Body: {email: string, password: string}
 */

userRouter.post('/change-password', userController.register)

/**
 * Description: Follow a user
 * Path: /follow/:userId
 * Method: POST
 * Body:
 */

userRouter.post('/follow/:userId')


/**
 * Description: Unfollow a user
 * Path: /unfollow/:userId
 * Method: POST
 * Body:
 */

userRouter.post('/unfollow/:userId')

/**
 * Description: Get user profile
 * Path: /:userId/profile
 * Method: GET
 * Body:
 */

userRouter.get('/:userId/profile')

/**
 * Description: Get self profile
 * Path: /@me/profile
 * Method: GET
 * Body:
 */

userRouter.get('/@me/profile')

/**
 * Description: Update self profile
 * Path: /@me/profile
 * Method: PUT
 * Body:
 */

userRouter.put('/@me/profile')

/**
 * Description: Search user with name, return 10 matched users
 * Path: /
 * Method: GET
 * Body:
 * PARAM: { userName: string }
 */

userRouter.get('/@me/profile')


export default userRouter
