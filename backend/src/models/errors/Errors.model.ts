import moment from 'moment'
import { StatusCodes } from 'http-status-codes'
import { ErrorEntityType, ErrorType } from '~/@types/errors.type'
import { USER_VALIDATOR_MESSAGES } from '~/constants/message'

type ErrorsType = Record<string, ErrorEntityType>

export class ErrorWithStatus {
  statusCode: number
  message: string
  created_at: string
  updated_at: string
  messageConstants: string

  constructor({ statusCode, message, created_at, updated_at, messageConstants }: ErrorType) {
    this.statusCode = statusCode
    this.message = message
    this.created_at = created_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
    this.updated_at = updated_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
    this.messageConstants = messageConstants || null
  }
}

export class ErrorEnity extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = USER_VALIDATOR_MESSAGES.TITLE, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, statusCode: StatusCodes.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
