import moment from 'moment'
import { GenerateOTPResult } from '~/@types/auth.type'
import OTP from '~/models/schemas/Otps.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateOTPCode, hashOTP } from '~/utils/crypto'

class OTPService {
  async findOTP(otp: string) {
    return await databaseService.otps.findOne<OTP>({ otp: hashOTP(otp) })
  }

  async generateOTP(email: string) {
    const otpCode = generateOTPCode()
    const otp = new OTP({
      email,
      otp: hashOTP(otpCode),
      expiredIn: new Date()
    })
    await databaseService.otps.insertOne(otp)
    const result: GenerateOTPResult = { code: otpCode, email: email }
    return result
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
