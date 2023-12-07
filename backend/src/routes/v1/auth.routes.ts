import { Router } from 'express'
import passport from 'passport'
import authController from '~/controllers/auth.controllers'
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

authRouter.get('/callback/github', passport.authenticate('github', { session: false }), wrapRequestHandler(authController.callback('github')))
authRouter.get('/callback/facebook', passport.authenticate('facebook', { session: false }), wrapRequestHandler(authController.callback('facebook')))

export default authRouter
