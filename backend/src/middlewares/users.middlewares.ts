import { VALIDATION_MESSAGES } from '~/constants/message'
import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import userServices from '~/services/users.service'
import { verifyToken } from '~/utils/jwt'
import { env } from '~/config/environment.config'
import OPTService from '~/services/otp.service'
import { databaseService } from '~/services/connectDB.service'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { TokenPayloadType } from '~/@types/tokenPayload.type'
import { ObjectId } from 'mongodb'
import { isValidDateOfBirth, isValidEmail, isValidGender, isValidMulName, isValidNameCharater, isValidPassword, validateEmail, validatePhone } from '~/utils/helper'

export const registerValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.USERNAME_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.USERNAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 2,
            max: 30
          },
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.USERNAME_LENGTH_MUST_BE_FROM_2_TO_30
        },
        trim: true,
        custom: {
          options: async (value) => {
            const checkValidCharater = isValidNameCharater(value)
            const checkMulWhitespace = isValidMulName(value)
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.USER.REGISTER.INVALID_USERNAME)
            }
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.USER.REGISTER.USERNAME_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        }
      },
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_IS_REQUIRED
        },
        trim: true,
        custom: {
          options: async (value) => {
            const { valid, message } = validateEmail(value)
            if (!valid) {
              throw new Error(message)
            }
            const user = await userServices.findUserByEmail(value)
            if (user) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.CONFLICT,
                message: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_ALREADY_EXISTS
              })
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        trim: true,
        escape: true,
        isLength: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
          options: {
            min: 8,
            max: 16
          }
        },
        custom: {
          options: (value: string) => {
            const validPasswordEmoji = isValidPassword(value)
            if (!validPasswordEmoji) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_CONTAINS_EMOJI
              })
            }
            return true
          }
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        custom: {
          options: (value, { req }) => {
            const validPasswordEmoji = isValidPassword(value)
            if (!validPasswordEmoji) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_CONTAINS_EMOJI
              })
            }
            if (value !== req.body.password) {
              throw new Error(VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        }
      },
      date_of_birth: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.DATE_OF_BIRTH_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.DATE_OF_BIRTH_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            const validDateOfBirth = isValidDateOfBirth(value)
            if (!validDateOfBirth) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.REGISTER.DATE_OF_BIRTH_ERROR_FORMAT
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const loginValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const validEmail = isValidEmail(value)
            if (!validEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.VALID_EMAIL
              })
            }
            await userServices.checkAccountExist(value)
            await userServices.validateAccountAccessibility(value)
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        trim: true,
        isLength: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
          options: {
            min: 8,
            max: 16
          }
        },
        custom: {
          options: async (value) => {
            const validPasswordEmoji = isValidPassword(value)
            if (!validPasswordEmoji) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_CONTAINS_EMOJI
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!value) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_IS_REQUIRED
              })
            }
            try {
              const result = await databaseService.refreshTokens.findOne({ token: value })
              if (!result) {
                throw new ErrorWithStatus({
                  message: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_IS_NOT_EXIST,
                  statusCode: StatusCodes.UNAUTHORIZED
                })
              }
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  statusCode: StatusCodes.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const validEmail = isValidEmail(value)
            if (!validEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.VALID_EMAIL
              })
            }
            const user = await userServices.findUserByEmail(value)
            if (user === null) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_ACCESSABILITY
              })
            }
            await userServices.validateAccountAccessibility(value)
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyForgotpasswordValidator = validate(
  checkSchema(
    {
      forgot_password_token: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.VERIFY_FORGOT_PASSWORD_TOKEN.IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.VERIFY_FORGOT_PASSWORD_TOKEN.MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 6
          },
          errorMessage: VALIDATION_MESSAGES.USER.VERIFY_FORGOT_PASSWORD_TOKEN.LENGTH_MUST_BE_6
        },
        custom: {
          options: async (value) => {
            const checkOTP = isNaN(value)
            if (checkOTP) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_FORGOT_PASSWORD_TOKEN.IS_NUMBERIC)
            }
            const otpRecord = await OPTService.findOTP(value)
            if (!otpRecord) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_FORGOT_PASSWORD_TOKEN.IS_NOT_EXIST)
            }
            const { expiredIn } = otpRecord
            const currentTime = new Date()
            if (currentTime > expiredIn) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_FORGOT_PASSWORD_TOKEN.IS_EXPIRED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const verifyOTPValidator = validate(
  checkSchema(
    {
      otp: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 6,
            max: 6
          },
          errorMessage: VALIDATION_MESSAGES.USER.VERIFY_OTP.OPT_LENGTH_MUST_BE_6
        },
        custom: {
          options: async (value) => {
            const checkOTP = isNaN(value)
            if (checkOTP) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_IS_NUMBERIC)
            }
            const otpRecord = await OPTService.findOTP(value)
            if (!otpRecord) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_IS_NOT_EXIST)
            }
            const { expiredIn } = otpRecord
            const currentTime = new Date()
            if (currentTime > expiredIn) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_IS_EXPIRED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const resendVerifyValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_IS_REQUIRED
        },
        trim: true,
        custom: {
          options: async (value) => {
            const validEmail = isValidEmail(value)
            if (!validEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.VALID_EMAIL
              })
            }
            const user = await userServices.findUserByEmail(value)
            if (user === null) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_ACCESSABILITY
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const deleteManyUserValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value: string | string[]) => {
            if (value instanceof Array) {
              if (!value.every((item) => ObjectId.isValid(item))) {
                throw new ErrorWithStatus({
                  message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                  statusCode: StatusCodes.BAD_REQUEST
                })
              }
            } else {
              if (!ObjectId.isValid(value)) {
                throw new ErrorWithStatus({
                  message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                  statusCode: StatusCodes.BAD_REQUEST
                })
              }
            }

            return true
          }
        }
      }
    },
    ['query']
  )
)

