import { signToken, verifyToken } from '~/utils/jwt'
import { databaseService } from './connectDB.service'
import { TokenType, UserRole, UserVerifyStatus } from '~/constants/enums'
import { env } from '~/config/environment.config'
import {
  AccessTokenPayload,
  BlockUserBody,
  ChangePasswordBody,
  FavoriteBody,
  ForgotPasswordBody,
  InfoTokenType,
  LoginPayload,
  LogoutBody,
  RefreshTokenBody,
  RefreshTokenPayload,
  RegisterBody,
  ResetPasswordBody,
  UpdateProfileBody,
  VerifyForgotPasswordReqBody,
  VerifyOTPBody
} from '~/models/requests/User.requests'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import {
  LoginResultType,
  PaginationType,
  ParsedGetAllUserBlockedUrlQuery,
  ParsedGetAllUserFavoriteUrlQuery,
  ResultCheckTokenType,
  ResultRefreshTokenType,
  ResultRegisterType,
  ResultVerifyForgotPasswordType,
  UploadAvatarType,
  UploadThumbnailType
} from '~/@types/reponse.type'
import { hashPassword } from '~/utils/crypto'
import User from '~/models/schemas/Users.schema'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { DEV_ERRORS_MESSAGES, RESULT_RESPONSE_MESSAGES, VALIDATION_MESSAGES } from '~/constants/message'
import moment from 'moment'
import emailService from '~/services/email.service'
import otpService from '~/services/otp.service'
import { ParamsDictionary } from 'express-serve-static-core'
import Follow from '~/models/schemas/Follow.schema'
import { AuthUser } from '~/@types/auth.type'
import _ from 'lodash'
import cloudinaryService from '~/services/cloudinary.service'
import BlockedUser from '~/models/schemas/BlockedUser.schema'
import CloseFriends from '~/models/schemas/CloseFriends'
import { SignOptions } from 'jsonwebtoken'

class UserService {
  signAccessToken(_id: string, email: string, username: string, role: UserRole): Promise<string> {
    const { access_token_exp, jwt_algorithm, secret_key } = env.jwt
    const payload: AccessTokenPayload = {
      _id,
      username,
      email,
      role,
      token_type: TokenType.AccessToken
    }
    const options: SignOptions = {
      expiresIn: access_token_exp,
      algorithm: jwt_algorithm
    }
    return signToken({ payload, privateKey: secret_key as string, options })
  }

  signRefreshToken(_id: string, email: string, username: string, role: UserRole): Promise<string> {
    const { refresh_token_exp, jwt_algorithm, refresh_token_key } = env.jwt
    const payload: RefreshTokenPayload = {
      _id,
      username,
      email,
      role,
      token_type: TokenType.RefreshToken
    }
    const options: SignOptions = {
      expiresIn: refresh_token_exp,
      algorithm: jwt_algorithm
    }
    return signToken({
      payload,
      privateKey: refresh_token_key as string,
      options
    })
  }

  signAccessAndRefreshToken(user_id: string, email: string, username: string, role: UserRole): Promise<[string, string]> {
    return Promise.all([this.signAccessToken(user_id, email, username, role), this.signRefreshToken(user_id, email, username, role)])
  }

