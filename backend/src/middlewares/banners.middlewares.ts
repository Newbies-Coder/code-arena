import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import userServices from '~/services/users.service'
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

export const getBannersWithUserIdValidator = validate(
  checkSchema(
    {
      userId: {
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
              throw new Error(VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)
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
    ['query']
  )
)
