import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import courseController from '~/controllers/course.controller'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { checkParamValidator, createCourseValidator, updateCourseValidator } from '~/middlewares/course.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const courseRouter = Router()

/**
 * Description: Create new course
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: {}
 * Body: { name: string, content: string, category: string }
 */
courseRouter.post('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), createCourseValidator, wrapRequestHandler(courseController.create))

/**
 * Description: Update new course
 * Path: /
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 * Body: { name: string, content: string, category: string }
 */

courseRouter.put('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, updateCourseValidator, wrapRequestHandler(courseController.update))

/**
 * Description: Create new course
 * Path: /
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Param: { id: string }
 */

courseRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), checkParamValidator, wrapRequestHandler(courseController.delete))