  private validateBlockedIds(blockerId: string, blockedId: string): void {
    if (!ObjectId.isValid(blockerId) || !ObjectId.isValid(blockedId)) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: VALIDATION_MESSAGES.USER.BLOCKED.USER_ID_IS_INVALID
      })
    }
  }

  private async checkIfAlreadyFollowed(followerId: string, followedId: string): Promise<boolean> {
    const follow = await databaseService.follow.findOne({
      followerId: new ObjectId(followerId),
      followedId: new ObjectId(followedId)
    })
    return follow !== null
  }

  private async checkIfAlreadyBlocked(blockerId: string, blockedId: string): Promise<boolean> {
    const blocked = await databaseService.blocked_users.findOne({
      blockerId: new ObjectId(blockerId),
      blockedId: new ObjectId(blockedId)
    })
    return blocked !== null
  }

  private async upload(file: Express.Multer.File, folderName: string): Promise<string> {
    const { url } = await cloudinaryService.uploadImage(folderName, file.buffer)
    return url
  }

  private async updateUserAvatarInDatabase(userId: string, avatarUrl: string): Promise<void> {
    await databaseService.users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: avatarUrl } })
  }

  private async updateUserThumbnailInDatabase(userId: string, thumbnailUrl: string): Promise<void> {
    await databaseService.users.updateOne({ _id: new ObjectId(userId) }, { $set: { cover_photo: thumbnailUrl } })
  }

  private calculateAge(dob: string): number {
    const birthDate = new Date(dob)
    const difference = Date.now() - birthDate.getTime()
    const ageDate = new Date(difference)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }

  async validateEmailAndPasswordExist(email: string, password: string): Promise<boolean> {
    try {
      if (!email || !password) {
        throw new Error('Email and password must be provided.')
      }
      const hashedPassword = hashPassword(password)
      const user = await databaseService.users.findOne({ email, password: hashedPassword })
      return Boolean(user)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.VALIDATION_EMAIL_AND_PASSWORD
      })
    }
  }

  async validateEmailAccessibility(email: string): Promise<boolean> {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async validatePassword(providedPassword: string, storedPassword: string): Promise<boolean> {
    try {
      return hashPassword(providedPassword) === storedPassword ? true : false
    } catch (error) {
      throw error.message
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await databaseService.users.findOne({ email })
      return user
    } catch (error) {
      throw error
    }
  }

  async isUserExist(id: string): Promise<boolean> {
    const result = await databaseService.users.findOne({ _id: new ObjectId(id) })
    return Boolean(result)
  }

  async validateAccountAccessibility(email: string): Promise<boolean> {
    const user = await databaseService.users.findOne({ email })

    if (!user) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: VALIDATION_MESSAGES.USER.LOGIN.USER_NOT_FOUND
      })
    }

    if (['Unverified', 'Banned'].includes(user.verify)) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.FORBIDDEN,
        message: user.verify === 'Unverified' ? VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_UNVERIFIED : VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_BANNED
      })
    }
    return true
  }

  async validateWithIDAccountAccessibility(id: string): Promise<boolean> {
    const user = await databaseService.users.findOne({ _id: new ObjectId(id) })

    if (!user) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: VALIDATION_MESSAGES.USER.LOGIN.USER_NOT_FOUND
      })
    }

    if (['Unverified', 'Banned'].includes(user.verify)) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.FORBIDDEN,
        message: user.verify === 'Unverified' ? VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_UNVERIFIED : VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_IS_BANNED
      })
    }
    return true
  }

  async validateRefreshToken(refresh_token: string): Promise<boolean> {
    const token = await databaseService.refreshTokens.findOne({ token: refresh_token })
    return Boolean(token)
  }

  async login(payload: LoginPayload): Promise<LoginResultType> {
    try {
      const user = await databaseService.users.findOne({ email: payload.email })
      const { _destroy } = user
      if (_destroy) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.LOGIN.ACCOUNT_NOT_EXISTS
        })
      }
      const isPasswordCorrect = await userServices.validatePassword(payload.password, user.password)
      if (!isPasswordCorrect) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: VALIDATION_MESSAGES.USER.LOGIN.EMAIL_OR_PASSWORD_IS_INCORRECT
        })
      }
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user._id.toString(), user.email, user.username, user.role)

      await databaseService.refreshTokens.updateOne(
        { user_id: user._id },
        {
          $set: {
            user_id: user._id,
            token: refresh_token,
            created_at: new Date(),
            updated_at: new Date()
          }
        },
        { upsert: true }
      )
      const content: LoginResultType = {
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        access_token,
        refresh_token
      }
      return content
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.LOGIN
      })
    }
  }

  async sendOTP(email: string) {
    try {
      const otp = await otpService.generateOTP(email)
      const emailContent = `<div
      style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2;background-image: url('https://i.pinimg.com/originals/ac/71/99/ac71991f2c80919102eb0a2f7936a9cf.png'); background-size: contain; object-fit: cover; ">
      <div
        style="margin: 50px auto; width: 50%; padding: 20px 0; background-color: #f1f0f0dd; border-radius: 10px; box-shadow: 0 0 10px #d1cececc;">
        <div style="display: flex; justify-content: center; margin: 4px 0px; ">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 40.000000 40.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path
                d="M139 330 c-9 -25 -14 -28 -30 -19 -24 12 -39 4 -39 -23 0 -12 8 -22 21 -25 17 -5 19 -11 14 -43 -5 -27 -2 -42 10 -53 14 -15 14 -19 1 -40 -11 -16 -13 -32 -8 -52 8 -29 10 -29 78 -30 65 -1 118 15 136 39 10 15 -10 46 -26 40 -22 -9 -39 31 -20 47 9 7 14 25 12 43 -2 23 2 34 17 41 23 12 32 42 17 57 -6 6 -19 4 -36 -7 -18 -12 -26 -13 -26 -5 0 6 9 14 20 17 24 6 25 16 5 33 -12 10 -21 8 -49 -11 l-35 -23 28 -12 c37 -16 55 -65 41 -110 -9 -25 -20 -35 -54 -46 -41 -14 -45 -13 -72 9 -18 14 -24 23 -14 23 13 1 13 2 -1 13 -21 17 -8 76 24 102 14 11 28 30 32 43 5 18 2 22 -15 22 -14 0 -24 -9 -31 -30z m-9 -44 c0 -2 -11 -3 -25 -2 -25 1 -31 7 -19 19 6 6 44 -9 44 -17z m190 5 c0 -5 -11 -11 -25 -13 -26 -5 -35 6 -12 15 20 9 37 8 37 -2z m-140 -208 c0 -23 -20 -14 -30 13 -18 45 -12 62 10 29 11 -16 20 -36 20 -42z m92 33 c6 -14 7 -33 4 -43 -7 -17 -8 -17 -17 0 -6 9 -19 17 -29 17 -12 0 -20 -7 -21 -17 -1 -17 -2 -17 -6 -1 -2 9 1 27 7 40 11 22 10 22 -4 4 -9 -11 -19 -16 -23 -13 -10 11 29 36 55 37 14 0 26 -9 34 -24z m-132 -18 c0 -5 -7 -8 -15 -8 -17 0 -18 2 -9 25 5 13 8 14 15 3 5 -7 9 -16 9 -20z" />
              <path
                d="M133 228 c2 -7 10 -12 17 -10 8 2 11 -4 7 -17 -7 -28 13 -43 36 -27 23 18 22 25 -5 18 -15 -4 -19 -2 -14 7 5 7 0 18 -10 26 -24 18 -37 19 -31 3z" />
              <path d="M212 228 c5 -15 28 -18 29 -3 0 6 -7 12 -17 13 -10 3 -15 -1 -12 -10z" />
              <path d="M230 190 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z" />
            </g>
          </svg>
        </div>
        <div style=" border-radius: 10px; margin: 0 80px; background-color: #ffffff;">
          <div
            style="background-image: url('https://i.pinimg.com/originals/f0/9f/84/f09f84882da5c586106b6b26b0bbae1b.png'); background-repeat: no-repeat; background-size: contain; object-fit: cover; width: 416px; height: 212px; margin-left: auto; border-radius: 10px; margin-right: auto;">
          </div>
          <h1 style="text-align: center; font-weight: 800;">Verify your email address</h1>
          <p style="text-align: center; font-size: 16px; font-weight: 600; margin: 0 0 10px; color: black;">Welcome to <a
              href="">Code
              Arena</a></p>
          <p style="margin: 8px 80px; text-align: center; font-size: 15px; font-weight: 600; color: black;">Please use the
            following OTP
            bellow to confirm your email address and activate your account.</p>
          <div
            style="width: 174px; background-color: #ff0342; border-radius: 20px; font-size: 24px; font-weight: 600; letter-spacing: 4px; color: #fff; margin: 18px auto; text-align: center;">
            ${otp.code}</div>
          <p style="margin: 8px 20px 10px; text-align: center; font-size: 12px; color: #9E9E9E;">This OTP is
            valid for only 5 minutes and can be used only once. If you did not request this, please ignore this email or
            contact support if you have concerns.</p>
        </div>
      </div>
    </div>`
      await emailService.sendMail(otp.email, 'Code Arena', emailContent)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: DEV_ERRORS_MESSAGES.SEND_FAILURE
      })
    }
  }

  async register(payload: RegisterBody): Promise<ResultRegisterType> {
    try {
      let { email, username, password, date_of_birth } = payload
      const hashedPassword = hashPassword(password)
      const age = this.calculateAge(date_of_birth)
      if (age < 12) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.FORBIDDEN,
          message: VALIDATION_MESSAGES.USER.REGISTER.AGE_IS_NOT_ENOUGH
        })
      }
      const newUser = new User({
        ...payload,
        password: hashedPassword,
        date_of_birth: new Date(date_of_birth),
        role: UserRole.User,
        age
      })
      const userResult = await databaseService.users.insertOne(newUser)
      const user_id = userResult.insertedId.toString()
      const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id, email, username, UserRole.User)
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({
          token: refresh_token,
          user_id: new ObjectId(user_id)
        })
      )
      await this.sendOTP(email)
      const content: ResultRegisterType = { _id: user_id, username, email, access_token, refresh_token }
      return content
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.REGISTER
      })
    }
  }

  async logout(payload: LogoutBody): Promise<boolean> {
    try {
      const { refresh_token } = payload
      const result = await databaseService.refreshTokens.deleteOne({ token: refresh_token })
      if (result.deletedCount === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.CONFLICT,
          message: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.TOKEN_NOT_FOUND
        })
      }
      return true
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.LOGOUT
      })
    }
  }

  async verifyForgotPassword(payload: VerifyForgotPasswordReqBody): Promise<ResultVerifyForgotPasswordType> {
    try {
      let { forgot_password_token } = payload
      const otpData = await otpService.findOTP(forgot_password_token)
      let { email } = otpData
      await databaseService.otps.deleteMany({ email })
      return {
        userExist: true,
        message: RESULT_RESPONSE_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN.CHECK_EMAIL_TO_RESET_PASSWORD
      }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.VERIFY_FORGOT_PASSWORD_TOKEN
      })
    }
  }

  async refreshToken(payload: RefreshTokenBody): Promise<ResultRefreshTokenType> {
    const { refresh_token } = payload
    const { refresh_token_key } = env.jwt

    try {
      // Verify the provided refresh token
      const { _id, role, email, username } = await verifyToken({
        token: refresh_token,
        secretOrPublicKey: refresh_token_key
      })
      // Delete the old refresh token from the database
      const deleteRefreshToken = databaseService.refreshTokens.deleteOne({ user_id: new ObjectId(_id) })
      // Sign new access and refresh tokens
      const signToken = await this.signAccessAndRefreshToken(_id, email, username, role)
      // Wait for both operations to complete
      const [tokens] = await Promise.all([signToken, deleteRefreshToken])
      const [newAccessToken, newRefreshToken] = tokens
      // Insert the new refresh token into the database
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({
          token: newRefreshToken,
          user_id: new ObjectId(_id)
        })
      )
      // Return the new tokens
      const result: ResultRefreshTokenType = { access_token: newAccessToken, refresh_token: newRefreshToken }
      return result
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        // Handle the expired token case, e.g., prompt for re-login
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'Refresh token expired. Please re-authenticate'
        })
      } else {
        // Handle other errors
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: 'Error refreshing token'
        })
      }
    }
  }

  async verifyOTP(payload: VerifyOTPBody): Promise<void> {
    try {
      const { otp } = payload
      const otpData = await otpService.findOTP(otp)
      if (!otpData) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.USER.VERIFY_OTP.INVALID_OTP
        })
      }

      const { email } = otpData

      const updateResult = await databaseService.users.updateOne(
        { email, verify: UserVerifyStatus.Unverified },
        { $set: { verify: UserVerifyStatus.Verified, updated_at: new Date() } },
        { upsert: false }
      )

      if (updateResult.matchedCount === 0) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.VERIFY_OTP.NOT_FOUND_OR_ALREADY_VERIFIED
        })
      }
      await databaseService.otps.deleteMany({ email })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.VERIFY_OTP
      })
    }
  }

  async forgotPassword(payload: ForgotPasswordBody): Promise<void> {
    const { email } = payload
    try {
      await this.sendOTP(email)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.FORGOT_PASSWORD
      })
    }
  }

  async resetPassword(payload: ResetPasswordBody): Promise<void> {
    try {
      const { email, password } = payload
      const hashedPassword = hashPassword(password)
      const updateResult = await databaseService.users.findOneAndUpdate({ email }, { $set: { password: hashedPassword, password_change_at: new Date() } })
      if (updateResult === null) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.COMMONS.USER_RESET_PASSWORD_FAILED
        })
      }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.CHANGE_PASSWORD
      })
    }
  }

  async changePassword({ email }: AuthUser, payload: ChangePasswordBody): Promise<void> {
    try {
      const hashedPassword = hashPassword(payload.password)
      const updateResult = await databaseService.users.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword, password_change_at: new Date() } })
      if (updateResult === null) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.COMMONS.USER_CHANGE_PASSWORD_FAILED
        })
      }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.CHANGE_PASSWORD
      })
    }
  }

  async checkToken(payload: InfoTokenType): Promise<ResultCheckTokenType> {
    try {
      const { iat, exp, ...otherProperties } = payload
      if (!iat || !exp) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: VALIDATION_MESSAGES.TOKEN.INVALID_TOKEN
        })
      }
      const currentTime = moment().unix()
      if (exp < currentTime) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: VALIDATION_MESSAGES.TOKEN.EXPIRED_TIME
        })
      }
      const userInfo = {
        ...otherProperties,
        iat: moment(iat * 1000).format(),
        exp: moment(exp * 1000).format()
      }
      return userInfo
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.CHECK_TOKEN
      })
    }
  }

  async getUserByID(id: ObjectId) {
    try {
      const user = await databaseService.users.findOne({ _id: id })
      if (!user) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_NOT_FOUND
        })
      }
      return _.omit(user, 'password', 'created_at', 'updated_at', 'forgot_password_token', 'verify', '_destroy', 'password_change_at', 'role')
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_USER_BY_ID
      })
    }
  }

  async getMe(id: ObjectId) {
    try {
      if (!ObjectId.isValid(id)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_IS_INVALID
        })
      }
      const user = await databaseService.users.findOne({ _id: id })
      if (!user) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_NOT_FOUND
        })
      }
      return _.omit(user, 'password')
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_USER_BY_ID
      })
    }
  }

  async follow(user: AuthUser, payload: ParamsDictionary): Promise<void> {
    try {
      const { id } = payload
      if (user._id === id) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.USER.FOLLOW.USER_FOLLOW_THEMSELVES
        })
      }
      const isAlreadyFollowed = await this.checkIfAlreadyFollowed(user._id, id)
      if (isAlreadyFollowed) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.FOLLOW.ALREADY_FOLLOW_USER
        })
      }
      const followEntry = new Follow({
        followedId: new ObjectId(id),
        followerId: new ObjectId(user._id)
      })
      await databaseService.follow.insertOne(followEntry)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.FOLLOW_USER
      })
    }
  }

  async unfollow(user: AuthUser, payload: ParamsDictionary): Promise<void> {
    try {
      const { id } = payload
      const followingExists = await this.checkIfAlreadyFollowed(user._id, id)
      if (!followingExists) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.FOLLOW.NOT_ALREADY_FOLLOW_USER
        })
      }
      await databaseService.follow.deleteMany({
        followedId: new ObjectId(id),
        followerId: new ObjectId(user._id)
      })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.UNFOLLOW_USER
      })
    }
  }

  async updateMeAvatar({ _id }: AuthUser, file: Express.Multer.File): Promise<UploadAvatarType> {
    try {
      const newAvatarUrl = await this.upload(file, env.cloudinary.avatar_folder)
      const currentUser = await databaseService.users.findOne({ _id: new ObjectId(_id) })
      await Promise.all([currentUser?.avatar ? cloudinaryService.deleteImage(currentUser.avatar) : Promise.resolve(), this.updateUserAvatarInDatabase(_id, newAvatarUrl)])

      return { avatarUrl: newAvatarUrl }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.UPLOAD_AVATAR
      })
    }
  }

  async updateMeThumbnail({ _id }: AuthUser, file: Express.Multer.File): Promise<UploadThumbnailType> {
    try {
      const newThumbnailUrl = await this.upload(file, env.cloudinary.thumbnail_folder)
      const currentUser = await databaseService.users.findOne({ _id: new ObjectId(_id) })
      await Promise.all([currentUser?.cover_photo ? cloudinaryService.deleteImage(currentUser.cover_photo) : Promise.resolve(), this.updateUserThumbnailInDatabase(_id, newThumbnailUrl)])

      return { thumbnailUrl: newThumbnailUrl }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.UPLOAD_AVATAR
      })
    }
  }

  async updateProfile(user: AuthUser, payload: UpdateProfileBody): Promise<void> {
    try {
      if (Object.keys(payload).length === 0) {
        throw new ErrorWithStatus({ statusCode: StatusCodes.BAD_REQUEST, message: VALIDATION_MESSAGES.USER.USER_PROFILE.FIELD_UPDATE_IS_REQUIRED })
      }
      await databaseService.users.updateOne({ _id: new ObjectId(user._id) }, { $set: { ...payload, updated_at: new Date() } }, { upsert: false })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.UPDATE_PROFILE
      })
    }
  }

  async getMeBlockedUser({ _id }: AuthUser, payload: ParsedGetAllUserBlockedUrlQuery): Promise<PaginationType<Partial<User>>> {
    const page = Number(payload.page) || 1
    const limit = Number(payload.limit) || 10
    const sortByCreatedAt = payload.created_at === 'desc' ? -1 : 1
    const skipCount = (page - 1) * limit
    const pipeline = [
      {
        $match: { blockerId: new ObjectId(_id) }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'blockedId',
          foreignField: '_id',
          as: 'blockInfo'
        }
      },
      { $unwind: '$blockInfo' },
      {
        $project: {
          'blockInfo._id': 1,
          'blockInfo.username': 1,
          'blockInfo.email': 1,
          'blockInfo.fullName': 1,
          'blockInfo.avatar': 1,
          'blockInfo.cover_photo': 1,
          'blockInfo.isOnline': 1,
          'blockInfo.date_of_birth': 1,
          'blockInfo.created_at': 1
        }
      },
      { $sort: { 'blockInfo.created_at': sortByCreatedAt } },
      { $skip: skipCount },
      { $limit: limit }
    ]
    try {
      const result = await databaseService.blocked_users.aggregate(pipeline).toArray()
      const filteredUsers = result.map((item) => item.blockInfo)
      const total_items = filteredUsers.length ? filteredUsers.length : 0
      const total_pages = Math.floor((total_items + limit - 1) / limit)
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
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_ALL_USER_FAVORITE
      })
    }
  }

  async blockedUser({ _id }: AuthUser, payload: BlockUserBody): Promise<void> {
    try {
      const { blockedId } = payload
      this.validateBlockedIds(_id, blockedId)
      const isAlreadyBlocked = await this.checkIfAlreadyBlocked(_id, blockedId)
      if (_id.includes(blockedId)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.FORBIDDEN,
          message: VALIDATION_MESSAGES.USER.BLOCKED.USER_BLOCK_THEMSELVES
        })
      }

      if (isAlreadyBlocked) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.USER.BLOCKED.USER_ALREADY_BLOCKED
        })
      }
      const blockEntry = new BlockedUser({
        blockerId: new ObjectId(_id),
        blockedId: new ObjectId(blockedId)
      })
      await databaseService.blocked_users.insertOne(blockEntry)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.BLOCKED_USER
      })
    }
  }

  async unBlockedUser({ _id }: AuthUser, payload: ParamsDictionary): Promise<void> {
    const { id } = payload
    const blockExists = await this.checkIfAlreadyBlocked(_id, id)
    if (!blockExists) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: VALIDATION_MESSAGES.USER.BLOCKED.USER_NOT_ALREADY_BLOCKED_USER
      })
    }
    await databaseService.blocked_users.deleteMany({
      blockerId: new ObjectId(_id),
      blockedId: new ObjectId(id)
    })
  }

  async insertUserFavorite({ _id }: AuthUser, payload: FavoriteBody): Promise<void> {
    try {
      const blockEntry = new CloseFriends({
        friendId: new ObjectId(payload.friendId),
        userId: new ObjectId(_id)
      })
      await databaseService.closeFriends.insertOne(blockEntry)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.INSERT_USER_FAVORITES
      })
    }
  }

  async removeUserFavorite({ _id }: AuthUser, payload: ParamsDictionary): Promise<void> {
    try {
      const { id } = payload
      await databaseService.closeFriends.deleteOne({ userId: new ObjectId(_id), friendId: new ObjectId(id) })
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.REMOVED_USER_FAVORITES
      })
    }
  }

  async getFavorite({ _id }: AuthUser, payload: ParsedGetAllUserFavoriteUrlQuery): Promise<PaginationType<Partial<User>>> {
    const page = Number(payload.page) || 1
    const limit = Number(payload.limit) || 10
    const sortByCreatedAt = payload.created_at === 'desc' ? -1 : 1
    const skipCount = (page - 1) * limit
    const pipeline = [
      {
        $match: { userId: new ObjectId(_id) }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'friendId',
          foreignField: '_id',
          as: 'friendInfo'
        }
      },
      { $unwind: '$friendInfo' },
      {
        $project: {
          'friendInfo._id': 1,
          'friendInfo.username': 1,
          'friendInfo.email': 1,
          'friendInfo.fullName': 1,
          'friendInfo.avatar': 1,
          'friendInfo.cover_photo': 1,
          'friendInfo.isOnline': 1,
          'friendInfo.date_of_birth': 1,
          'friendInfo.created_at': 1
        }
      },
      { $sort: { 'friendInfo.created_at': sortByCreatedAt } },
      { $skip: skipCount },
      { $limit: limit }
    ]
    try {
      const result = await databaseService.closeFriends.aggregate(pipeline).toArray()
      const filteredUsers = result.map((item) => item.friendInfo)
      const total_items = filteredUsers.length ? filteredUsers.length : 0
      const total_pages = Math.floor((total_items + limit - 1) / limit)
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
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_ALL_USER_FAVORITE
      })
    }
  }
}

const userServices = new UserService()
export default userServices
