import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { paginationValidator } from '~/middlewares/commons.middleware'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { attachmentTypes, emotes } from '~/models/schemas/Message.schema'
import { roomTypes } from '~/models/schemas/Room.schema'
import { databaseService } from '~/services/connectDB.service'
import { containsNewline, isValidPassword } from '~/utils/helper'
import validate, { validateObjectId } from '~/utils/validate'

export const getRoomsValidator = paginationValidator

export const createRoomValidator = validate(
  checkSchema({
    name: {
      trim: true,
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_MUST_BE_A_STRING
      },
      custom: {
        options: (value) => {
          if (containsNewline(value)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_NAME_CAN_NOT_CONTAIN_NEWLINE
            })
          }
          return true
        }
      },
      isLength: {
        options: {
          min: 1,
          max: 20
        },
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_LENGTH_MUST_BE_FROM_1_TO_20
      }
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

          if (value.length !== new Set(value).size) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_MEMBERS_IS_NOT_UNIQUE
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
            } else {
              if (value.length < 2) {
                throw new ErrorWithStatus({
                  statusCode: StatusCodes.BAD_REQUEST,
                  message: VALIDATION_MESSAGES.ROOM.ROOM_NEED_AT_LEAST_3_MEMBERS
                })
              }
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'multiple') {
            if (room.owner.toString() !== req.user._id.toString()) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
              })
            }
          } else {
            const member = await databaseService.members.findOne({ memberId: new ObjectId(req.user._id), roomId: new ObjectId(value) })

            if (!member) {
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
          min: 1,
          max: 20
        },
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_NAME_LENGTH_MUST_BE_FROM_1_TO_20
      },
      trim: true,
      custom: {
        options: (value) => {
          if (containsNewline(value)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_NAME_CAN_NOT_CONTAIN_NEWLINE
            })
          }
          return true
        }
      }
    },
    emote: {
      optional: true,
      isString: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_EMOTE_MUST_BE_A_STRING
      },
      trim: true,
      matches: {
        options: /\p{Emoji}/gu,
        errorMessage: VALIDATION_MESSAGES.ROOM.EMOTE_MUST_BE_AN_EMOJI
      },
      isLength: { options: { min: 1, max: 1 }, errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_EMOTE_MUST_BE_1_CHARACTER },
      custom: {
        options: (value) => {
          if (containsNewline(value)) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.ROOM.ROOM_EMOTE_CAN_NOT_CONTAIN_NEW_LINE_CHARACTER,
              statusCode: StatusCodes.BAD_REQUEST
            })
          }
        }
      }
    }
  })
)

export const changeRoomAvatarValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'multiple') {
            if (room.owner.toString() !== req.user._id.toString()) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
              })
            }
          }

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.UNAUTHORIZED,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
            })
          }

          return true
        }
      }
    }
  })
)

export const changeRoomBackgroundValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'multiple') {
            if (room.owner.toString() !== req.user._id.toString()) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.FORBIDDEN,
                message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
              })
            }
          }

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.UNAUTHORIZED,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
            })
          }

          return true
        }
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'multiple') {
            if (room.owner.toString() !== req.user._id.toString()) {
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
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_CREATE_INVITATION_ON_SINGLE_ROOM
            })
          }

          const selfMember = await databaseService.members.findOne({ roomId: room._id, memberId: new ObjectId(req.user._id) })

          if (!selfMember) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
            })
          }

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
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

          const user = await databaseService.users.findOne({ _id: new ObjectId(value) })

          if (!user) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
            })
          }

          const member = await databaseService.members.findOne({ roomId: new ObjectId(req.params.id), memberId: new ObjectId(value) })

          if (member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_ALREADY_IN_ROOM
            })
          }

          const bannedMember = await databaseService.bannedMembers.findOne({ roomId: new ObjectId(req.params.id), memberId: new ObjectId(value) })

          if (bannedMember) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_IS_BANNED_FROM_ROOM
            })
          }

          const invite = await databaseService.invites.findOne({ room: new ObjectId(req.params.id), recipient: new ObjectId(value) })

          if (invite) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITE_ALREADY_SENT
            })
          }

          return true
        }
      }
    }
  })
)

export const getRoomMemberValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ roomId: new ObjectId(value), memberId: new ObjectId(req.user._id) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_BAN_MEMBER_ON_SINGLE_ROOM
            })
          }

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
            })
          }

          if (room.owner.toString() === req.body.memberId.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_BAN_OWNER
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

          const user = await databaseService.users.findOne({ _id: new ObjectId(value) })

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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ roomId: new ObjectId(req.params.id), memberId: new ObjectId(req.user._id) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.MEMBER_NOT_FOUND
            })
          }

          const bannedMember = await databaseService.bannedMembers.findOne({ room: new ObjectId(req.params.id), user: new ObjectId(value) })

          if (bannedMember) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_IS_BANNED_FROM_ROOM
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_KICK_MEMBER_ON_SINGLE_ROOM
            })
          }

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
            })
          }

          if (room.owner.toString() === req.body.memberId.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_KICK_OWNER
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

          const user = await databaseService.users.findOne({ _id: new ObjectId(value) })

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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ roomId: new ObjectId(req.params.id), memberId: new ObjectId(value) })

          if (!member) {
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
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
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

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.UNAUTHORIZED,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
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
      trim: true,
      escape: true,
      isLength: {
        errorMessage: VALIDATION_MESSAGES.USER.PASSWORD.PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16,
        options: {
          min: 4,
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
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })

          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          if (room.owner.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.UNAUTHORIZED,
              message: VALIDATION_MESSAGES.ROOM.NOT_OWNER
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
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.MESSAGE.MESSAGE_ID_IS_INVALID)

          const message = await databaseService.messages.findOne({ _id: new ObjectId(value), room: new ObjectId(req.params.id) })

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

export const getMessageValidator = validate(
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
    },
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ roomId: new ObjectId(value), memberId: new ObjectId(req.user._id) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
            })
          }

          return true
        }
      }
    }
  })
)

