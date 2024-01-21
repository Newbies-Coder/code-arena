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
    const { name } = body
    const slug = generateSlug(name)

    const result = await databaseService.course.insertOne(
      new Course({
        name,
        slug,
        ...body
      })
    )

    return result
  }

  async update(id: string, body: UpdateCourseBody) {
    const { name } = body
    const slug = generateSlug(name)

    const result = await databaseService.course.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: new Course({
          name,
          slug,
          ...body
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
    const result = await databaseService.course.deleteOne({ _id: new ObjectId(id) })

    return result
  }
}

const courseService = new CourseService()

export default courseService
