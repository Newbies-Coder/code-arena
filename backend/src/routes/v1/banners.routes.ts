import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import bannerController from '~/controllers/banner.controllers'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { checkParamValidator } from '~/middlewares/banners.middlewares'
import { paginationBannerValidators } from '~/middlewares/commons.middleware'
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

bannerRouter.get('', paginationBannerValidators, wrapRequestHandler(bannerController.getAll))

/**
 * Description: Get list tags and pagination and get tags by _id
 * Path: /:id
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

bannerRouter.get('/:id', checkParamValidator, wrapRequestHandler(bannerController.getBannerByUserId))

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

bannerRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, wrapRequestHandler(bannerController.delete))

export default bannerRouter
