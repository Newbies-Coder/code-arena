import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import bannerController from '~/controllers/banner.controllers'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { getBannerWithIdValidator } from '~/middlewares/banners.middlewares'
import { paginationValidator } from '~/middlewares/commons.middleware'
import { multiImageUpload } from '~/middlewares/uploadFile.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const bannerRouter = Router()

/**
 * Description: Get list banners
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 * Query: {userId?: string}
 */

bannerRouter.get('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), paginationValidator, wrapRequestHandler(bannerController.getAll))

/**
 * Description: Insert list banners
 * Path: /
 * Method: Post
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 */
bannerRouter.post('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), multiImageUpload, wrapRequestHandler(bannerController.insert))

/**
 * Description: Remove banner
 * Path: /:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id: string}
 */

bannerRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), getBannerWithIdValidator, wrapRequestHandler(bannerController.delete))

export default bannerRouter
