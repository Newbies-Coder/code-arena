import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import { env } from '~/config/environment.config'
import { DATABASE_MESSAGE } from '~/constants/message'
import BannedMember from '~/models/schemas/BannedMember.schema'
import Banner from '~/models/schemas/Banner.schema'
import BlockedUser from '~/models/schemas/BlockedUser.schema'
import CloseFriends from '~/models/schemas/CloseFriends'
import Course from '~/models/schemas/Course.schema'
import CourseCategory from '~/models/schemas/CourseCategory.schema'
import Follow from '~/models/schemas/Follow.schema'
import Invitation from '~/models/schemas/Invitation.schema'
import Message from '~/models/schemas/Message.schema'
import OTP from '~/models/schemas/Otps.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Room from '~/models/schemas/Room.schema'
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

  get blocked_users(): Collection<BlockedUser> {
    return this.db.collection(env.database.main.collection.blocked_user as string)
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

  // Get collection close friends
  get closeFriends(): Collection<CloseFriends> {
    return this.db.collection(env.database.main.collection.close_friends as string)
  }

  // Get collection banners
  get banners(): Collection<Banner> {
    return this.db.collection(env.database.main.collection.banners)
  }

  get course_category(): Collection<CourseCategory> {
    return this.db.collection(env.database.main.collection.course_category)
  }

  get courses(): Collection<Course> {
    return this.db.collection(env.database.main.collection.courses)
  }

  get messages(): Collection<Message> {
    return this.db.collection(env.database.main.collection.messages)
  }

  get rooms(): Collection<Room> {
    return this.db.collection(env.database.main.collection.rooms)
  }

  get invites(): Collection<Invitation> {
    return this.db.collection(env.database.main.collection.invites)
  }

  get bannedMembers(): Collection<BannedMember> {
    return this.db.collection(env.database.main.collection.banned_members);
  }
}

export const databaseService = new DatabaseServices()
