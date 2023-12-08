import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { ChangePasswordBody, LoginBody, LogoutBody, RefreshTokenBody, RegisterBody, ResendVerifyOTPBody, ResetPasswordBody, VerifyOTPBody } from '~/models/requests/User.requests'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import userServices from '~/services/users.service'
import { env } from '~/config/environment.config'
import { ParsedUrlQuery } from 'querystring'
import { ObjectId } from 'mongodb'

const userController = {
  login: async (req: Request<ParamsDictionary, any, LoginBody>, res: Response, next: NextFunction) => {
    const result = await userServices.login(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.AUTH_SUCCESS.LOGIN)
  },
  register: async (req: Request<ParamsDictionary, any, RegisterBody>, res: Response, next: NextFunction) => {
    const result = await userServices.register(req.body)

    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.REGISTER)
  },
  logout: async (req: Request<ParamsDictionary, any, LogoutBody>, res: Response, next: NextFunction) => {
    await userServices.logout(req.body)
    const cookies_names = env.client.cookies_name
    res.clearCookie(cookies_names)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.LOGOUT)
  },
  refreshToken: async (req: Request<ParamsDictionary, any, RefreshTokenBody>, res: Response, next: NextFunction) => {
    const result = await userServices.refreshToken(req.body)

    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.REFRESH_TOKEN)
  },
  verifyOTP: async (req: Request<ParamsDictionary, any, VerifyOTPBody>, res: Response, next: NextFunction) => {
    await userServices.verifyOTP(req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.OTP_SUCCESS.VERIFY_OTP)
  },
  resendVerifyOTP: async (req: Request<ParamsDictionary, any, ResendVerifyOTPBody>, res: Response, next: NextFunction) => {
    await userServices.sendOTP(req.body.email)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.OTP_SUCCESS.VERIFY_OTP)
  },
  forgotPassword: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.forgotPassword(req.body)

    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.FORGOT_PASSWORD)
  },
  verifyForgotPassword: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.VERIFY_FORGOT_PASSWORD)
  },
  resetPassword: async (req: Request<ParamsDictionary, any, ResetPasswordBody>, res: Response, next: NextFunction) => {
    await userServices.changePassword({ email: req.body.email, password: req.body.password } as ChangePasswordBody)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.RESET_PASSWORD)
  },
  changePassword: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.changePassword(req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.CHANGE_PASSWORD)
  },
  uploadAvatar: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.updateMeAvatar(req.user, req.file)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPLOAD_AVATAR)
  },
  uploadThumbnail: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.updateMeThumbnail(req.user, req.file)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPLOAD_THUMBNAIL)
  },
  follow: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    // Message register successfully!
    userServices.follow(req.user, req.params)

    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.FOLLOW)
  },
  unfollow: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.unfollow(req.user, req.params)
    // Message register successfully!
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UNFOLLOW)
  },
  getAllUser: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUser(req.query)
    // Message register successfully!
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ALL_USER)
  },
  getUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.params.id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_USER)
  },
  getMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_PROFILE_USER)
  },
  updateMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPDATE_USER)
  },
  updateMeAvatar: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.updateMeAvatar(req.user, req.file)
    // Message register successfully!
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPDATE_USER)
  },

  updateMeThumbnail: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.updateMeThumbnail(req.user, req.file)
    // Message register successfully!
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPDATE_USER)
  },
  search: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.SEARCH_USER)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.DELETE_USER)
  },
  deleteManyUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.DELETE_MANY_USER)
  },
  getUsersByRole: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ROLE_USER)
  },
  favorite: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ROLE_USER)
  },
  insertUserFavorite: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ROLE_USER)
  },
  removeUserFavorite: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.DELETE_USER_TO_FAVORITES)
  },
  blocks: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_USERS_BLOCK)
  },
  insertBlocks: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.BLOCK_USER)
  },
  unblock: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.REMOVE_USER_BLOCK)
  },
  testToken: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.checkToken(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.TEST_TOKEN)
  }
}

export default userController