export const changePasswordValidator = validate(
  checkSchema(
    {
      old_password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.OLD_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        },
        custom: {
          options: async (value, { req }) => {
            const hasUserExist = await userServices.validateEmailAndPasswordExist(req.user.email, value)
            if (!hasUserExist) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.PASSWORD.OLD_PASSWORD_IS_INCORRECT
              })
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        },
        custom: {
          options: async (value, { req }) => {
            const validPasswordEmoji = isValidPassword(value)

            if (value === req.body.old_password) {
              throw new Error(VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_NOT_SAME_OLD_PASSWORD)
            }
            if (!validPasswordEmoji) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_CONTAINS_EMOJI
              })
            }
            return true
          }
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        },
        custom: {
          options: async (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const resetPasswordValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const validEmail = isValidEmail(value)
            if (!validEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.VALID_EMAIL
              })
            }
            const user = await userServices.findUserByEmail(value)
            if (user === null) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_ACCESSABILITY
              })
            }
            await userServices.validateAccountAccessibility(value)
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: async (value) => {
            const validPasswordEmoji = isValidPassword(value)
            if (!validPasswordEmoji) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_CONTAINS_EMOJI
              })
            }
            return true
          }
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_STRONG
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        },
        custom: {
          options: async (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const checkTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.TOKEN.ACCESS_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value: string, { req }) => {
            const bearerPrefix = 'Bearer '
            if (!value.startsWith(bearerPrefix)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: VALIDATION_MESSAGES.AUTHORIZATION.HEADER_AUTHORIZATION_IS_INVALID
              })
            }
            const access_token = value.substring(bearerPrefix.length)
            const secret_key = env.jwt.secret_key
            try {
              const payload = (await verifyToken({
                token: access_token,
                secretOrPublicKey: secret_key
              })) as TokenPayloadType
              req.body = payload
            } catch (error) {
              throw new ErrorWithStatus({
                message: capitalize(error.message),
                statusCode: StatusCodes.UNAUTHORIZED
              })
            }
            return true
          }
        }
      }
    },
    ['headers']
  )
)

export const followUserValidator = validate(
  checkSchema(
    {
      id: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID
              })
            }
            const user = await userServices.isUserExist(value)
            if (!user) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
              })
            }
            const userBlocked = await databaseService.blocked_users.findOne({ blockedId: new ObjectId(value) })
            if (userBlocked) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_BLOCKED
              })
            }
            await userServices.validateWithIDAccountAccessibility(value)
            return true
          }
        }
      }
    },
    ['params']
  )
)

export const unfollowUserValidator = validate(
  checkSchema(
    {
      id: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID
              })
            }
            const user = await userServices.isUserExist(value)
            if (!user) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
              })
            }
            const userBlocked = await databaseService.blocked_users.findOne({ blockedId: new ObjectId(value) })
            if (userBlocked) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_BLOCKED
              })
            }
            await userServices.validateWithIDAccountAccessibility(value)
            return true
          }
        }
      }
    },
    ['params']
  )
)

