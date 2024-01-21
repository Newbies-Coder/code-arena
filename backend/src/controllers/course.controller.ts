import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import { ParsedUrlQuery } from 'querystring'
import { CreateCourseBody, UpdateCourseBody } from '~/models/requests/Course.request'
import courseService from '~/services/course.service'

const courseController = {
  create: async (req: Request<ParamsDictionary, any, CreateCourseBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await courseService.create(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.COURSE.INSERT)
  },

  update: async (req: Request<ParamsDictionary, any, UpdateCourseBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await courseService.update(req.params.id, req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.COURSE.UPDATE)
  },

  delete: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await courseService.delete(req.params.id)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.COURSE.DELETE)
  }
}

export default courseController
