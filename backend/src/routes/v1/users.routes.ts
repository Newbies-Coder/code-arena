import { Router } from 'express'
import userController from '~/controllers/users.controllers'
import { requireLoginMiddleware } from '~/middlewares/auth.middlewares'
import { objectIdValidator, paginationBlockedUserValidators, paginationUserFavoriteValidators } from '~/middlewares/commons.middleware'
import { singleImageUpload } from '~/middlewares/uploadFile.middleware'
import {
  blockedUserValidator,
  changePasswordValidator,
  checkTokenValidator,
  favoriteValidator,
  followUserValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  removeFavoriteValidator,
  resetPasswordValidator,
  unfollowUserValidator,
  updateProfileValidator,
  userProfileValidator,
  verifyOTPValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const userRouter = Router()

/**
 * Description: Login a user with email and password
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login', loginValidator, wrapRequestHandler(userController.login))

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: string }
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(userController.register))

/**
 * Description: Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
userRouter.post('/logout', wrapRequestHandler(requireLoginMiddleware), refreshTokenValidator, wrapRequestHandler(userController.logout))

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
userRouter.post('/resend-verify-otp', wrapRequestHandler(userController.resendVerifyOTP))

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

userRouter.post('/change-password', wrapRequestHandler(requireLoginMiddleware), changePasswordValidator, wrapRequestHandler(userController.changePassword))

/**
 * Description: Follow someone
 * Path: /follow/:id
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.post('/follow/:id', wrapRequestHandler(requireLoginMiddleware), followUserValidator, wrapRequestHandler(userController.follow))

/**
 * Description: Unfollow someone
 * Path: /follow/:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.delete('/unfollow/:id', wrapRequestHandler(requireLoginMiddleware), unfollowUserValidator, wrapRequestHandler(userController.unfollow))

/**
 * Description: Get user profile
 * Path: /profile/:id
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/profile/:id', wrapRequestHandler(requireLoginMiddleware), userProfileValidator, wrapRequestHandler(userController.getUser))

/**
 * Description: Get my profile
 * Path: /@me/profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/@me/profile', wrapRequestHandler(requireLoginMiddleware), wrapRequestHandler(userController.getMe))

/**
 * Description: Update self profile
 * Path: /@me/profile
 * Method: PUT
 * Body:
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.put('/@me/profile', wrapRequestHandler(requireLoginMiddleware), updateProfileValidator, wrapRequestHandler(userController.updateMe))

/**
 * Description: Upload avatar
 * Path: /@me/avatar
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {image: file}
 */

userRouter.post('/@me/avatar', wrapRequestHandler(requireLoginMiddleware), singleImageUpload, wrapRequestHandler(userController.uploadAvatar))

/**
 * Description: Upload thumbnail
 * Path: /@me/thumbnail
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {image: file}
 */

userRouter.post('/@me/thumbnail', wrapRequestHandler(requireLoginMiddleware), singleImageUpload, wrapRequestHandler(userController.uploadThumbnail))

/**
 * Description: Get blocked user list
 * Path: /@me/blocked
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Params: { page: number, limit: number , created_at: asc | desc}
 **/

userRouter.get('/@me/blocked', wrapRequestHandler(requireLoginMiddleware), paginationBlockedUserValidators, wrapRequestHandler(userController.getMeBlockedUsers))

/**
 * Description: Insert blocked user list
 * Path: /@me/blocked
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 **/

userRouter.post('/@me/blocked', wrapRequestHandler(requireLoginMiddleware), blockedUserValidator, wrapRequestHandler(userController.blockedUser))

/**
 * Description: Delete blocked user list aka unblock
 * Path: /@me/blocked/:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 **/

userRouter.delete('/@me/blocked/:id', wrapRequestHandler(requireLoginMiddleware), objectIdValidator, wrapRequestHandler(userController.unBlockedUser))

/**
 * Description: Make a list of your closest pals.
 * Path: /favorite
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/favorite', wrapRequestHandler(requireLoginMiddleware), paginationUserFavoriteValidators, wrapRequestHandler(userController.favorite))

/**
 * Description: Add persons to your list of close friends.
 * Path: /favorite
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * body: {friendId: string}
 */

userRouter.post('/favorite', wrapRequestHandler(requireLoginMiddleware), favoriteValidator, wrapRequestHandler(userController.insertUserFavorite))

/**
 * Description: Remove the individual from your list of close friends.
 * Path: /favorite/:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id: string}
 */

userRouter.delete('/favorite/:id', wrapRequestHandler(requireLoginMiddleware), removeFavoriteValidator, wrapRequestHandler(userController.removeUserFavorite))

/**
 * Description: Test token
 * Path: /test-token
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.post('/test-token', checkTokenValidator, wrapRequestHandler(userController.testToken))

export default userRouter
