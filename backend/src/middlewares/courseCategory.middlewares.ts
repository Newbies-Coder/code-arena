import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateSlug } from '~/utils/helper'
import validate, { validateObjectId } from '~/utils/validate'

export const createCourseCategoryValidator = validate(
  checkSchema({
    name: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 4,
          max: 30
        },
        errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_LENGTH_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const slug = generateSlug(value)

          const result = await databaseService.course_category.findOne({ slug })
          if (!!result) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_EXIST,
              statusCode: StatusCodes.CONFLICT
            })
          }

          return true
        }
      }
    }
  })
)

export const updateCourseCategoryValidator = validate(
  checkSchema({
    name: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 4,
          max: 30
        },
        errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_LENGTH_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const slug = generateSlug(value)

          const result = await databaseService.course_category.findOne({ slug })
          if (!!result) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NAME_EXIST,
              statusCode: StatusCodes.CONFLICT
            })
          }

          return true
        }
      }
    }
  })
)

export const checkParamValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_ID_IS_REQUIRED
        },
        custom: {
          options: async (value: string) => {
            validateObjectId(value, VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_ID_IS_INVALID)
            return true
          }
        }
      }
    },
    ['params']
  )
)
