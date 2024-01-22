import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import courseCategoryController from '~/controllers/courseCategory.controller'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { checkParamValidator, createCourseCategoryValidator, updateCourseCategoryValidator } from '~/middlewares/courseCategory.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const courseCategoryRouter = Router()

/**
 * Description: Create new category
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 * Body: { name: string }
 */
courseCategoryRouter.post('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), createCourseCategoryValidator, wrapRequestHandler(courseCategoryController.create))

/**
 * Description: Update category
 * Path: /
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { name: string }
 */
courseCategoryRouter.put('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, updateCourseCategoryValidator, wrapRequestHandler(courseCategoryController.update))

/**
 * Description: Delete category
 * Path: /
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */
courseCategoryRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, wrapRequestHandler(courseCategoryController.delete))

export default courseCategoryRouter
