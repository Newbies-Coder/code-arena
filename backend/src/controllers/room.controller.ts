import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import { ParsedUrlQuery } from 'querystring'
import roomService from '~/services/room.service'
import {
  BanMemberBody,
  ChangeNicknameBody,
  CreateInviteBody,
  CreateMessageBody,
  CreateRoomBody,
  DismissMessageBody,
  KickMemberBody,
  MakeRoomPrivateBody,
  PinMessageBody,
  ReactMessageBody,
  UpdateRoomBody
} from '~/models/requests/Room.request'
import { ObjectId } from 'mongodb'
import { ParsedSearchMessageUrlQuery } from '~/@types/reponse.type'

const roomController = {
  getRoom: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.getRooms(new ObjectId(req.user._id), req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.GET_ALL)
  },
  createRoom: async (req: Request<ParamsDictionary, any, CreateRoomBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.createRoom(new ObjectId(req.user._id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CREATE)
  },
  updateRoom: async (req: Request<ParamsDictionary, any, UpdateRoomBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.updateRoom(new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.UPDATE)
  },
  deleteRoom: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.deleteRoom(new ObjectId(req.params.id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.DELETE)
  },
  makeRoomPrivate: async (req: Request<ParamsDictionary, any, MakeRoomPrivateBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.makeRoomPrivate(new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.MAKE_PRIVATE)
  },
  getInvite: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.getInvite(new ObjectId(req.user._id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.GET_INVITE)
  },
  createInvite: async (req: Request<ParamsDictionary, any, CreateInviteBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.createInvite(new ObjectId(req.user._id), new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CREATE_INVITE)
  },
  getMessage: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.getMessages(new ObjectId(req.params.id), req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.GET_MESSAGE)
  },
  createMessage: async (req: Request<ParamsDictionary, any, CreateMessageBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.createMessage(new ObjectId(req.user._id), new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CREATE_MESSAGE)
  },
  deleteMessage: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.deleteMessage(new ObjectId(req.params.messageId))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.DELETE_MESSAGE)
  },
  pinMessage: async (req: Request<ParamsDictionary, any, PinMessageBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.pinMessage(new ObjectId(req.params.id), new ObjectId(req.params.messageId))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.PIN_MESSAGE)
  },
  kickMember: async (req: Request<ParamsDictionary, any, KickMemberBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.kickMember(new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.KICK_MEMBER)
  },
  banMember: async (req: Request<ParamsDictionary, any, BanMemberBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.banMember(new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.BAN_MEMBER)
  },
  dismissMessage: async (req: Request<ParamsDictionary, any, DismissMessageBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.dismissMessage(new ObjectId(req.user._id), new ObjectId(req.params.id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.DISMISS_MESSAGE)
  },
  changeAvatar: async (req: Request<ParamsDictionary, any, DismissMessageBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.changeAvatar(new ObjectId(req.params.id), req.file)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CHANGE_AVATAR)
  },
  changeBackground: async (req: Request<ParamsDictionary, any, DismissMessageBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.changeBackground(new ObjectId(req.params.id), req.file)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CHANGE_BACKGROUND)
  },
  leaveRoom: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.leaveRoom(new ObjectId(req.params.id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.LEAVE_ROOM)
  },
  acceptInvite: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.acceptInvite(new ObjectId(req.params.inviteId), new ObjectId(req.user._id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.ACCEPT_INVITE)
  },
  rejectInvite: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.rejectInvite(new ObjectId(req.params.id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.REJECT_INVITE)
  },
  reactMessage: async (req: Request<ParamsDictionary, any, ReactMessageBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.reactMessage(new ObjectId(req.params.messageId), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.REACT_MESSAGE)
  },
  changeNickname: async (req: Request<ParamsDictionary, any, ChangeNicknameBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.changeNickname(new ObjectId(req.params.id), new ObjectId(req.user._id), req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CHANGE_NICKNAME)
  },
  searchMessage: async (req: Request<ParamsDictionary, any, ChangeNicknameBody, ParsedSearchMessageUrlQuery>, res: Response, next: NextFunction) => {
    const result = await roomService.searchMessage(req.query)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.ROOM.CHANGE_NICKNAME)
  }
}

export default roomController
