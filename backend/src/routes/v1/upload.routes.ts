import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import uploadController from '~/controllers/upload.controller'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { multiImageUpload, singleImageUpload } from '~/middlewares/uploadFile.middleware'

import { wrapRequestHandler } from '~/utils/handler'

const uploadRouter = Router()

/**
 * Description: Upload image
 * Path: /meida
 * Method: POST
 */
uploadRouter.post('/media', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), singleImageUpload, wrapRequestHandler(uploadController.uploadSingle))

/**
 * Description: Upload nultiple image
 * Path: /media_multiple
 * Method: POST
 */

uploadRouter.post('/media_multiple', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), multiImageUpload, wrapRequestHandler(uploadController.uploadMultiple))

export default uploadRouter