export const createMessageValidator = validate(
  checkSchema({
    id: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.ROOM.ROOM_ID_IS_INVALID)

          if (containsNewline(value)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.MESSAGE.MESSAGE_CAN_NOT_CONTAIN_NEW_LINE_CHARACTER
            })
          }

          const room = await databaseService.rooms.findOne({ _id: new ObjectId(value) })
          if (!room) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.ROOM.ROOM_WITH_ID_IS_NOT_EXIST
            })
          }

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ roomId: new ObjectId(value), memberId: new ObjectId(req.user._id) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.FORBIDDEN,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
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
      custom: {
        options: (value) => {
          if (!attachmentTypes.includes(value)) {
            throw new ErrorWithStatus({
              message: VALIDATION_MESSAGES.MESSAGE.INVALID_ATTACHMENT_TYPE,
              statusCode: StatusCodes.BAD_REQUEST
            })
          }
          return true
        }
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

          const message = await databaseService.messages.findOne({ _id: new ObjectId(value) })

          if (!message) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.MESSAGE.MESSAGE_NOT_FOUND
            })
          }

          if (message.sender.toString() !== req.user._id.toString()) {
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ memberId: new ObjectId(req.user._id), roomId: new ObjectId(value) })

          if (!member) {
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
      toDate: true,
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

export const leaveRoomValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ memberId: new ObjectId(req.user._id), roomId: new ObjectId(value) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
            })
          }

          if (room.type === 'single') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.CAN_NOT_LEAVE_SINGLE_ROOM
            })
          }

          return true
        }
      }
    }
  })
)

export const acceptInvitationValidator = validate(
  checkSchema({
    inviteId: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.INVITATION.INVITE_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.INVITATION.INVITE_ID_IS_INVALID)

          const invitation = await databaseService.invites.findOne({
            _id: new ObjectId(value)
          })

          if (!invitation) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_NOT_FOUND
            })
          }

          if (invitation.recipient.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_NOT_OWN
            })
          }

          if (invitation.status === 'accepted') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_IS_ACCEPTED
            })
          }

          if (invitation.status === 'rejected') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_IS_REJECTED
            })
          }

          return true
        }
      }
    }
  })
)
export const rejectInvitationValidator = validate(
  checkSchema({
    inviteId: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.INVITATION.INVITE_ID_IS_REQUIRED
      },
      custom: {
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.INVITATION.INVITE_ID_IS_INVALID)

          const invitation = await databaseService.invites.findOne({
            _id: new ObjectId(value)
          })

          if (!invitation) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_NOT_FOUND
            })
          }

          if (invitation.recipient.toString() !== req.user._id.toString()) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_NOT_OWN
            })
          }

          if (invitation.status === 'accepted') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_IS_ACCEPTED
            })
          }

          if (invitation.status === 'rejected') {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.INVITATION.INVITATION_IS_REJECTED
            })
          }

          return true
        }
      }
    }
  })
)

export const reactMessageValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ memberId: new ObjectId(req.user._id), roomId: new ObjectId(value) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
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
        options: async (value, { req }) => {
          validateObjectId(value, VALIDATION_MESSAGES.MESSAGE.MESSAGE_ID_IS_INVALID)

          const message = await databaseService.messages.findOne({ _id: new ObjectId(value), room: new ObjectId(req.params.id) })

          if (!message) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.NOT_FOUND,
              message: VALIDATION_MESSAGES.MESSAGE.MESSAGE_WITH_ID_IS_NOT_EXIST
            })
          }

          return true
        }
      }
    },
    emote: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.EMOTE_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.EMOTE_MUST_BE_STRING
      },
      custom: {
        options: async (value) => {
          if (!emotes.includes(value)) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.MESSAGE.EMOTE_IS_INVALID
            })
          }
          return true
        }
      }
    }
  })
)

export const changeNicknameValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ memberId: new ObjectId(req.user._id), roomId: new ObjectId(value) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
            })
          }

          return true
        }
      }
    },
    nickname: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MEMBER.NICKNAME_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.MEMBER.NICKNAME_MUST_BE_STRING
      },
      isLength: {
        errorMessage: VALIDATION_MESSAGES.MEMBER.NICKNAME_LENGTH_MUST_FROM_1_TO_20,
        options: {
          min: 1,
          max: 20
        }
      }
    }
  })
)

export const searchMessageValidator = validate(
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

          if (room.isDeleted) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.ROOM_IS_DELETED
            })
          }

          const member = await databaseService.members.findOne({ memberId: new ObjectId(req.user._id), roomId: new ObjectId(value) })

          if (!member) {
            throw new ErrorWithStatus({
              statusCode: StatusCodes.BAD_REQUEST,
              message: VALIDATION_MESSAGES.ROOM.USER_NOT_IN_ROOM
            })
          }

          return true
        }
      }
    },
    query: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_IS_REQUIRED
      },
      isString: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_MUST_BE_STRING
      },
      isLength: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_LENGTH_MUST_GREATER_THAN_2_AND_LESS_THAN_100,
        options: {
          min: 2,
          max: 100
        }
      }
    },
    index: {
      notEmpty: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_INDEX_IS_REQUIRED
      },
      isInt: {
        errorMessage: VALIDATION_MESSAGES.MESSAGE.MESSAGE_INDEX_MUST_BE_INTEGER,
        options: {
          min: 0
        }
      }
    }
  })
)
