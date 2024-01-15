import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import uploadService from '~/services/upload.service'

const uploadController = {
  uploadSingle: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await uploadService.uploadSingelImage(req.file)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPLOAD_IMAGE)
  },
  uploadMultiple: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[]
    const uploadResults = await uploadService.uploadMultipleImages(files)
    return sendResponse.success(res, uploadResults, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPLOAD_MUL_IMAGE)
  }
}

export default uploadController
