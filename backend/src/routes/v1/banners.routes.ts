import { Router } from 'express'
import bannerController from '~/controllers/banner.controllers'
import { wrapRequestHandler } from '~/utils/handler'

const bannerRouter = Router()

/**
 * Description: Get list banners
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id: string, user_id: string}
 */

bannerRouter.get('/', wrapRequestHandler(bannerController.getAll))

/**
 * Description: Insert banners into systems
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {url: string, user_id: string: slug: string}
 */

bannerRouter.post('/', wrapRequestHandler(bannerController.insert))

/**
 * Description: Remove banner
 * Path: /:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id: string}
 */

bannerRouter.delete('/:id', wrapRequestHandler(bannerController.delete))

export default bannerRouter
