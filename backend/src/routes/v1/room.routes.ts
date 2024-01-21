import { Router } from 'express'

const roomRouter = Router()

/**
 * Description: Get list of room
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { page: number, limit: number }
 */
roomRouter.get('/')

/**
 * Description: Create room
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, type: string }
 */
roomRouter.post('/')

/**
 * Description: Update room
 * Path: /:id
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string }
 */

roomRouter.put('/:id')

/**
 * Description: Delete room
 * Path: /:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
roomRouter.delete('/:id')

export default roomRouter
