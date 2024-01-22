import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import { ParsedUrlQuery } from 'querystring'
import courseCategoryService from '~/services/courseCategory.service'
import { CreateCourseCategoryBody, UpdateCourseCategoryBody } from '~/models/requests/CourseCategory.request'

const courseCategoryController = {
  create: async (req: Request<ParamsDictionary, any, CreateCourseCategoryBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await courseCategoryService.create(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.COURSE_CATEGORY.INSERT)
  },

  update: async (req: Request<ParamsDictionary, any, UpdateCourseCategoryBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await courseCategoryService.update(req.params.id, req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.COURSE_CATEGORY.UPDATE)
  },

  delete: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await courseCategoryService.delete(req.params.id)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.COURSE_CATEGORY.DELETE)
  }
}

export default courseCategoryController
