import { AuthUser } from '~/@types/auth.type'
import cloudinaryService from './cloudinary.service'
import { env } from '~/config/environment.config'
import { DEV_ERRORS_MESSAGES, VALIDATION_MESSAGES } from '~/constants/message'
import { databaseService } from './connectDB.service'
import Banner from '~/models/schemas/Banner.schema'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { PaginationType, ParsedBannerUrlQuery } from '~/@types/reponse.type'

class BannersService {
  async insertBanners({ _id }: AuthUser, slug: string, files: Express.Multer.File[]) {
    if (files.length === 0) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.BAD_REQUEST, message: VALIDATION_MESSAGES.BANNER.IMAGE_IS_REQUIRED })
    }
    try {
      const result = await Promise.all(
        files.map(async (file) => {
          const result = await cloudinaryService.uploadImage(env.cloudinary.banner_folder, file.buffer)
          const imageUrl = result.secure_url
          await databaseService.banners.insertOne(new Banner({ user_id: new ObjectId(_id), slug, url: imageUrl }))
          return imageUrl
        })
      )
      return result
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.INSERT_BANNER
      })
    }
  }

  async getAll(payload: ParsedBannerUrlQuery): Promise<PaginationType<Partial<Banner>>> {
    try {
      const page = parseInt(payload.page || '1', 10)
      const per_page = parseInt(payload.limit || '10', 10)
      const bannerId = payload.bannerId ? new ObjectId(payload.bannerId) : null
      const sort_by = payload.sort_by || '_id'
      const sort_order = payload.sort_order === 'desc' ? -1 : 1

      let query = bannerId ? { _id: bannerId } : {}

      const items = await databaseService.banners
        .find(query)
        .skip((page - 1) * per_page)
        .limit(per_page)
        .sort({ [sort_by]: sort_order })
        .toArray()
      const total_items = await databaseService.banners.countDocuments(query)
      const total_pages = Math.floor((total_items + per_page - 1) / per_page)
      const content: PaginationType<Partial<Banner>> = {
        items,
        page,
        limit: per_page,
        total_pages,
        total_items
      }
      return content
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_ALL_BANNER
      })
    }
  }

  async getBannerByUserId(id: string): Promise<Banner> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.BANNER.INVALID_ID
        })
      }
      const result = await databaseService.banners.findOne({ _id: new ObjectId(id) })
      if (!result) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.BANNER.NOT_FOUND
        })
      }
      return result
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.GET_BANNER_WITH_ID
      })
    }
  }

  async deleteBanner(id: string): Promise<void> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.BANNER.INVALID_ID
        })
      }

      const banner = await databaseService.banners.findOneAndDelete({ _id: new ObjectId(id) })

      if (!banner) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.NOT_FOUND,
          message: VALIDATION_MESSAGES.BANNER.NOT_FOUND
        })
      }
      await cloudinaryService.deleteImage(banner.url)
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || DEV_ERRORS_MESSAGES.DELETED_BANNER
      })
    }
  }
}

const bannersService = new BannersService()
export default bannersService
