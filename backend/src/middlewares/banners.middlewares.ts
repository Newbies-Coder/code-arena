import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { isValidImageUrl, isValidMulName } from '~/utils/helper'
import validate, { validateObjectId } from '~/utils/validate'

export const insertBannerValidators = validate(
  checkSchema(
    {
      slug: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.BANNER.SLUG_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.BANNER.SLUG_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 10,
            max: 50
          },
          errorMessage: VALIDATION_MESSAGES.BANNER.SLUG_LENGTH_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value) => {
            const checkMulWhitespace = isValidMulName(value)
            if (!checkMulWhitespace) {
              throw new Error(VALIDATION_MESSAGES.BANNER.SLUG_INCLUDES_MUL_WHITESPACE)
            }
            return true
          }
        }
      },
      description: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.BANNER.DESCRIPTION_MUST_BE_STRING
        },
        isLength: {
          options: {
            min: 0,
            max: 500
          },
          errorMessage: VALIDATION_MESSAGES.BANNER.DESCRIPTION_LENGTH_IS_INVALID
        },
        optional: true
      },
      url: {
        trim: true,
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.BANNER.URL_IS_REQUIRED
        },
        isString: {
          errorMessage: VALIDATION_MESSAGES.BANNER.URL_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isValidAvatar = isValidImageUrl(value)
            if (!isValidAvatar) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.BANNER.VALID_URL_IMAGE
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

export const checkParamValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.BANNER.BANNER_ID_IS_REQUIRED
        },
        custom: {
          options: async (value: string) => {
            validateObjectId(value, VALIDATION_MESSAGES.BANNER.BANNER_ID_INVALID)
            return true
          }
        }
      }
    },
    ['params']
  )
)
