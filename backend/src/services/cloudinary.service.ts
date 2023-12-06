import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { extractPublicId } from 'cloudinary-build-url'
import { env } from '~/config/environment.config'
import streamifier from 'streamifier'

cloudinary.config({
  api_secret: env.cloudinary.secret,
  api_key: env.cloudinary.key,
  cloud_name: env.cloudinary.cloud_name
})

class CloudinaryService {
  async uploadAvatar(imageBuffer: Buffer) {
    return await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: env.cloudinary.avatar_folder,
          format: 'jpg'
        },
        (error, result) => {
          if (result) {
            return resolve(result)
          }
          return reject(error)
        }
      )
      streamifier.createReadStream(imageBuffer).pipe(stream)
    })
  }

  async deleteAvatar(url: string) {
    return await new Promise((resolve, reject) => {
      const publicId = extractPublicId(url)
      cloudinary.api.delete_resources([publicId], (error, result) => {
        if (result) {
          return resolve(result)
        }
        return reject(error)
      })
    })
  }
}
const cloudinaryService = new CloudinaryService()

export default cloudinaryService
