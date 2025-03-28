import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { UserRole } from '~/constants/enums'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { databaseService } from '~/services/connectDB.service'
import validate from '~/utils/validate'

export const paginationValidator = validate(
  checkSchema({
    page: {
      trim: true,
      isInt: {
        options: {
          min: 1
        },
        errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
      }
    },
    limit: {
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

export const paginationUserValidators = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
        },
        toInt: true
      },
      userId: {
        trim: true,
        optional: { options: { nullable: true } },
        isMongoId: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID
        },
        custom: {
          options: async (value) => {
            const user = await databaseService.users.findOne({ _id: new ObjectId(value) })
            if (user === null) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.CONFLICT,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
              })
            }
            return true
          }
        }
      },
      sort_by: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true
      },
      created_at: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true,
        custom: {
          options: (value) => ['asc', 'desc'].includes(value.toLowerCase()),
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.INVALID_SORT_ORDER_CREATED_AT
        }
      }
    },
    ['query']
  )
)

export const paginationBlockedUserValidators = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
        },
        toInt: true
      },
      created_at: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true,
        custom: {
          options: (value) => ['asc', 'desc'].includes(value.toLowerCase()),
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.INVALID_SORT_ORDER_CREATED_AT
        }
      }
    },
    ['query']
  )
)

export const paginationUserFavoriteValidators = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
        },
        toInt: true
      },
      created_at: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true,
        custom: {
          options: (value) => ['asc', 'desc'].includes(value.toLowerCase()),
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.INVALID_SORT_ORDER_CREATED_AT
        }
      }
    },
    ['query']
  )
)

export const paginationBannerValidators = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
        },
        toInt: true
      },
      bannerId: {
        trim: true,
        optional: { options: { nullable: true } },
        isMongoId: {
          errorMessage: VALIDATION_MESSAGES.BANNER.BANNER_ID_INVALID
        },
        custom: {
          options: async (value) => {
            const banner = await databaseService.banners.findOne({ _id: new ObjectId(value) })
            if (!banner) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.CONFLICT,
                message: VALIDATION_MESSAGES.BANNER.BANNER_NOT_FOUND
              })
            }
            return true
          }
        }
      },
      sort_by: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true
      },
      sort_order: {
        trim: true,
        optional: { options: { nullable: true } },
        isString: true,
        custom: {
          options: (value) => ['asc', 'desc'].includes(value.toLowerCase()),
          errorMessage: VALIDATION_MESSAGES.BANNER.INVALID_SORT_ORDER
        }
      }
    },
    ['query']
  )
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

export const paginationGetUsersByRoleValidator = validate(
  checkSchema(
    {
      page: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
        },
        toInt: true
      },
      limit: {
        trim: true,
        optional: { options: { nullable: true } },
        isInt: {
          options: { min: 1, max: 100 },
          errorMessage: VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
        },
        toInt: true
      },
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
