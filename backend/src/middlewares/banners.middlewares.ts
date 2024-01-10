import { checkSchema } from 'express-validator'
import { VALIDATION_MESSAGES } from '~/constants/message'
import validate, { validateObjectId } from '~/utils/validate'

export const checkParamValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: VALIDATION_MESSAGES.BANNER.ID_IS_REQUIRED
        },
        custom: {
          options: async (value: string) => {
            validateObjectId(value, VALIDATION_MESSAGES.BANNER.INVALID_ID)
            return true
          }
        }
      }
    },
    ['params']
  )
)
