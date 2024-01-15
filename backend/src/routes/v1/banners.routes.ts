import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import bannerController from '~/controllers/banner.controllers'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { checkParamValidator, insertBannerValidators } from '~/middlewares/banners.middlewares'
import { paginationBannerValidators } from '~/middlewares/commons.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const bannerRouter = Router()

/**
 * Description: Get list banners
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 * Query: {bannerId?: string}
 */

bannerRouter.get('', paginationBannerValidators, wrapRequestHandler(bannerController.getAll))

/**
 * Description: Get list banner and pagination and get banners by user_id
 * Path: /:id
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

bannerRouter.get('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, wrapRequestHandler(bannerController.getBannerByUserId))

/**
 * Description: Insert list banners
 * Path: /
 * Method: Post
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 */
bannerRouter.post('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), insertBannerValidators, wrapRequestHandler(bannerController.insert))

/**
 * Description: Remove banner
 * Path: /:id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: {id: string}
 */

bannerRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, wrapRequestHandler(bannerController.delete))

export default bannerRouter
