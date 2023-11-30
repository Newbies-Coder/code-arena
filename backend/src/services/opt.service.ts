import OTP from '~/models/schemas/Otps.schema'
import { databaseService } from '~/services/connectDB.service'

class OTPService {
  async findOTP(otp: string) {
    return databaseService.otps.findOne<OTP>({ otp })
  }
}

const OPTService = new OTPService()
export default OPTService
