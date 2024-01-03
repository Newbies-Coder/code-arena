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
import { UserRole } from '~/constants/enums'
import { isIsoDate } from '~/utils/helper'

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
            const specialCharacters = /[^a-zA-Z0-9.-]/
            const username = value.split('@')[0]
            if (specialCharacters.test(username)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.VALID_USERNAME_PART_OF_EMAIL
              })
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
            if (value.includes(' ')) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.REGISTER.PASSWORD_CAN_NOT_CONTAIN_SPACE,
                statusCode: StatusCodes.BAD_REQUEST
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
        trim: true,
        custom: {
          options: (value) => {
            const val = isIsoDate(value)
            if (!val) {
              throw new Error(VALIDATION_MESSAGES.USER.REGISTER.DATE_OF_BIRTH_ERROR_FORMAT)
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
            const specialCharacters = /[^a-zA-Z0-9.-]/
            const username = value.split('@')[0]
            if (specialCharacters.test(username)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.USER.EMAIL.VALID_USERNAME_PART_OF_EMAIL
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
          errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_IS_INCORRECT
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
export const getAllUserValidator = validate(
  checkSchema(
    {
      query: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USERNAME_MUST_BE_STRING
        }
      }
    },
    ['query']
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

export const insertMeBlockedUserValidator = validate(
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
          options: async (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            const user = await userServices.isUserExist(value)

            if (!user) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST,
                statusCode: StatusCodes.NOT_FOUND
              })
            }

            const blocked = await databaseService.blocked_users.findOne({
              blockerId: new ObjectId(req.user._id),
              blockedId: new ObjectId(value)
            })

            if (blocked) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.BLOCK.USER_ALREADY_BLOCKED,
                statusCode: StatusCodes.CONFLICT
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
            const isExistPassword = await userServices.validatePassword(req.user.email, value)
            if (isExistPassword) {
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
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            const user = await userServices.isUserExist(value)

            if (!user) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST,
                statusCode: StatusCodes.NOT_FOUND
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
        }
      }
    },
    ['params']
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

export const updateProfileValidator = validate(
  checkSchema(
    {
      fullName: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.FULL_NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 4,
            max: 50
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.FULL_NAME_MAX_LENGTH_IS_50
        }
      },
      username: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.FULL_NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 4,
            max: 20
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_NAME_LENGTH_MUST_BE_FROM_4_TO_20
        },
        trim: true
      },
      email: {
        optional: true,
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
      phone: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.PHONE_MUST_BE_A_STRING
        },
        isLength: {
          options: { min: 10, max: 10 },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.PHONE_LENGTH_MUST_BE_10_CHARACTER
        },
        matches: {
          options: /^[0-9]+$/,
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.PHONE_LENGTH_MUST_BE_STRING_NUMBER
        }
      },
      date_of_birth: {
        optional: true,
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.DATE_OF_BIRTH_IS_ISO8601
        }
      },
      bio: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.BIO_MUST_BE_STRING
        },
        isLength: {
          options: {
            max: 150
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.BIO_MAX_LENGTH_IS_150
        }
      },
      address: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.FULL_NAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            max: 255
          },
          errorMessage: VALIDATION_MESSAGES.USER.USER_PROFILE.USER_NAME_LENGTH_MUST_BE_FROM_4_TO_20
        }
      }
    },
    ['body']
  )
)

export const getUsersByRoleValidator = validate(
  checkSchema(
    {
      includes: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.USER.GET_USERS_BY_ROLE.ROLE_IS_REQUIRED
        },
        custom: {
          options: (value: string) => {
            if (!Object.values(UserRole).includes((value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()) as UserRole)) {
              throw new Error(VALIDATION_MESSAGES.USER.GET_USERS_BY_ROLE.ROLE_IS_INVALID)
            }
            return true
          }
        }
      }
    },
    ['query']
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
              throw Error(VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)
            }
            const user = await userServices.getUserByID(new ObjectId(value))
            if (!user) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST })
            }
            if (value === req.user._id) {
              throw Error(VALIDATION_MESSAGES.USER.FAVORITE.FRIEND_ID_NOT_USER_ID)
            }
            const isExist = await userServices.isExitInCloseFriends(new ObjectId(req.user._id), new ObjectId(value))
            if (isExist) {
              throw Error(VALIDATION_MESSAGES.USER.FAVORITE.FRIEND_ID_IS_EXIT)
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
              throw Error(VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)
            }
            const user = await userServices.isExitInCloseFriends(new ObjectId(req.user._id), new ObjectId(value))
            if (!user) {
              throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.USER.FAVORITE.FAVORITE_NOT_EXIT })
            }
            if (value === req.user._id) {
              throw Error(VALIDATION_MESSAGES.USER.FAVORITE.FRIEND_ID_NOT_USER_ID)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
