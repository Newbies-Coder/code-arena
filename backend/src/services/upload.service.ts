import _ from 'lodash'
import { UploadSingleType } from '~/@types/reponse.type'
import { env } from '~/config/environment.config'
import cloudinaryService from '~/services/cloudinary.service'

class UploadService {
  async uploadSingelImage(file: Express.Multer.File): Promise<UploadSingleType> {
    const { url } = await cloudinaryService.uploadImage(env.cloudinary.image_folder, file.buffer)
    const result: UploadSingleType = { imageUrl: url }
    return result
  }

  async uploadMultipleImages(files: Express.Multer.File[]): Promise<UploadSingleType[]> {
    const uploadPromises = files.map((file) => this.uploadSingelImage(file))
    const results = await Promise.all(uploadPromises)
    return results
  }
}

const uploadService = new UploadService()
export default uploadService
