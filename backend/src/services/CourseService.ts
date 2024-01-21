import { CreateCourseBody } from '~/models/requests/Course.request'
import { databaseService } from '~/services/connectDB.service'
import { generateSlug } from '~/utils/helper'

export class CourseService {
  async create(body: CreateCourseBody) {
    const { name } = body
    const slug = generateSlug(name)

    const result = await databaseService.course_.insertOne(
      new Course({
        name,
        slug
      })
    )

    return result
  }

  async update(id: string, body: UpdateCourseBody) {
    const { name } = body
    const slug = generateSlug(name)

    const result = await databaseService.course_.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: new Course({
          name,
          slug
        })
      },
      { upsert: false }
    )

    if (result.modifiedCount === 0) {
      throw new ErrorWithStatus({ message: VALIDATION_MESSAGES.COURSE_._NOT_FOUND, statusCode: StatusCodes.NOT_FOUND })
    }

    return result
  }

  async delete(id: string) {
    const result = await databaseService.course_.deleteOne({ _id: new ObjectId(id) })

    return result
  }
}
