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
      otp: hashOTP(otpCode)
    })

    await databaseService.otps.insertOne(otp)
    const result: GenerateOTPResult = { code: otpCode, email: email }
    return result
  }
}

const otpService = new OTPService()

export default otpService
