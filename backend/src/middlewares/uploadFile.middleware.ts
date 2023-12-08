import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import path from 'path'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'

const uploadFile = multer({
  limits: {
    fieldSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      return callback(null, true)
    }

    callback(new Error('Error'))
  }
})

export const singleImageUpload = (req: Request, res: Response, next: NextFunction) => {
  uploadFile.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(
        new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_SIZE
        })
      )
    }

    if (err instanceof Error) {
      next(
        new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_EXTENSION
        })
      )
    }

    next()
  })
}
