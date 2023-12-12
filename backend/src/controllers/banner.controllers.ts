import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import bannersService from '~/services/banners.service'
import { ParsedUrlQuery } from 'querystring'

const bannerController = {
  getAll: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await bannersService.getAll(req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.GET_ALL)
  },
  getWithUserId: async (req: Request<ParamsDictionary, any, any, { id: string }>, res: Response, next: NextFunction) => {
    const result = await bannersService.getWithUserId(req.query.id)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.GET_WITH_USER_ID)
  },
  insert: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await bannersService.insertBanners(req.user, req.body.slug, req.files as Express.Multer.File[])
    // await bannersService.insertBanners(req.user, req.body.files as Express.Multer.File[])
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.INSERT)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await bannersService.deleteBanner(req.params.id)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.DELETE)
  }
}

export default bannerController
