import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import validate from '~/utils/validate'

export const getBannersValidator = validate(
  checkSchema(
    {
      id: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!ObjectId.isValid(value)) {
              throw new Error(VALIDATION_MESSAGES.BANNER.BANNER_ID_INVALID)
            }

            return true
          }
        }
      }
    },
    ['params']
  )
)

export const getBannersWithUserIdValidator = validate(checkSchema({}, ['query']))
