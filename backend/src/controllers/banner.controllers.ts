import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'

const bannerController = {
  getAll: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.GET_ALL)
  },
  insert: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.INSERT)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.BANNERS_SUCCESS.DELETE)
  }
}

export default bannerController
