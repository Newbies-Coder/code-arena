import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import userController from '~/controllers/users.controllers'
import { requireLoginMiddleware, requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { uploadFile } from '~/middlewares/uploadFile.middleware'
import {
  accessTokenValidator,
  changePasswordValidator,
  followUserValidator,
  forgotPasswordValidator,
  getAllUserValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowUserValidator,
  userProfileValidator,
  verifyOTPValidator
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

userRouter.post('/change-password', accessTokenValidator, changePasswordValidator, wrapRequestHandler(userController.changePassword))

/**
 * Description: Follow someone
 * Path: /follow
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */

userRouter.post('/follow/:userId', wrapRequestHandler(requireLoginMiddleware), followUserValidator, wrapRequestHandler(userController.follow))

/**
 * Description: unfollow someone
 * Path: /follow/user_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.delete('/unfollow/:userId', wrapRequestHandler(requireLoginMiddleware), unfollowUserValidator, wrapRequestHandler(userController.unfollow))

/**
 * Description: Get all user by admin
 * Path: '/'
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), getAllUserValidator, wrapRequestHandler(userController.getAllUser))

/**
 * Description: Get user profile
 * Path: /:userId/profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/:userId/profile', accessTokenValidator, userProfileValidator, wrapRequestHandler(userController.getUser))

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

userRouter.post('/@me/avatar', wrapRequestHandler(requireLoginMiddleware), uploadFile.single('image'), wrapRequestHandler(userController.updateMeAvatar))

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
 * Description: Test token
 * Path: /test-token
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.post('/test-token', wrapRequestHandler(userController.testToken))

export default userRouter
