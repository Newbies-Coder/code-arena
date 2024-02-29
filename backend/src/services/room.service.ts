import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { PaginationType, ParsedGetAllMessageUrlQuery, ParsedGetAllRoomUrlQuery } from '~/@types/reponse.type'
import { env } from '~/config/environment.config'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { io } from '~/main'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import {
  BanMemberBody,
  CreateInviteBody,
  CreateMessageBody,
  CreateRoomBody,
  DismissMessageBody,
  KickMemberBody,
  MakeRoomPrivateBody,
  PinMessageBody,
  UpdateRoomBody
} from '~/models/requests/Room.request'
import BannedMember from '~/models/schemas/BannedMember.schema'
import Invitation from '~/models/schemas/Invitation.schema'
import Member from '~/models/schemas/Member.schema'
import Message from '~/models/schemas/Message.schema'
import Room from '~/models/schemas/Room.schema'
import cloudinaryService from '~/services/cloudinary.service'
import { databaseService } from '~/services/connectDB.service'
import { hashRoomPassword } from '~/utils/crypto'

class RoomService {
  private async removeMember(roomId: ObjectId, memberId: ObjectId) {
    console.log({ roomId, memberId })
    await databaseService.members.deleteOne({ roomId, memberId })
  }

  async getRooms(memberId: ObjectId, payload: ParsedGetAllRoomUrlQuery): Promise<PaginationType<Room>> {
    const page = Number(payload.page) || 1
    const limit = Number(payload.limit) || 10
    const skipCount = (page - 1) * limit

    const rooms = await databaseService.members.find({ memberId: new ObjectId(memberId) }).toArray()

    const result = await databaseService.rooms
      .find({
        _id: { $in: rooms.map(({ roomId }) => new ObjectId(roomId)) }
      })
      .skip(skipCount)
      .limit(limit)
      .toArray()

    const total_items = result.length ? result.length : 0
    const total_pages = Math.floor((total_items + limit - 1) / limit)

    const content: PaginationType<Room> = {
      items: result,
      page,
      limit,
      total_pages,
      total_items
    }

    return content
  }

  async createRoom(userId: ObjectId, { type, name, members }: CreateRoomBody) {
    const room = new Room({
      name,
      type,
      // Single (direct chat) room can not have an owner
      owner: type === 'multiple' ? userId : undefined,
      isPrivate: false,
      isDeleted: false,
      updated_at: new Date(),
      created_at: new Date()
    })

    const result = await databaseService.rooms.insertOne(room)

    const roomMembers = [...members, userId].map(
      (memberId) =>
        new Member({
          memberId: new ObjectId(memberId),
          roomId: result.insertedId
        })
    )

    databaseService.members.insertMany(roomMembers)
  }

  async updateRoom(userId: ObjectId, id: ObjectId, { name }: UpdateRoomBody) {
    await databaseService.rooms.updateOne(
      { _id: new ObjectId(id), owner: userId },
      {
        $set: {
          name,
          updated_at: new Date()
        }
      }
    )
  }

  async deleteRoom(userId: ObjectId, id: ObjectId) {
    await databaseService.rooms.deleteOne({ _id: id, owner: userId })
    await databaseService.messages.deleteMany({ _id: id })
  }

  async makeRoomPrivate(id: ObjectId, { password }: MakeRoomPrivateBody) {
    await databaseService.rooms.updateOne(
      { _id: id },
      {
        $set: {
          isPrivate: true,
          password: hashRoomPassword(password),
          updated_at: new Date()
        }
      }
    )
  }

  async createInvite(userId: ObjectId, roomId: ObjectId, payload: CreateInviteBody) {
    await databaseService.invites.insertOne(
      new Invitation({
        sender: userId,
        room: roomId,
        recipient: new ObjectId(payload.recipient),
        status: 'pending'
      })
    )
  }

  async banMember(roomId: ObjectId, payload: BanMemberBody) {
    await databaseService.bannedMembers.insertOne(
      new BannedMember({
        room: roomId,
        user: new ObjectId(payload.memberId),
        dueTo: new Date(payload.due_to)
      })
    )
    await this.removeMember(roomId, new ObjectId(payload.memberId))
  }

  async kickMember(roomId: ObjectId, payload: KickMemberBody) {
    await this.removeMember(roomId, new ObjectId(payload.memberId))
  }

  async getMessages(roomId: ObjectId, payload: ParsedGetAllMessageUrlQuery): Promise<PaginationType<Message>> {
    const page = Number(payload.page) || 1
    const limit = Number(payload.limit) || 10
    const skipCount = (page - 1) * limit

    const result = await databaseService.messages.find({ room: roomId }).skip(skipCount).limit(limit).toArray()

    const total_items = result.length ? result.length : 0
    const total_pages = Math.floor((total_items + limit - 1) / limit)

    const content: PaginationType<Message> = {
      items: result,
      page,
      limit,
      total_pages,
      total_items
    }

    return content
  }

  async pinMessage(roomId: ObjectId, messageId: ObjectId) {
    await databaseService.rooms.updateOne(
      { _id: roomId },
      {
        $set: {
          pinnedMessage: new ObjectId(messageId),
          updated_at: new Date()
        }
      }
    )
  }

  async createMessage(userId: ObjectId, roomId: ObjectId, { content, attachments }: CreateMessageBody) {
    if (!content && !attachments) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.BAD_REQUEST,
        message: VALIDATION_MESSAGES.MESSAGE.MESSAGE_IS_EMPTY
      })
    }

    const message = new Message({
      sender: new ObjectId(userId),
      room: roomId,
      content,
      attachments
    })

    await databaseService.messages.insertOne(message)

    io.to(roomId.toString()).emit('message', message)
  }

  async deleteMessage(messageId: ObjectId) {
    await databaseService.messages.deleteOne({ _id: messageId })
  }

  async dismissMessage(userId: ObjectId, roomId: ObjectId, payload: DismissMessageBody) {
    await databaseService.members.updateOne(
      { _id: roomId, memberId: userId },
      {
        $set: {
          suppressNotificationTime: new Date(payload.due_to),
          updated_at: new Date()
        }
      },
      { upsert: false }
    )
  }
  async changeAvatar(roomId: ObjectId, file: Express.Multer.File) {
    const room = await databaseService.rooms.findOne({ _id: roomId })
    if (room.avatar) {
      await cloudinaryService.deleteImage(room.avatar)
    }

    const { url } = await cloudinaryService.uploadImage(env.cloudinary.room_avatar_folder, file.buffer)
    await databaseService.rooms.updateOne({ _id: room }, { $set: { avatar: url } })
  }
  async changeBackground(roomId: ObjectId, file: Express.Multer.File) {
    const room = await databaseService.rooms.findOne({ _id: roomId })
    if (room.background) {
      await cloudinaryService.deleteImage(room.background)
    }

    const { url } = await cloudinaryService.uploadImage(env.cloudinary.room_background_folder, file.buffer)
    await databaseService.rooms.updateOne({ _id: room }, { $set: { background: url } })
  }
}

const roomService = new RoomService()

export default roomService
