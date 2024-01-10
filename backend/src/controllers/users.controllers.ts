import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  BlockUserBody,
  ChangePasswordBody,
  FavoriteBody,
  ForgotPasswordBody,
  LoginPayload,
  LogoutBody,
  RefreshTokenBody,
  RegisterBody,
  ResendVerifyOTPBody,
  ResetPasswordBody,
  UpdateProfileBody,
  VerifyOTPBody
} from '~/models/requests/User.requests'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import userServices from '~/services/users.service'
import { ObjectId } from 'mongodb'
import { env } from '~/config/environment.config'

const userController = {
  login: async (req: Request<ParamsDictionary, any, LoginPayload>, res: Response, next: NextFunction) => {
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

  forgotPassword: async (req: Request<ParamsDictionary, any, ForgotPasswordBody>, res: Response, next: NextFunction) => {
    await userServices.forgotPassword(req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.FORGOT_PASSWORD)
  },

  resendVerifyOTP: async (req: Request<ParamsDictionary, any, ResendVerifyOTPBody>, res: Response, next: NextFunction) => {
    await userServices.sendOTP(req.body.email)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.OTP_SUCCESS.VERIFY_OTP)
  },

  resetPassword: async (req: Request<ParamsDictionary, any, ResetPasswordBody>, res: Response, next: NextFunction) => {
    await userServices.resetPassword({ email: req.body.email, password: req.body.password } as ResetPasswordBody)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.RESET_PASSWORD)
  },

  changePassword: async (req: Request<ParamsDictionary, any, ChangePasswordBody>, res: Response, next: NextFunction) => {
    await userServices.changePassword(req.user, req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.RESET_PASSWORD)
  },

  follow: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.follow(req.user, req.params)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.FOLLOW)
  },
  unfollow: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.unfollow(req.user, req.params)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UNFOLLOW)
  },

  getUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.params.id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_USER)
  },

  getMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getMe(new ObjectId(req.user._id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_PROFILE_USER)
  },

  uploadAvatar: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.updateMeAvatar(req.user, req.file)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPLOAD_AVATAR)
  },

  uploadThumbnail: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.updateMeThumbnail(req.user, req.file)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPLOAD_THUMBNAIL)
  },

  testToken: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.checkToken(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.TEST_TOKEN)
  },

  updateMe: async (req: Request<ParamsDictionary, any, UpdateProfileBody>, res: Response, next: NextFunction) => {
    await userServices.updateProfile(req.user, req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.UPDATE_USER)
  },

  getMeBlockedUsers: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getMeBlockedUser(req.user, req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_BLOCKED_USER)
  },

  blockedUser: async (req: Request<ParamsDictionary, any, BlockUserBody>, res: Response, next: NextFunction) => {
    const result = await userServices.blockedUser(req.user, req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.INSERT_BLOCKED_USER)
  },

  unBlockedUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.unBlockedUser(req.user, req.params)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.DELETE_BLOCKED_USER)
  },
  favorite: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getFavorite(req.user, req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_FAVORITE_USER)
  },
  insertUserFavorite: async (req: Request<ParamsDictionary, any, FavoriteBody>, res: Response, next: NextFunction) => {
    await userServices.insertUserFavorite(req.user, req.body)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.INSERT_USER_TO_FAVORITES)
  },
  removeUserFavorite: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await userServices.removeUserFavorite(req.user, req.params)
    return sendResponse.success(res, '', RESULT_RESPONSE_MESSAGES.USER_SUCCESS.DELETE_USER_TO_FAVORITES)
  }
}

export default userController
