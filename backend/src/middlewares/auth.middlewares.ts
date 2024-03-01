import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { env } from '~/config/environment.config'
import { UserRole } from '~/constants/enums'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import userServices from '~/services/users.service'
import {
  checkUserRole,
  checkVerifyStatus,
  containsNewline,
  isValidDateOfBirth,
  isValidGender,
  isValidMulName,
  isValidNameCharater,
  isValidPassword,
  validateEmail,
  validatePhone
} from '~/utils/helper'
import { verifyToken } from '~/utils/jwt'
import validate from '~/utils/validate'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.get('Authorization')
  if (!bearer) {
    return next()
  }

  const tokens = bearer.split(' ')
  if (tokens.length !== 2) {
    throw new ErrorWithStatus({
      message: VALIDATION_MESSAGES.TOKEN.INVALID_BEARER_TOKEN,
      statusCode: StatusCodes.UNAUTHORIZED
    })
  }

  const access_token = tokens[1]
  try {
    const user = await verifyToken({
      token: access_token,
      secretOrPublicKey: env.jwt.secret_key
    })

    req.user = user
    return next()
  } catch (error) {
    throw new ErrorWithStatus({ statusCode: StatusCodes.UNAUTHORIZED, message: error.message })
  }
}

export const requireLoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  await authMiddleware(req, res, async () => {
    if (!req.user) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
      })
    }
    return next()
  })
}

export const requireRoleMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await requireLoginMiddleware(req, res, async () => {
      if (!roles.includes(req.user.role)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.UNAUTHORIZED,
          message: VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_ROLE_NOT_SATISFIED
        })
      }
      return next()
    })
  }
}

export const createUserByAdminValidator = validate(
  checkSchema(
    {
      fullName: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.FULL_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.FULL_NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 4,
            max: 50
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.FULL_NAME_MAX_LENGTH_IS_50
        },
        custom: {
          options: async (value) => {
            const checkEnter = containsNewline(value)
            const checkMulWhitespace = isValidMulName(value)
            const checkValidCharater = isValidNameCharater(value)
            if (checkEnter) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_FULLNAME)
            }
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_FULLNAME)
            }
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        }
      },
      username: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 2,
            max: 30
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_LENGTH_MUST_BE_FROM_2_TO_30
        },
        trim: true,
        custom: {
          options: async (value) => {
            const checkEnter = containsNewline(value)
            const checkValidCharater = isValidNameCharater(value)
            const checkMulWhitespace = isValidMulName(value)
            if (checkEnter) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_USERNAME)
            }
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_USERNAME)
            }
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        }
      },
      email: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.EMAIL_IS_REQUIRED
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
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.EMAIL_ACCESSIBILITY
              })
            }
            return true
          }
        }
      },
      role: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ROLE_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ROLE_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            const checkRole = checkUserRole(value)
            if (!checkRole) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ROLE_IS_INVALID
              })
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PASSWORD_MUST_BE_A_STRING
        },
        isStrongPassword: {
          options: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PASSWORD_MUST_BE_A_STRING
        },
        trim: true,
        escape: true,
        isLength: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
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
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PASSWORD_CONTAINS_EMOJI
              })
            }
            return true
          }
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.CONFIRM_PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.CONFIRM_PASSWORD_MUST_BE_A_STRING
        },
        escape: true,
        trim: true,
        custom: {
          options: (value, { req }) => {
            const validPasswordEmoji = isValidPassword(value)
            if (!validPasswordEmoji) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.CONFIRM_PASSWORD_CONTAINS_EMOJI
              })
            }
            if (value !== req.body.password) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD)
            }
            return true
          }
        },
        isLength: {
          options: {
            min: 8,
            max: 16
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16
        }
      },
      phone: {
        optional: true,
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PHONE_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isValidPhone = validatePhone(value)
            if (!isValidPhone) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PHONE_IS_INVALID
              })
            }
            return true
          }
        }
      },
      date_of_birth: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.DATE_OF_BIRTH_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.DATE_OF_BIRTH_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            const validDateOfBirth = isValidDateOfBirth(value)
            if (!validDateOfBirth) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.DATE_OF_BIRTH_ERROR_FORMAT
              })
            }
            return true
          }
        }
      },
      gender: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.GENDER_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const checkGender = isValidGender(value)
            if (!checkGender) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.GENDER_IS_INVALID
              })
            }
            return true
          }
        },
        optional: true
      },
      address: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ADDRESS_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 255
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ADDRESS_LENGTH_IS_VALID
        }
      }
    },
    ['body']
  )
)

export const updateUserByAdminValidator = validate(
  checkSchema(
    {
      fullName: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.FULL_NAME_MUST_BE_A_STRING
        },
        trim: true,
        isLength: {
          options: {
            min: 4,
            max: 50
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.FULL_NAME_MAX_LENGTH_IS_50
        },
        custom: {
          options: async (value) => {
            const checkEnter = containsNewline(value)
            const checkMulWhitespace = isValidMulName(value)
            const checkValidCharater = isValidNameCharater(value)
            if (checkEnter) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_FULLNAME)
            }
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_FULLNAME)
            }
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        }
      },
      username: {
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_MUST_BE_A_STRING
        },
        isLength: {
          options: {
            min: 2,
            max: 30
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_LENGTH_MUST_BE_FROM_2_TO_30
        },
        trim: true,
        custom: {
          options: async (value) => {
            const checkEnter = containsNewline(value)
            const checkValidCharater = isValidNameCharater(value)
            const checkMulWhitespace = isValidMulName(value)
            if (checkEnter) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_USERNAME)
            }
            if (!checkValidCharater) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_USERNAME)
            }
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.ADMIN.CREATE_USER.USERNAME_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        },
        optional: true
      },
      role: {
        trim: true,
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ROLE_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            const checkRole = checkUserRole(value)
            if (!checkRole) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ROLE_IS_INVALID
              })
            }
            return true
          }
        }
      },
      verify: {
        trim: true,
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.VALID_URL_AVATAR
        },
        custom: {
          options: async (value) => {
            const checkRole = checkVerifyStatus(value)
            if (!checkRole) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.INVALID_VERIFY_STATUS
              })
            }
            return true
          }
        }
      },
      phone: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PHONE_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isValidPhone = validatePhone(value)
            if (!isValidPhone) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.PHONE_IS_INVALID
              })
            }
            return true
          }
        },
        optional: true
      },
      date_of_birth: {
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.DATE_OF_BIRTH_MUST_BE_A_STRING
        },
        custom: {
          options: (value: string) => {
            const validDateOfBirth = isValidDateOfBirth(value)
            if (!validDateOfBirth) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.DATE_OF_BIRTH_ERROR_FORMAT
              })
            }
            return true
          }
        },
        optional: true
      },
      gender: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.GENDER_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const checkGender = isValidGender(value)
            if (!checkGender) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ADMIN.CREATE_USER.GENDER_IS_INVALID
              })
            }
            return true
          }
        },
        optional: true
      },
      address: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ADDRESS_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 255
          },
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.ADDRESS_LENGTH_IS_VALID
        }
      },
      bio: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.BIO_MUST_BE_A_STRING
        }
      },
      website: {
        optional: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.ADMIN.CREATE_USER.URL_MUST_BE_A_STRING
        }
      }
    },

    ['body']
  )
)

export const updateUserIdParamValidator = validate(
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
            return true
          }
        }
      }
    },
    ['params']
  )
)
