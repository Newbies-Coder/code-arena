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

// Validation register feature
export const registerValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 4,
            max: 20
          },
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.NAME_LENGTH_MUST_BE_FROM_4_TO_20
        },
        trim: true
      },
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
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_ACCESSABILITY
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
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
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
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.DATE_OF_BIRTH_IS_ISO8601
        }
      }
    },
    ['body']
  )
)

// Validation login feature
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
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (!isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
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
          options: async (value, { req }) => {
            const isExistPassword = await userServices.validatePassword(req.body.email, value)
            if (!isExistPassword) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_IS_INCORRECT
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

export const accessTokenValidator = validate(
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
              req.body.email = payload.email
              req.body.role = payload.role
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

// Validation forgot password feature
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
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (!isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.EMAIL_IS_NOT_EXIT
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
            const otp = await OPTService.findOTP(value)
            if (!otp) {
              throw new Error(VALIDATION_MESSAGES.USER.VERIFY_OTP.OTP_IS_NOT_EXIST)
            }

            if (otp.expiredIn > new Date()) {
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

// Validation change password feature
export const changePasswordValidator = validate(
  checkSchema(
    {
      // old_password: string, password: string, confirm_password: string
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
            const isExistPassword = await userServices.validatePassword(req.body.email, value)
            if (!isExistPassword) {
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
            if (value === req.body.old_password) {
              throw new Error(VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_NOT_SAME_OLD_PASSWORD)
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

// Validation reset password feature
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
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (!isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
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
