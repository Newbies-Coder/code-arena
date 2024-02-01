import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import { GenerateOTPResult } from '~/@types/auth.type'
import { DEV_ERRORS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import OTP from '~/models/schemas/Otps.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateOTPCode, hashOTP } from '~/utils/crypto'

class OTPService {
  async findOTP(otp: string) {
    return await databaseService.otps.findOne<OTP>({ otp: hashOTP(otp) })
  }

  async generateOTP(email: string): Promise<GenerateOTPResult> {
    try {
      const otpCode = generateOTPCode()
      let OTP_LIFETIME = 5 * 60 * 1000
      const otp = new OTP({
        email,
        otp: hashOTP(otpCode),
        expiredIn: new Date(Date.now() + OTP_LIFETIME) // Expires in 5 minutes
      })

      await databaseService.otps.deleteMany({ email: email })
      await databaseService.otps.insertOne(otp)
      return { code: otpCode, email }
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GENERATED_OTP
      })
    }
  }

  async isOtpExpired(otp: string): Promise<Boolean> {
    // Retrieve the OTP document by ID or some unique identifier
    console.log(hashOTP(otp))
    const otpDocument = await databaseService.otps.findOne({ otp: hashOTP(otp) })

    if (!otpDocument) {
      throw new Error('OTP not found')
    }
    const otpExpirationTime = otpDocument.expiredIn // Assuming this is a Date object
    const currentTime = moment() // Current time
    // Compare the timestamps
    return currentTime.isAfter(otpExpirationTime) // Returns true if OTP is expired
  }
}

const otpService = new OTPService()

export default otpService
