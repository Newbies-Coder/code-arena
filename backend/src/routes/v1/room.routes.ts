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
 * Body: { name: string, type: string }
 */
roomRouter.post('/', wrapRequestHandler(requireLoginMiddleware), createRoomValidator, wrapRequestHandler(roomController.createRoom))

/**
 * Description: Update room name, avatar, background, emotes,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string }
 */

roomRouter.put('/:id', wrapRequestHandler(requireLoginMiddleware), updateRoomValidator, wrapRequestHandler(roomController.updateRoom))

/**
 * Description: Set password for room,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 */

roomRouter.put('/:id/password', wrapRequestHandler(requireLoginMiddleware), makeRoomPrivateValidator, wrapRequestHandler(roomController.makeRoomPrivate))

/**
 * Description: Dismiss message from room,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { due_to: Date }
 */

roomRouter.put('/:id/dismiss', wrapRequestHandler(requireLoginMiddleware), dismissMessageValidator, wrapRequestHandler(roomController.dismissMessage))
/**
 * Description: Dismiss message from room,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { due_to: Date }
 */

roomRouter.put('/:id/dismiss', wrapRequestHandler(requireLoginMiddleware), dismissMessageValidator, wrapRequestHandler(roomController.dismissMessage))

/**
 * Description: Change room avatar,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 */

roomRouter.put('/:id/avatar', wrapRequestHandler(requireLoginMiddleware), changeRoomAvatarValidator, singleImageUpload, wrapRequestHandler(roomController.changeAvatar))

/**
 * Description: Change room background,
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
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
 */
roomRouter.post('/:id/invites', wrapRequestHandler(requireLoginMiddleware), createInviteValidator, wrapRequestHandler(roomController.createInvite))

/**
 * Description: Get a list of messages
 * Path: /:id/messages
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
roomRouter.get('/:id/message', wrapRequestHandler(requireLoginMiddleware), getMessageValidator, wrapRequestHandler(roomController.getMessage))

/**
 * Description: Create message
 * Path: /:id/messages
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
roomRouter.post('/:id/message', wrapRequestHandler(requireLoginMiddleware), createMessageValidator, wrapRequestHandler(roomController.createMessage))

/**
 * Description: Delete message
 * Path: /:id/messages/:messageId
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, messageId: string }
 */
roomRouter.delete('/:id/message/:messageId', wrapRequestHandler(requireLoginMiddleware), deleteMessageValidator, wrapRequestHandler(roomController.deleteMessage))

/**
 * Description: Pin message
 * Path: /:id/messages/:messageId/pin
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, messageId: string }
 */
roomRouter.post('/:id/message/:messageId/pin', wrapRequestHandler(requireLoginMiddleware), pinMessageValidator, wrapRequestHandler(roomController.pinMessage))

/**
 * Description: Kick members
 * Path: /:id/members/:memberId/kick
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, memberId: string }
 */
roomRouter.post('/:id/members/:memberId/kick', wrapRequestHandler(requireLoginMiddleware), kickMemberValidator, wrapRequestHandler(roomController.kickMember))

/**
 * Description: Ban members
 * Path: /:id/members/:memberId/kick
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string, memberId: string }
 */
roomRouter.post('/:id/message/:memberId/ban', wrapRequestHandler(requireLoginMiddleware), banMemberValidator, wrapRequestHandler(roomController.banMember))

export default roomRouter
