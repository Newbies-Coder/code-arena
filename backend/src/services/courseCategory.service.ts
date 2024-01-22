import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { CreateCourseCategoryBody, UpdateCourseCategoryBody } from '~/models/requests/CourseCategory.request'
import CourseCategory from '~/models/schemas/CourseCategory.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateSlug } from '~/utils/helper'

class CourseCategoryService {
  async create(body: CreateCourseCategoryBody) {
    const { name } = body
    const slug = generateSlug(name)

    const result = await databaseService.course_category.insertOne(
      new CourseCategory({
        name,
        slug
      })
    )

    return result
  }

  async update(id: string, body: UpdateCourseCategoryBody) {
    const { name } = body
    const slug = generateSlug(name)

    const result = await databaseService.course_category.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: new CourseCategory({
          name,
          slug
        })
      },
      { upsert: false }
    )

    if (result.modifiedCount === 0) {
      throw new ErrorWithStatus({ message: VALIDATION_MESSAGES.COURSE_CATEGORY.CATEGORY_NOT_FOUND, statusCode: StatusCodes.NOT_FOUND })
    }

    return result
  }

  async delete(id: string) {
    const result = await databaseService.course_category.deleteOne({ _id: new ObjectId(id) })

    return result
  }
}

const courseCategoryService = new CourseCategoryService()

export default courseCategoryService
