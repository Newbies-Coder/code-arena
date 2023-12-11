import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import bannersService from '~/services/banners.service'

const bannerController = {
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.GET_ALL)
  },
  insert: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await bannersService.insertBanners(req.user, req.body.slug, req.files as Express.Multer.File[])
    // await bannersService.insertBanners(req.user, req.body.files as Express.Multer.File[])
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.INSERT)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.DELETE)
  }
}

export default bannerController
