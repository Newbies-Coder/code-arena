import { Router } from 'express'
import roomController from '~/controllers/room.controller'
import { requireLoginMiddleware } from '~/middlewares/auth.middlewares'
import {
  banMemberValidator,
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
  makeRoomPrivateValidator,
  pinMessageValidator,
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
 * Body: { image: File }
 */

roomRouter.put('/:id/avatar', wrapRequestHandler(requireLoginMiddleware), changeRoomAvatarValidator, singleImageUpload, wrapRequestHandler(roomController.changeAvatar))

/**
 * Description: Change room background,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { image: File }
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
 * Description: Create an invitation
 * Path: /:id
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { recipient: string }
 */
roomRouter.post('/:id/invites', wrapRequestHandler(requireLoginMiddleware), createInviteValidator, wrapRequestHandler(roomController.createInvite))

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

/**
 * Description: Kick members
 * Path: /:id/kick
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { memberId: string }
 */
roomRouter.post('/:id/kick', wrapRequestHandler(requireLoginMiddleware), kickMemberValidator, wrapRequestHandler(roomController.kickMember))

/**
 * Description: Ban members
 * Path: /:id/ban
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { memberId: string , due_to: Date }
 */
roomRouter.post('/:id/ban', wrapRequestHandler(requireLoginMiddleware), banMemberValidator, wrapRequestHandler(roomController.banMember))

export default roomRouter
