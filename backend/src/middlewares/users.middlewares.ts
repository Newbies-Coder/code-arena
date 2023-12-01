import { VALIDATION_MESSAGES } from '~/constants/message'
import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import userServices from '~/services/users.service'
import { verifyAccessToken } from '~/utils/jwt'
import { env } from '~/config/environment.config'

// Validation register feature
export const registerValidator = validate(
  checkSchema(
    {
      name: {
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
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.EMAIL_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.REGISTER.EMAIL_ACCESSBILITY
              })
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_MUST_BE_A_STRING
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_MUST_BE_STRONG
        },
        trim: true,
        escape: true,
        isLength: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
          options: {
            min: 8,
            max: 16
          }
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.CONFIRM_PASSWORD_MUST_BE_A_STRING
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
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.CONFIRM_PASSWORD_MUST_BE_STRONG
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(VALIDATION_MESSAGES.USER.REGISTER.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
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
          errorMessage: VALIDATION_MESSAGES.USER.LOGIN.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: VALIDATION_MESSAGES.USER.LOGIN.EMAIL_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (!isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.LOGIN.EMAIL_ACCESSBILITY
              })
            }
            await userServices.validateAccountAccessibility(value)
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.LOGIN.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.LOGIN.PASSWORD_MUST_BE_A_STRING
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_MUST_BE_STRONG
        },
        trim: true,
        escape: true,
        isLength: {
          errorMessage: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
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
                message: VALIDATION_MESSAGES.USER.LOGIN.PASSWORD_IS_INCORRECT
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
          options: async (value: string) => {
            const bearerPrefix = 'Bearer '
            if (!value.startsWith(bearerPrefix)) {
              throw new Error(VALIDATION_MESSAGES.USER.LOGOUT.HEADER_AUTHORIZATION_IS_INVALID)
            }
            const access_token = value.substring(bearerPrefix.length)
            const secret_key = env.jwt.secret_key
            await verifyAccessToken({ token: access_token, secretOrPublicKey: secret_key })
            return true
          }
        }
      }
    },
    ['headers']
  )
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.TOKEN.REFRESH_TOKEN_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            const isExitRefreshToken = await userServices.validateRefreshToken(value)
            if (!isExitRefreshToken) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: VALIDATION_MESSAGES.TOKEN.REFRESH_TOKEN_USED_OR_NOT_EXIST
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

// Validation forgot password feature
export const forgotPasswordValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.LOGIN.EMAIL_IS_REQUIRED
        },
        isEmail: {
          errorMessage: VALIDATION_MESSAGES.USER.LOGIN.EMAIL_MUST_BE_A_STRING
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await userServices.validateEmailAccessibility(value)
            if (!isExistEmail) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.FORGOT_PASSWORD.EMAIL_IS_NOT_EXIT
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
