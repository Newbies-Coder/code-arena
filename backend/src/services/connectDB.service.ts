import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import { env } from '~/config/environment.config'
import { DATABASE_MESSAGE } from '~/constants/message'
import Follow from '~/models/schemas/Follow.schema'
import OTP from '~/models/schemas/Otps.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/Users.schema'
class DatabaseServices {
  private client: MongoClient | undefined
  private db: Db
  constructor() {
    this.client = new MongoClient(env.database.main.url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(env.database.main.name)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log(DATABASE_MESSAGE.DB_MAIN.CONNECT)
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  async disConnect() {
    try {
      await this.client.close()
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  // Get collection user
  get users(): Collection<User> {
    return this.db.collection(env.database.main.collection.users as string)
  }

  // Get collection user
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(env.database.main.collection.refresh_tokens as string)
  }

  get otps(): Collection<OTP> {
    return this.db.collection(env.database.main.collection.otps as string)
  }

  get follow(): Collection<Follow> {
    return this.db.collection(env.database.main.collection.follow as string)
  }
}

export const databaseService = new DatabaseServices()
