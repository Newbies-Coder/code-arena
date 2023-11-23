import { databaseService } from './connectDB.service'

class UserService {
  // Check email exist in dat abase
  async validateEmailAccessibility(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}

const userServices = new UserService()
export default userServices
