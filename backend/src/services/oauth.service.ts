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
import { ParsedQs } from 'qs'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { DEV_ERRORS_MESSAGES, VALIDATION_MESSAGES } from '~/constants/message'
import { ObjectId } from 'mongodb'
import { PaginationType, ParsedGetAllUserUrlQuery, ParsedGetUserByRoleUrlQuery } from '~/@types/reponse.type'
import _ from 'lodash'
import { UserRole } from '~/constants/enums'

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
  private extractIds(id: unknown): ObjectId[] {
    if (Array.isArray(id)) {
      return id.map((item) => new ObjectId(item))
    } else if (typeof id === 'string') {
      return [new ObjectId(id)]
    } else {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_NOT_FOUND
      })
    }
  }

  private getRoleFromPayload(roleString: string): UserRole {
    switch (roleString) {
      case 'user':
        return UserRole.User
      case 'admin':
        return UserRole.Admin
      case 'moderator':
        return UserRole.Moderator
      default:
        return UserRole.User
    }
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

  async getAllUser(payload: ParsedGetAllUserUrlQuery): Promise<PaginationType<Partial<User>>> {
    try {
      const page = Number(payload.page) || 1
      const limit = Number(payload.limit) || 10
      const userId = payload.userId ? new ObjectId(payload.userId) : null
      const sort_by = payload.sort_by || '_id'
      const sortByCreatedAt = payload.created_at === 'desc' ? -1 : 1

      let query = userId ? { _id: userId } : {}

      const items = await databaseService.users
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [sort_by]: sortByCreatedAt })
        .toArray()
      const total_items = await databaseService.users.countDocuments(query)
      const total_pages = Math.floor((total_items + limit - 1) / limit)
      const filteredUsers = _.map(items, (v) => _.omit(v, ['password', 'created_at', 'updated_at', 'email', 'phone', 'forgot_password_token', 'verify', '_destroy', 'password_change_at']))

      const content: PaginationType<Partial<User>> = {
        items: filteredUsers,
        page,
        limit,
        total_pages,
        total_items
      }
      return content
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_ALL_USER
      })
    }
  }

  async getUsersByRole(payload: ParsedGetUserByRoleUrlQuery): Promise<PaginationType<Partial<User>>> {
    try {
      const page = Number(payload.page) || 1
      const limit = Number(payload.limit) || 10
      const role = this.getRoleFromPayload(payload.includes)

      const items = await databaseService.users
        .find({ role })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray()

      const total_items = await databaseService.users.countDocuments()
      const total_pages = Math.floor((total_items + limit - 1) / limit)
      const filteredUsers = _.map(items, (v) => _.omit(v, ['password']))

      const content: PaginationType<Partial<User>> = {
        items: filteredUsers,
        page,
        limit,
        total_pages,
        total_items
      }
      return content
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_USER_BY_ROLE
      })
    }
  }

  async deleteManyUsers(payload: ParsedQs): Promise<void> {
    try {
      const deleteIds = this.extractIds(payload.id)
      await databaseService.users.updateMany({ _id: { $in: deleteIds } }, { $set: { _destroy: true } }, { upsert: false })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.DELETED_MANY_USER
      })
    }
  }
}

const authService = new AuthService()
authService.init()
export default authService
