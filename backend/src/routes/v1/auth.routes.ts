import { Router } from 'express'
import passport from 'passport'
import { UserRole } from '~/constants/enums'
import authController from '~/controllers/auth.controllers'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { paginationUserValidators } from '~/middlewares/commons.middleware'
import { deleteManyUserValidator, getUsersByRoleValidator } from '~/middlewares/users.middlewares'
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
 * Description: Get all user by admin
 * Path: '/'
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Params: { page: number, limit: number, userId: string, sort_by: string, created_at: asc | desc }
 */

authRouter.get('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), paginationUserValidators, wrapRequestHandler(authController.getAllUser))

/**
 * Description: Delete user by admin
 * Path: '/:id'
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */

authRouter.delete('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), deleteManyUserValidator, wrapRequestHandler(authController.deleteManyUser))

/**
 * Description: Get user by role
 * Path: /roles
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * query: { includes: string }// user | admin | moderator
 */

authRouter.get('/roles', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), getUsersByRoleValidator, wrapRequestHandler(authController.getUsersByRole))

export default authRouter
