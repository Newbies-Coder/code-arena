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
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.LOGIN_SUCCESS)
  },
  register: async (req: Request<ParamsDictionary, any, RegisterBody>, res: Response, next: NextFunction) => {
    const result = await userServices.register(req.body)

    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.REGISTER_SUCCESS)
  },
  logout: async (req: Request<ParamsDictionary, any, LogoutBody>, res: Response, next: NextFunction) => {
    await userServices.logout(req.body)
    const cookies_names = env.client.cookies_name
    res.clearCookie(cookies_names)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.LOGOUT_SUCCESS)
  },
  refreshToken: async (req: Request<ParamsDictionary, any, RefreshTokenBody>, res: Response, next: NextFunction) => {
    const result = await userServices.refreshToken(req.body)

    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.REFRESH_TOKEN_SUCCESS)
  },
  verifyOTP: async (req: Request<ParamsDictionary, any, VerifyOTPBody>, res: Response, next: NextFunction) => {
    await userServices.verifyOTP(req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.VERIFY_OTP_SUCCESS)
  },
  resendVerifyOTP: async (req: Request<ParamsDictionary, any, ResendVerifyOTPBody>, res: Response, next: NextFunction) => {
    await userServices.sendOTP(req.body.email)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.VERIFY_OTP_SUCCESS)
  },
  forgotPassword: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.forgotPassword(req.body)

    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.FORGOT_PASSWORD_SUCCESS)
  },
  verifyForgotPassword: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS)
  },
  resetPassword: async (req: Request<ParamsDictionary, any, ResetPasswordBody>, res: Response, next: NextFunction) => {
    await userServices.changePassword({ email: req.body.email, password: req.body.password } as ChangePasswordBody)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.RESET_PASSWORD_SUCCESS)
  },
  changePassword: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.changePassword(req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.CHANGE_PASSWORD_SUCCESS)
  },
  // Use AI to generate avatar
  generateAvatarAI: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.UPLOAD_AVATAR_SUCCESS)
  },
  uploadAvatar: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.UPLOAD_AVATAR_SUCCESS)
  },
  follow: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    // Message register successfully!
    const result = await userServices.follow(req.user, req.params)

    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.FOLLOW_SUCCESS)
  },
  unfollow: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.unfollow(req.user, req.params)
    // Message register successfully!
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.UNFOLLOW_SUCCESS)
  },
  getAllUser: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUser(req.query)
    // Message register successfully!
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.GET_ALL_USER_SUCCESS)
  },
  getUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.params.userId))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.GET_USER_SUCCESS)
  },
  getMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.GET_PROFILE_USER_SUCCESS)
  },
  updateMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.UPDATE_USER_SUCCESS)
  },
  updateMeAvatar: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.updateMeAvatar(req.user, req.file)
    // Message register successfully!
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.UPDATE_USER_SUCCESS)
  },
  search: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.SEARCH_USER_SUCCESS)
  },
  delete: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.DETELE_USER_SUCCESS)
  },
  deleteManyUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.DELETE_MANY_USER_SUCCESS)
  },
  testToken: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.checkToken(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TEST_TOKEN_SUCCESS)
  }
}

export default userController
