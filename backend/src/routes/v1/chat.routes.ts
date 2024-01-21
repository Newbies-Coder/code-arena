import { Router } from 'express'

const chatRouter = Router()

/**
 * Description: Get list of channel
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Query: { page: number, limit: number }
 */
chatRouter.get('/')

/**
 * Description: Create channel
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, type: string }
 */
chatRouter.post('/')

/**
 * Description: Update channel
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, type: string }
 */

chatRouter.put('/:id')

/**
 * Description: Delete channel
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { name: string, type: string }
 */
chatRouter.delete('/:id')

export default chatRouter
