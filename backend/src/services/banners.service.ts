import { AuthUser } from '~/@types/auth.type'
import cloudinaryService from './cloudinary.service'
import { env } from '~/config/environment.config'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { databaseService } from './connectDB.service'
import Banner from '~/models/schemas/Banner.schema'
import { ObjectId, WithId } from 'mongodb'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { ParsedUrlQuery } from 'node:querystring'
import { PaginationType } from '~/@types/reponse.type'

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

  async getAll(payload: ParsedUrlQuery) {
    const pageIndex = Number(payload.pageIndex)
    const pageSize = Number(payload.pageSize)
    const userId = String(payload.userId)

    const banners = await databaseService.banners
      .find({ user_id: new ObjectId(userId) })
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .toArray()

    // TODO: Make something like private attributes const in UserType

    const result: PaginationType<WithId<Banner>> = {
      items: banners,
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalRow: banners.length
    }

    return result
  }

  async getWithUserId(userId: string) {
    const banners = databaseService.banners.find({ user_id: new ObjectId(userId) })
    return await banners.toArray()
  }

  async deleteBanner(id: string) {
    const banner = await databaseService.banners.findOneAndDelete({ _id: new ObjectId(id) })
    if (!banner) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.BANNER.BANNER_NOT_FOUND })
    }
    await cloudinaryService.deleteImage(banner.url)
  }
}

const bannersService = new BannersService()
export default bannersService
