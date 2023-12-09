import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import validate from '~/utils/validate'

export const paginationValidator = validate(
  checkSchema({
    pageIndex: {
      trim: true,
      isInt: {
        options: {
          min: 1
        },
        errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
      }
    },
    pageSize: {
      trim: true,
      isInt: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
      }
    }
  })
)

export const objectIdValidator = validate(
  checkSchema(
    {
      id: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
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
