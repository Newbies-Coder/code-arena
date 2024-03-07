import { Router } from 'express'
import roomController from '~/controllers/room.controller'
import { requireLoginMiddleware } from '~/middlewares/auth.middlewares'
import {
  acceptInvitationValidator,
  banMemberValidator,
  changeNicknameValidator,
  changeRoomAvatarValidator,
  changeRoomBackgroundValidator,
  createInviteValidator,
  createMessageValidator,
  createRoomValidator,
  deleteMessageValidator,
  deleteRoomValidator,
  dismissMessageValidator,
  getMessageValidator,
  getRoomsValidator,
  kickMemberValidator,
  leaveRoomValidator,
  makeRoomPrivateValidator,
  pinMessageValidator,
  reactMessageValidator,
  rejectInvitationValidator,
  searchMessageValidator,
  updateRoomValidator
} from '~/middlewares/room.middlewares'
import { singleImageUpload } from '~/middlewares/uploadFile.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const roomRouter = Router()

/**
 * Description: Get list of room
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { page: number, limit: number }
 */
roomRouter.get('/', wrapRequestHandler(requireLoginMiddleware), getRoomsValidator, wrapRequestHandler(roomController.getRoom))

/**
 * Description: Create room
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, type: string, members: string[]  }
 */
roomRouter.post('/', wrapRequestHandler(requireLoginMiddleware), createRoomValidator, wrapRequestHandler(roomController.createRoom))

/**
 * Description: Update room name,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: {  name: string }
 */

roomRouter.put('/:id', wrapRequestHandler(requireLoginMiddleware), updateRoomValidator, wrapRequestHandler(roomController.updateRoom))

/**
 * Description: Set password for room,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { password: string, confirm_password: string }
 */

roomRouter.put('/:id/password', wrapRequestHandler(requireLoginMiddleware), makeRoomPrivateValidator, wrapRequestHandler(roomController.makeRoomPrivate))

/**
 * Description: Leave room,
 * Path: /:id/leave
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */

roomRouter.post('/:id/leave', wrapRequestHandler(requireLoginMiddleware), leaveRoomValidator, wrapRequestHandler(roomController.leaveRoom))

/**
 * Description: Dismiss message from room,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { due_to: Date }
 */

roomRouter.put('/:id/dismiss', wrapRequestHandler(requireLoginMiddleware), dismissMessageValidator, wrapRequestHandler(roomController.dismissMessage))

/**
 * Description: Change room avatar,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { file: File }
 */

roomRouter.put('/:id/avatar', wrapRequestHandler(requireLoginMiddleware), changeRoomAvatarValidator, singleImageUpload, wrapRequestHandler(roomController.changeAvatar))

/**
 * Description: Change room background,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { file: File }
 */

roomRouter.put('/:id/background', wrapRequestHandler(requireLoginMiddleware), changeRoomBackgroundValidator, singleImageUpload, wrapRequestHandler(roomController.changeBackground))

/**
 * Description: Delete room
 * Path: /:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
roomRouter.delete('/:id', wrapRequestHandler(requireLoginMiddleware), deleteRoomValidator, wrapRequestHandler(roomController.deleteRoom))

/**
 * Description: Get invitation
 * Path: /:id/invites
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
roomRouter.get('/invites', wrapRequestHandler(requireLoginMiddleware), wrapRequestHandler(roomController.getInvite))

/**
 * Description: Create an invitation
 * Path: /:id/invites
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { recipient: string }
 */
roomRouter.post('/:id/invites', wrapRequestHandler(requireLoginMiddleware), createInviteValidator, wrapRequestHandler(roomController.createInvite))

/**
 * Description: Accept an invitation
 * Path: /:id/:inviteId/accept
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
roomRouter.post('/invites/:inviteId/accept', wrapRequestHandler(requireLoginMiddleware), acceptInvitationValidator, wrapRequestHandler(roomController.acceptInvite))

/**
 * Description: Decline an invitation
 * Path: /:id/:inviteId/decline
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
roomRouter.post('/invites/:inviteId/reject', wrapRequestHandler(requireLoginMiddleware), rejectInvitationValidator, wrapRequestHandler(roomController.rejectInvite))

/**
 * Description: Get a list of messages
 * Path: /:id/messages
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Query: { pageIndex: number, pageSize: number }
 */
roomRouter.get('/:id/messages', wrapRequestHandler(requireLoginMiddleware), getMessageValidator, wrapRequestHandler(roomController.getMessage))

/**
 * Description: Search messages
 * Path: /:id/messages/search
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Query: { pageIndex: number, pageSize: number, search: string }
 */
roomRouter.get('/:id/messages/search', wrapRequestHandler(requireLoginMiddleware), searchMessageValidator, wrapRequestHandler(roomController.searchMessage))

/**
 * Description: Create message
 * Path: /:id/messages
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { content?: string, attachments: { type: 'image' | 'video', content: string  }[]  }
 */
roomRouter.post('/:id/messages', wrapRequestHandler(requireLoginMiddleware), createMessageValidator, wrapRequestHandler(roomController.createMessage))

/**
 * Description: Delete message
 * Path: /:id/messages/:messageId
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, messageId: string }
 */
roomRouter.delete('/:id/messages/:messageId', wrapRequestHandler(requireLoginMiddleware), deleteMessageValidator, wrapRequestHandler(roomController.deleteMessage))

/**
 * Description: Pin message
 * Path: /:id/messages/:messageId/pin
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, messageId: string }
 */
roomRouter.post('/:id/messages/:messageId/pin', wrapRequestHandler(requireLoginMiddleware), pinMessageValidator, wrapRequestHandler(roomController.pinMessage))

//TODO
/**
 * Description: React message
 * Path: /:id/messages/:messageId/react
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, messageId: string }
 */
roomRouter.post('/:id/messages/:messageId/react', wrapRequestHandler(requireLoginMiddleware), reactMessageValidator, wrapRequestHandler(roomController.reactMessage))

/**
 * Description: Kick members
 * Path: /:id/members/kick
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { memberId: string }
 */
roomRouter.post('/:id/members/kick', wrapRequestHandler(requireLoginMiddleware), kickMemberValidator, wrapRequestHandler(roomController.kickMember))

/**
 * Description: Ban members
 * Path: /:id/members/kick
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { memberId: string, due_to: Date }
 */
roomRouter.post('/:id/members/ban', wrapRequestHandler(requireLoginMiddleware), banMemberValidator, wrapRequestHandler(roomController.banMember))

/**
 * Description: Change nickname
 * Path: /:id/members/@me
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 */

roomRouter.put('/:id/members/@me', wrapRequestHandler(requireLoginMiddleware), changeNicknameValidator, wrapRequestHandler(roomController.changeNickname))

export default roomRouter
