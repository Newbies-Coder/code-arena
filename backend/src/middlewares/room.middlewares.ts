import { CustomValidator, checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { paginationValidator } from '~/middlewares/commons.middleware'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { attachmentTypes } from '~/models/schemas/Message.schema'
import { roomTypes } from '~/models/schemas/Room.schema'
import { databaseService } from '~/services/connectDB.service'
import { isValidPassword } from '~/utils/helper'
import validate, { validateObjectId } from '~/utils/validate'

export const getRoomsValidator = paginationValidator

export const createRoomValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 2,
          max: 100
        },
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_LENGTH_MUST_BE_FROM_2_TO_100
      },
      trim: true
    },
    type: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_TYPE_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_TYPE_MUST_BE_A_STRING
      },
      custom: {
        options: (value) => {
          if (!roomTypes.includes(value)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_TYPE_IS_INVALID
            })
          }
          return true
        }
      }
    },
    members: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_MEMBERS_IS_REQUIRED
      },
      isArray: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_MEMBERS_MUST_BE_A_ARRAY
      },
      custom: {
        options: async (value: string[], { req }) => {
          if (value.length === 0) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_MEMBERS_IS_REQUIRED
            })
          }

          for (const id of value) {
            validateObjectId(id, VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)

            const user = await databaseService.users.findOne({ _id: new ObjectId(id) })

            if (!user) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.NOT_FOUND,
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
              })
            }
          }

          if (req.body.type === 'single') {
            if (value.length !== 1) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.BAD_REQUEST,
                message: VALIDATION_MESSAGES.ROOM.SINGLE_ROOM_MUST_HAVE_2_MEMBER
              })
            }
          }

          if (value.includes(req.user._id.toString())) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.OWNER_CAN_NOT_BE_MEMBER
            })
          }

          return true
        }
      }
    }
  })
)

export const updateRoomValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.type === 'multiple') {
            if (room.owner !== req.user._id) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
              })
            }
          } else {
            if (!room.members.some((item) => item.memberId === req.user._id)) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
              })
            }
          }
          return true
        }
      }
    },
    name: {
      optional: true,
      isString: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_MUST_BE_A_STRING
      },
      isLength: {
        options: {
          min: 2,
          max: 100
        },
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_LENGTH_MUST_BE_FROM_2_TO_100
      },
      trim: true
    },
    avatar: {
      optional: true,
      isURL: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_AVATAR_IS_NOT_VALID_URL
      }
    },
    background: {
      optional: true,
      isURL: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_BACKGROUND_IS_NOT_VALID_URL
      }
    },
    emote: {
      optional: true,
      isURL: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_EMOTE_IS_NOT_VALID_URL
      }
    }
  })
)

export const deleteRoomValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.type === 'multiple') {
            if (room.owner !== req.user._id) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
              })
            }
          } else {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_DELETE_SINGLE_ROOM
            })
          }

          return true
        }
      }
    }
  })
)

export const createInviteValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const user = await databaseService.users.findOne({ _id: value })

          if (!user) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
            })
          }

          return true
        }
      }
    },
    recipient: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.INVITE_RECIPIENT_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(req.params.id) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.members.some((item) => item.memberId === new ObjectId(req.params.id))) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_ALREADY_IN_ROOM
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_CREATE_INVITATION_ON_SINGLE_ROOM
            })
          }

          return true
        }
      }
    }
  })
)

export const banMemberValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_BAN_MEMBER_ON_SINGLE_ROOM
            })
          }

          if (room.owner !== req.user._id) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
            })
          }

          return true
        }
      }
    },
    memberId: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)

          const user = await databaseService.users.findOne({ _id: value })

          if (!user) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
            })
          }

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(req.params.id) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.members.some((item) => item.memberId === user._id)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.MEMBER_NOT_FOUND
            })
          }

          return true
        }
      }
    },
    due_to: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.DUE_TO_IS_REQUIRED
      },
      isISO8601: {
        errorMessage: VALIDATION_MESSAGES.ROOM.DUE_TO_DATE_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const due_to = new Date(value)
          if (due_to.getTime() < Date.now()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.DUE_TO_DATE_CANNOT_BEFORE_NOW
            })
          }

          return true
        }
      }
    }
  })
)

