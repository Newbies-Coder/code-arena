import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import { ParsedUrlQuery } from 'querystring'
import bannersService from '~/services/banners.service'
import { InsertBanner } from '~/@types/reponse.type'

const bannerController = {
  getAll: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await bannersService.getAll(req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.GET_ALL)
  },
  getBannerByUserId: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await bannersService.getBannerByUserId(req.params.id)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.GET_WITH_USER_ID)
  },
  insert: async (req: Request<ParamsDictionary, any, InsertBanner>, res: Response, next: NextFunction) => {
    const result = await bannersService.insertBanners(req.user, req.body)
    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.INSERT)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await bannersService.deleteBanner(req.params.id)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.DELETE)
  }
}

export default bannerController
