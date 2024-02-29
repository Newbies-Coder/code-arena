import { Router } from 'express'
import passport from 'passport'
import { UserRole } from '~/constants/enums'
import authController from '~/controllers/auth.controllers'
import { createUserByAdminValidator, requireRoleMiddleware, updateUserByAdminValidator, updateUserIdParamValidator } from '~/middlewares/auth.middlewares'
import { paginationGetUsersByRoleValidator, paginationUserValidators } from '~/middlewares/commons.middleware'
import { deleteManyUserValidator } from '~/middlewares/users.middlewares'
import authService from '~/services/oauth.service'
import { wrapRequestHandler } from '~/utils/handler'

authService.init()
const authRouter = Router()

/**
 * Description: Login with oauth2 callback, this is call by oauth2 provider
 * Path: /callback/<provider>
 * Method: GET
 */

authRouter.get('/facebook', passport.authenticate('facebook', { session: false }))

authRouter.get('/github', passport.authenticate('github', { session: false }))

authRouter.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }))

authRouter.get('/linkedin', passport.authenticate('linkedin', { session: false }))

authRouter.get('/callback/github', passport.authenticate('github', { session: false }), wrapRequestHandler(authController.callback('github')))

authRouter.get('/callback/facebook', passport.authenticate('facebook', { session: false }), wrapRequestHandler(authController.callback('facebook')))

authRouter.get('/callback/google', passport.authenticate('google', { session: false }), wrapRequestHandler(authController.callback('google')))

authRouter.get('/callback/linkedin', passport.authenticate('linkedin', { session: false }), wrapRequestHandler(authController.callback('linkedin')))

/**
 * Description: Get all user pagination by admin
 * Path: '/pagination-user'
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Params: { page: number, limit: number, userId: string, sort_by: string, created_at: asc | desc }
 */

authRouter.get('/pagination-user', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), paginationUserValidators, wrapRequestHandler(authController.getAllUserPagination))

/**
 * Description: Get all user by admin
 * Path: '/'
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

authRouter.get('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(authController.getAllUser))

/**
 * Description: Create user by admin
 * Path: /create-user
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: string }
 */
authRouter.post('/create-user', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), createUserByAdminValidator, wrapRequestHandler(authController.createUser))

/**
 * Description: Update user by admin
 * Path: /update-user/:id
 * Method: PUT
 * Body:
 * Header: { Authorization: Bearer <access_token> }
 */

authRouter.put('/update-user/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), updateUserIdParamValidator, updateUserByAdminValidator, wrapRequestHandler(authController.updateUser))

/**
 * Description: Delete user by admin
 * Path: '/:id'
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

authRouter.delete('/delete-user', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), deleteManyUserValidator, wrapRequestHandler(authController.deleteManyUser))

/**
 * Description: Get user by role
 * Path: /roles
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * query: { page: number, limit: number, includes: string }
 */

authRouter.get('/roles', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), paginationGetUsersByRoleValidator, wrapRequestHandler(authController.getUsersByRole))

export default authRouter
