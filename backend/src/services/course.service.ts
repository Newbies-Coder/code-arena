import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { CreateCourseBody, UpdateCourseBody } from '~/models/requests/Course.request'
import Course from '~/models/schemas/Course.schema'
import { databaseService } from '~/services/connectDB.service'
import { generateSlug } from '~/utils/helper'

class CourseService {
  async create(body: CreateCourseBody) {
    const { name, category } = body
    const slug = generateSlug(name)

    const result = await databaseService.courses.insertOne(
      new Course({
        name,
        slug,
        ...body,
        category: new ObjectId(category)
      })
    )

    return result
  }

  async update(id: string, body: UpdateCourseBody) {
    const { name, category } = body
    const slug = generateSlug(name)

    const result = await databaseService.courses.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: new Course({
          name,
          slug,
          ...body,
          category: new ObjectId(category)
        })
      },
      { upsert: false }
    )

    if (result.modifiedCount === 0) {
      throw new ErrorWithStatus({ message: VALIDATION_MESSAGES.COURSE.COURSE_NOT_FOUND, statusCode: StatusCodes.NOT_FOUND })
    }

    return result
  }

  async delete(id: string) {
    const result = await databaseService.courses.deleteOne({ _id: new ObjectId(id) })

    return result
  }
}

const courseService = new CourseService()

export default courseService
