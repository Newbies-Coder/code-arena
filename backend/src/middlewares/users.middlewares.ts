import { VALIDATION_MESSAGES } from '~/constants/message'
import { checkSchema } from 'express-validator'
import validate from '~/utils/validate'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import userServices from '~/services/users.service'
import OPTService from '~/services/opt.service'

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
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_MUST_BE_A_STRING
        }
      }
    },
    ['body']
  )
)
