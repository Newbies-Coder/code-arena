import OTP from '~/models/schemas/Otps.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateOTPCode } from '~/utils/crypto'

class OTPService {
  async findOTP(otp: string) {
    return await databaseService.otps.findOne({ otp: otp })
  }

  async generateOTP(email: string) {
    const otp = new OTP({
      email,
      otp: generateOTPCode()
    })

    await databaseService.otps.insertOne(otp)
    return otp
  }
}

const otpService = new OTPService()

export default otpService
