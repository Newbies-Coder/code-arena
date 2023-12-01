import { signToken, verifyToken } from '~/utils/jwt'
import { databaseService } from './connectDB.service'
import { TokenType, UserRole, UserVerifyStatus } from '~/constants/enums'
import { env } from '~/config/environment.config'
import { RefreshTokenBody, RegisterBody, VerifyOTPBody } from '~/models/requests/User.requests'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { ResultRefreshTokenType, ResultRegisterType } from '~/@types/reponse.type'
import { hashOTP, hashPassword } from '~/utils/crypto'
import User from '~/models/schemas/Users.schema'
import emailService from '~/services/email.service'
import otpService from '~/services/otp.service'
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
    let { email, username } = payload
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

    const otp = await otpService.generateOTP(email)
    await emailService.sendMail(
      otp.email,
      'Code Arena',
      ` <div style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color:#00466a;text-decoration:none;font-weight:600">Code Arena</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>You requested a one-time password for accessing your account. Please use the following OTP to proceed:</p>
            <h2 style="background:#00466a;margin:0 auto;width:max-content;padding:0 10px;color:#fff;border-radius:4px">${otp.code}</h2>
            <p>This OTP is valid for only 5 minutes and can be used only once. If you did not request this, please ignore this email or contact support if you have concerns.</p>
            <p style="font-size:.9em">Regards,
              <br>
              Code Arena</p>
            <hr style="border:none;border-top:1px solid #eee">
            <div style="float:right;padding:8px 0;color:#aaa;font-size:.8em;line-height:1;font-weight:300">
              <p>Code Arena Inc</p>
              <p>475A Dien Bien Phu, Binh Thanh, Ho Chi Minh</p>
              <p>Viet Nam</p>
            </div>
          </div>
        </div>`
    )

    let content: ResultRegisterType = { _id: user_id, username, email, access_token, refresh_token }
    return content
  }

  async verifyOTP(payload: VerifyOTPBody) {
    let { otp } = payload
    const { email } = await otpService.findOTP(hashOTP(otp))
    await databaseService.users.updateOne(
      { email, verify: UserVerifyStatus.Unverified },
      { $set: { verify: UserVerifyStatus.Verified } },
      { upsert: false }
    )
  }

  async refreshToken(payload: RefreshTokenBody) {
    const { refresh_token } = payload
    const { refresh_token_key } = env.jwt

    const { _id, role, email } = await verifyToken({
      token: refresh_token,
      secretOrPublicKey: refresh_token_key
    })

    const deleteRefreshToken = databaseService.refreshTokens.deleteOne({ user_id: _id })
    const signToken = this.signAccessAndRefreshToken(_id, email, role)

    const [tokens] = await Promise.all([signToken, deleteRefreshToken])

    const [newAccessToken, newRefreshToken] = tokens

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(_id)
      })
    )

    const result: ResultRefreshTokenType = { access_token: newAccessToken, refresh_token: newRefreshToken }
    return result
  }
}

const userServices = new UserService()
export default userServices
