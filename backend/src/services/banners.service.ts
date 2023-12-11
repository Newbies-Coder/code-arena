import { AuthUser } from '~/@types/auth.type'
import cloudinaryService from './cloudinary.service'
import { env } from '~/config/environment.config'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { databaseService } from './connectDB.service'
import Banner from '~/models/schemas/Banner.schema'
import { ObjectId } from 'mongodb'

class BannersService {
  async insertBanners({ _id }: AuthUser, slug: string, files: Express.Multer.File[]) {
    try {
      const result = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinaryService.uploadImage(env.cloudinary.banner_folder, file.buffer)

          const imageUrl = result.secure_url
          await databaseService.banners.insertOne(new Banner({ user_id: new ObjectId(_id), slug: slug, url: imageUrl }))
          return imageUrl
        })
      )
      return result
    } catch (error) {
      throw new Error(VALIDATION_MESSAGES.UPLOAD.IMAGE.ERROR_INSERT_BANNERS)
    }
  }
}

const bannersService = new BannersService()
export default bannersService
