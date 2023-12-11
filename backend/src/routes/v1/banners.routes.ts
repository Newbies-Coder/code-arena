import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import bannerController from '~/controllers/banner.controllers'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { getBannersValidator } from '~/middlewares/banners.middlewares'
import { multiImageUpload } from '~/middlewares/uploadFile.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const bannerRouter = Router()

/**
 * Description: Get list banners
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 */

bannerRouter.get('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), wrapRequestHandler(bannerController.getAll))

/**
 * Description: Get list banners
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id}
 */

bannerRouter.get('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), getBannersValidator, wrapRequestHandler(bannerController.getAll))

/**
 * Description: Remove banner
 * Path: /:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id: string}
 */

bannerRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), getBannersValidator, wrapRequestHandler(bannerController.delete))

export default bannerRouter
