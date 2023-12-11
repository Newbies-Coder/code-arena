import { AuthUser } from '~/@types/auth.type'
import cloudinaryService from './cloudinary.service'
import { env } from '~/config/environment.config'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { databaseService } from './connectDB.service'
import Banner from '~/models/schemas/Banner.schema'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'

class BannersService {
  async insertBanners({ _id }: AuthUser, slug: string, files: Express.Multer.File[]) {
    if (files.length === 0) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.BAD_REQUEST, message: VALIDATION_MESSAGES.BANNER.BANNER_IMAGE_IS_REQUIRED })
    }
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

  async getAll(id: string) {
    if (id) {
      const banner = await databaseService.banners.findOne({ _id: new ObjectId(id) })
      if (!banner) {
        throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.BANNER.BANNER_NOT_FOUND })
      }
      return banner
    }
    return await databaseService.banners.find().toArray()
  }

  async getWithUserId(userId: string) {
    const banners = databaseService.banners.find({ user_id: new ObjectId(userId) })
    return banners
  }

  async deleteBanner(id: string) {
    const banner = await databaseService.banners.findOne({ _id: new ObjectId(id) })
    if (!banner) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.BANNER.BANNER_NOT_FOUND })
    }
    await cloudinaryService.deleteImage(banner.url)
    await databaseService.banners.findOneAndDelete({ _id: new ObjectId(banner._id) })
  }
}

const bannersService = new BannersService()
export default bannersService
