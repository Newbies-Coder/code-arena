import { signToken } from '~/utils/jwt'
import { databaseService } from './connectDB.service'
import { TokenType, UserRole, UserVerifyStatus } from '~/constants/enums'
import { env } from '~/config/environment.config'
import { RegisterBody, VerifyOTPBody } from '~/models/requests/User.requests'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { ResultRegisterType } from '~/@types/reponse.type'
import { hashPassword } from '~/utils/crypto'
import User from '~/models/schemas/Users.schema'
import OPTService from '~/services/opt.service'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { VALIDATION_MESSAGES } from '~/constants/message'

class UserService {
  // Check email exist in dat abase
  async validateEmailAccessibility(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  // Sign JWT access token
  private signAccessToken(_id: string, email: string, role: UserRole) {
    let { access_token_exp, jwt_algorithm, secret_key } = env.jwt
    return signToken({
      payload: {
        _id,
        email,
        role,
        token_type: TokenType.AccessToken
      },
      privateKey: secret_key as string,
      options: {
        expiresIn: access_token_exp,
        algorithm: jwt_algorithm
      }
    })
  }

  //Sign JWT refresh token
  private signRefreshToken(_id: string, email: string, role: UserRole) {
    let { refresh_token_exp, jwt_algorithm, refresh_token_key } = env.jwt
    return signToken({
      payload: {
        _id,
        email,
        role,
        token_type: TokenType.RefreshToken
      },
      privateKey: refresh_token_key as string,
      options: {
        expiresIn: refresh_token_exp,
        algorithm: jwt_algorithm
      }
    })
  }
  // Create access_token and refresh_token
  private signAccessAndRefreshToken(user_id: string, email: string, role: UserRole) {
    return Promise.all([this.signAccessToken(user_id, email, role), this.signRefreshToken(user_id, email, role)])
  }

  // User register
  async register(payload: RegisterBody) {
    let { email, fullName } = payload
    let role = UserRole.User
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    let user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id, email, role)
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(user_id)
      })
    )
    let content: ResultRegisterType = { _id: user_id, fullName, email, access_token, refresh_token }
    return content
  }

  async verifyOTP(payload: VerifyOTPBody) {
    let { otp } = payload
    const { email } = await OPTService.findOTP(otp)
    const result = await databaseService.users.updateOne(
      { email, verify: UserVerifyStatus.Unverified },
      { verify: UserVerifyStatus.Verified },
      { upsert: false }
    )

    //TODO: Custom message for user not found when verify OTP
    if (result.modifiedCount === 0) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.BAD_REQUEST,
        message: VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_EMAIL_IS_VERIFIED_OR_NOT_EXIST
      })
    }
  }
}

const userServices = new UserService()
export default userServices
