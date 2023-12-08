import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GithubStrategy } from 'passport-github2'
import passport from 'passport'
import { env } from '~/config/environment.config'
import { databaseService } from '~/services/connectDB.service'
import User from '~/models/schemas/Users.schema'
import userServices from '~/services/users.service'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { Request, Response } from 'express'
import { AuthProvider } from '~/@types/auth.type'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as LinkedinStrategy } from 'passport-linkedin-oauth2'

class AuthService {
  init() {
    passport.use(
      new FacebookStrategy(
        {
          clientID: env.auth.facebook.client_id,
          clientSecret: env.auth.facebook.client_secret,
          callbackURL: env.auth.facebook.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'facebook', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                // @ts-ignore
                email: profile.email,
                username: profile.displayName,
                provider: 'facebook',
                providerId: profile.id
              })
              await databaseService.users.insertOne(newUser)
              req.user = newUser
              return done(null, newUser)
            }
            req.user = user
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
    passport.use(
      new GithubStrategy(
        {
          clientID: env.auth.github.client_id,
          clientSecret: env.auth.github.client_secret,
          callbackURL: env.auth.github.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'github', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                username: profile.login,
                email: profile.email,
                provider: 'github',
                providerId: profile.id
              })
              await databaseService.users.insertOne(newUser)
              req.user = newUser
              return done(null, newUser)
            }
            req.user = user
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.auth.google.client_id,
          clientSecret: env.auth.google.client_secret,
          callbackURL: env.auth.google.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'google', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                username: profile._json.name,
                email: profile._json.email,
                provider: 'google',
                providerId: profile.id
              })
              await databaseService.users.insertOne(newUser)
              req.user = newUser
              return done(null, newUser)
            }
            req.user = user
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
    passport.use(
      new LinkedinStrategy(
        {
          clientID: env.auth.linkedin.client_id,
          clientSecret: env.auth.linkedin.client_secret,
          callbackURL: env.auth.linkedin.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne({ provider: 'linkedin', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                username: profile._json.name,
                email: profile._json.email,
                provider: 'linkedin',
                providerId: profile.id
              })
              await databaseService.users.insertOne(newUser)
              req.user = newUser
              return done(null, newUser)
            }
            req.user = user
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
  }
  async callback(provider: AuthProvider, req: Request, res: Response) {
    const { _id, role, email } = req.user
    const refresh_token = await userServices.signRefreshToken(_id.toString(), email, role)
    // if user is logged in but still login again
    await databaseService.refreshTokens.deleteOne({ user_id: _id })
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: _id
      })
    )

    res.redirect(`${env.url.auth_success}?provider=${provider}&refresh_token=${refresh_token}`)
  }
}

const authService = new AuthService()
authService.init()
export default authService
