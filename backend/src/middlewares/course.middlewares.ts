import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateSlug } from '~/utils/helper'
import validate, { validateObjectId } from '~/utils/validate'

export const createCourseValidator = validate(
  checkSchema({
    name: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 4,
          max: 30
        },
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_NAME_LENGTH_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const slug = generateSlug(value)

          const result = await databaseService.courses.findOne({ slug })
          if (!!result) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.COURSE.COURSE_NAME_EXIST,
              statusCode: StatusCodes.CONFLICT
            })
          }

          return true
        }
      }
    },
    content: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CONTENT_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CONTENT_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 4,
          max: 30
        },
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CONTENT_LENGTH_IS_INVALID
      }
    },
    category: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CATEGORY_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CATEGORY_MUST_BE_A_STRING
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_ID_IS_INVALID)
          const result = await databaseService.course_category.findOne({ _id: new ObjectId(value) })

          if (!result) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NOT_FOUND,
              statusCode: StatusCodes.NOT_FOUND
            })
          }

          return true
        }
      }
    }
  })
)

export const updateCourseValidator = validate(
  checkSchema({
    name: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 4,
          max: 30
        },
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_NAME_LENGTH_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const slug = generateSlug(value)

          const result = await databaseService.courses.findOne({ slug })
          if (!!result) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.COURSE.COURSE_NAME_EXIST,
              statusCode: StatusCodes.CONFLICT
            })
          }

          return true
        }
      }
    },
    content: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CONTENT_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CONTENT_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 4,
          max: 30
        },
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CONTENT_LENGTH_IS_INVALID
      }
    },
    category: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CATEGORY_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.COURSE.COURSE_CATEGORY_MUST_BE_A_STRING
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_ID_IS_INVALID)
          const result = await databaseService.course_category.findOne({ _id: new ObjectId(value) })

          if (!result) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NOT_FOUND,
              statusCode: StatusCodes.NOT_FOUND
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