export const kickMemberValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_KICK_MEMBER_ON_SINGLE_ROOM
            })
          }

          if (room.owner !== req.user._id) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
            })
          }

          return true
        }
      }
    },
    memberId: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_CAN_NOT_BE_EMPTY
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID)

          const user = await databaseService.users.findOne({ _id: value })

          if (!user) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
            })
          }

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(req.params.id) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.members.some((item) => item.memberId === user._id)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.MEMBER_NOT_FOUND
            })
          }

          return true
        }
      }
    }
  })
)

export const makeRoomPrivateValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_MAKE_ROOM_PRIVATE_ON_SINGLE_ROOM
            })
          }

          if (room.isPrivate) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_ALREADY_PRIVATE
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
        errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_MUST_BE_A_STRING
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
          const validPasswordEmoji = isValidPassword(value)
          if (!validPasswordEmoji) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_CONTAINS_EMOJI
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
          const validPasswordEmoji = isValidPassword(value)
          if (!validPasswordEmoji) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.USER.PASSWORD.CONFIRM_PASSWORD_CONTAINS_EMOJI
            })
          }
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
    }
  })
)

export const pinMessageValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })
          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          return true
        }
      }
    },
    messageId: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_ID_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.MESSAGE.MESSAGE_ID_IS_INVALID)

          const message = await databaseService.messages.findOne({ _id: value })

          if (!message) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.MESSAGE.MESSAGE_WITH_ID_IS_NOT_EXIST
            })
          }

          return true
        }
      }
    }
  })
)

export const getMessageValidator = paginationValidator

export const createMessageValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })
          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          return true
        }
      }
    },
    content: {
      optional: true,
      isString: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.CONTENT_MUST_BE_A_STRING
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 1024
        },
        errorMessage: VALIDATION_MESSAGES.MESSAGE.CONTENT_LENGTH_MUST_BE_FROM_1_TO_1024
      }
    },
    attachments: {
      optional: true,
      isArray: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.ATTACHMENTS_MUST_BE_ARRAY
      }
    },
    'attachments.*.type': {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.ATTACHMENT_TYPE_IS_REQUIRED
      },
      isIn: {
        options: attachmentTypes,
        errorMessage: VALIDATION_MESSAGES.MESSAGE.INVALID_ATTACHMENT_TYPE
      }
    },
    'attachments.*.content': {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.ATTACHMENT_CONTENT_IS_REQUIRED
      },
      isURL: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.ATTACHMENT_CONTENT_IS_NOT_VALID_URL
      }
    }
  })
)

export const deleteMessageValidator = validate(
  checkSchema({
    messageId: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.MESSAGE.MESSAGE_ID_IS_INVALID)

          const message = await databaseService.messages.findOne({ _id: value })

          if (message.sender !== req.user._id) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.MESSAGE.MESSAGE_NOT_OWN
            })
          }

          return true
        }
      }
    }
  })
)

export const dismissMessageValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })
          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          console.log(room.members)
          console.log(req.user)

          if (!room.members.some((item) => item.memberId === req.user._id.toString())) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
            })
          }

          return true
        }
      }
    },
    due_to: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.DUE_TO_IS_REQUIRED
      },
      isISO8601: {
        errorMessage: VALIDATION_MESSAGES.ROOM.DUE_TO_DATE_IS_INVALID
      },
      custom: {
        options: async (value) => {
          const due_to = new Date(value)
          if (due_to.getTime() < Date.now()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.DUE_TO_DATE_CANNOT_BEFORE_NOW
            })
          }

          return true
        }
      }
    }
  })
)
