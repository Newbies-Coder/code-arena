import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import { env } from './environment.config'
import { databaseService } from '~/services/connectDB.service'
import User from '~/models/schemas/Users.schema'
import { generatePassword, hashPassword } from '~/utils/crypto'
import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: env.oauth.google.client_id,
      clientSecret: env.oauth.google.secret_id,
      callbackURL: env.oauth.google.callback_url,
      passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // const userId = new ObjectId(profile._json.sub)
      const user = await databaseService.users.findOne({ google_id: profile._json.sub })
      if (!user) {
        const newUser = new User({
          google_id: profile._json.sub,
          email: profile._json.email,
          username: profile._json.name,
          date_of_birth: new Date(Date.now()),
          verify: UserVerifyStatus.Verified,
          password: hashPassword(generatePassword())
        })
        await databaseService.users.insertOne(newUser)
        done(null, newUser)
      }
      done(null, user)
    }
  )
)

passport.serializeUser(function (user: User, done) {
  done(null, user._id)
})

passport.deserializeUser(async function (id: string, done) {
  const user = await databaseService.users.findOne({ _id: new ObjectId(id) })
  done(null, user)
})
