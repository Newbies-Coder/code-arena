import { Router } from 'express'
import userController from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  verifyOTPValidator,
  changePasswordValidator,
  resetPasswordValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const userRouter = Router()

/**
 * Description: Login a user with email and password
 * Path: /login/password
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login', loginValidator, wrapRequestHandler(userController.login))

/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(userController.register))

/**
 * Description. OAuth with github
 * Path: /oauth/github
 * Method: GET
 * Query: { code: string }
 */
userRouter.get('/oauh/github', wrapRequestHandler(userController.githubLogin))

/**
 * Description. OAuth with Google
 * Path: /oauth/google
 * Method: GET
 * Query: { code: string }
 */
userRouter.get('/oauh/google', wrapRequestHandler(userController.googleLogin))

/**
 * Description. OAuth with Facebook
 * Path: /oauth/facebook
 * Method: GET
 * Query: { code: string }
 */
userRouter.get('/oauh/facebook', wrapRequestHandler(userController.facebookLogin))

/**
 * Description: Login a user with linkin
 * Path: /oauh/linkin
 * Method: GET
 * Body:
 */
userRouter.get('/oauh/linkin', wrapRequestHandler(userController.linkedinLogin))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */

userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(userController.logout))

/**
 * Description. Refresh Token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(userController.refreshToken))

/**
 * Description. Verify otp when user client
 * Path: /verify-otp
 * Method: POST
 * Body: {otp: string}
 */
userRouter.post('/verify-otp', verifyOTPValidator, wrapRequestHandler(userController.verifyOTP))

/**
 * Description. Verify otp when user client click on the button resend otp
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
userRouter.post('/resend-verify-otp', accessTokenValidator, wrapRequestHandler(userController.resendVerifyOTP))

/**
 * Description. Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */
userRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(userController.forgotPassword))

/**
 * Description: Reset password
 * Path: /reset-password
 * Method: POST
 * Body: {email: string, password: string, confirm_password: string}
 */
userRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(userController.resetPassword))

/**
 * Description: Change password
 * Path: /change-password
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, password: string, confirm_password: string }
 */

userRouter.post(
  '/change-password',
  accessTokenValidator,
  changePasswordValidator,
  wrapRequestHandler(userController.changePassword)
)

/**
 * Description: Follow someone
 * Path: /follow
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */

userRouter.post('/follow/:userId', wrapRequestHandler(userController.follow))

/**
 * Description: unfollow someone
 * Path: /follow/user_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.post('/unfollow/:userId', wrapRequestHandler(userController.unfollow))

/**
 * Description: Get all user by admin
 * Path: '/'
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/', wrapRequestHandler(userController.getAllUser))

/**
 * Description: Get user profile
 * Path: /:userId/profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/:userId/profile', wrapRequestHandler(userController.getUser))

/**
 * Description: Get my profile
 * Path: /@me/profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/@me/profile', wrapRequestHandler(userController.getMe))

/**
 * Description: Update self profile
 * Path: /@me/profile
 * Method: PUT
 * Body:
 */

userRouter.put('/@me/profile', wrapRequestHandler(userController.updateMe))

/**
 * Description: Search user with name, return 10 matched users
 * Path: /
 * Method: GET
 * Body:
 * param: { userName: string }
 */

userRouter.get('/@me/profile', wrapRequestHandler(userController.search))

/**
 * Description: Delete user when user request user from section client
 * Path: /:userId
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.delete('/:userId', wrapRequestHandler(userController.delete))

/**
 * Description: Delete a lot of user when user is admin send request list user want to delete
 * Path: /delete-users
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.delete('/delete-users', wrapRequestHandler(userController.deleteManyUser))

/**
 * Description: Get user pagination
 * Path: /pagination?page=1&limit=2&keyword=
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: {
 * 	page,
 *  limit,
 *  keyword
 * }
 */

userRouter.get('/pagination', wrapRequestHandler(userController.pagination))

/**
 * Description: Test token
 * Path: /test-token
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.post('/test-token', wrapRequestHandler(userController.testToken))

export default userRouter
