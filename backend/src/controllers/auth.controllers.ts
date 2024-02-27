import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import _ from 'lodash'
import { AuthProvider } from '~/@types/auth.type'
import { ParsedGetAllUserUrlQuery, ParsedGetUserByRoleUrlQuery } from '~/@types/reponse.type'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import authService from '~/services/oauth.service'
import oauthService from '~/services/oauth.service'

const authController = {
  callback: (provider: AuthProvider) => async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await oauthService.callback(provider, req, res)
  },
  getAllUserPagination: async (req: Request<ParamsDictionary, any, ParsedGetAllUserUrlQuery>, res: Response, next: NextFunction) => {
    const result = await authService.getAllUserPagination(req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ALL_USER)
  },
  getAllUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await authService.getAllUser()
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ALL_USER)
  },
  createUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await authService.create(req.body)
    return sendResponse.created(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.CREATE_ACCOUNT_ADMIN)
  },
  updateUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await authService.update(req.user, req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPDATE_USER)
  },
  getUsersByRole: async (req: Request<ParamsDictionary, any, any, ParsedGetUserByRoleUrlQuery>, res: Response, next: NextFunction) => {
    const result = await authService.getUsersByRole(req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ROLE_USER)
  },
  deleteManyUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await authService.deleteManyUsers(req.query)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.DELETE_MANY_USER)
  }
}

export default authController