export const userProfileValidator = validate(
  checkSchema(
    {
      id: {
        trim: true,
        escape: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_IS_INVALID)
            }
          }
        }
      }
    },
    ['params']
  )
)

export const updateProfileValidator = validate(
  checkSchema(
    {
      fullName: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.FULL_NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 4,
            max: 50
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.FULL_NAME_MAX_LENGTH_IS_50
        },
        custom: {
          options: async (value) => {
            const checkValidCharater = isValidNameCharater(value)
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.USER.USER_PROFILE.INVALID_FULLNAME)
            }
            return true
          }
        }
      },
      username: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.USERNAME_IS_REQUIRED
        },
        isLength: {
          options: {
            min: 2,
            max: 30
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.USERNAME_LENGTH_MUST_BE_FROM_2_TO_30
        },
        trim: true,
        custom: {
          options: async (value) => {
            const checkValidCharater = isValidNameCharater(value)
            const checkMulWhitespace = isValidMulName(value)
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.USER.USER_PROFILE.INVALID_USERNAME)
            }
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.USER.USER_PROFILE.USERNAME_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        }
      },
      phone: {
        optional: true,
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.PHONE_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isValidPhone = validatePhone(value)
            if (!isValidPhone) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.USER_PROFILE.PHONE_IS_INVALID
              })
            }
            return true
          }
        }
      },
      date_of_birth: {
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.DATE_OF_BIRTH_MUST_BE_A_STRING
        },
        optional: true,
        trim: true,
        custom: {
          options: (value) => {
            const val = isValidDateOfBirth(value)
            if (!val) {
              throw new Error(VALIDATION_MESSAGES.USER.USER_PROFILE.DATE_OF_BIRTH_ERROR_FORMAT)
            }
            return true
          }
        }
      },
      gender: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.GENDER_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const checkGender = isValidGender(value)
            if (!checkGender) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.USER_PROFILE.GENDER_IS_INVALID
              })
            }
            return true
          }
        },
        optional: true
      },
      bio: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.BIO_MUST_BE_STRING
        },
        isLength: {
          options: {
            max: 500
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.BIO_MAX_LENGTH_IS_500
        }
      },
      address: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.ADDRESS_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 255
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.ADDRESS_LENGTH_IS_VALID
        }
      }
    },
    ['body']
  )
)

export const favoriteValidator = validate(
  checkSchema(
    {
      friendId: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.BAD_REQUEST, message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID })
            }
            const user = await databaseService.users.findOne({ _id: new ObjectId(value) })
            if (user === null) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.USER.FAVORITE.FRIEND_ID_IS_EXIT })
            }
            if (value === req.user?._id) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.FORBIDDEN, message: VALIDATION_MESSAGES.USER.FAVORITE.USER_FAVOTITE_THEMSELVES })
            }
            const isFriendAlreadyFavorites = await databaseService.closeFriends.findOne({ userId: new ObjectId(req.user?._id), friendId: new ObjectId(value) })

            if (isFriendAlreadyFavorites) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.USER.FAVORITE.FRIEND_ALREADY_FAVORITE })
            }
            const userBlocked = await databaseService.blocked_users.findOne({ blockedId: new ObjectId(value) })
            if (userBlocked) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_BLOCKED
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const removeFavoriteValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.BAD_REQUEST, message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID })
            }
            const user = await databaseService.users.findOne({ _id: new ObjectId(value) })
            if (!user) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_ID_NOT_FOUND
              })
            }
            const isFriendAlreadyFavorites = await databaseService.closeFriends.findOne({ userId: new ObjectId(req.user?._id), friendId: new ObjectId(value) })
            if (!isFriendAlreadyFavorites) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.USER.FAVORITE.FRIEND_NOT_ALREADY_FAVORITE_USER })
            }
            if (value === req.user._id) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.FORBIDDEN, message: VALIDATION_MESSAGES.USER.FAVORITE.USER_FAVOTITE_REMOVE_THEMSELVES })
            }
            const userBlocked = await databaseService.blocked_users.findOne({ blockedId: new ObjectId(value) })
            if (userBlocked) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_BLOCKED
              })
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)

export const blockedUserValidator = validate(
  checkSchema(
    {
      blockedId: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID
              })
            }
            const user = await userServices.isUserExist(value)
            if (!user) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
              })
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
