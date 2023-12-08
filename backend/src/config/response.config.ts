import { Response } from 'express'
import moment from 'moment'
import { StatusCodes } from 'http-status-codes'

export const sendResponse = {
  success: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  created: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  noContent: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.NO_CONTENT).json({
      statusCode: StatusCodes.NO_CONTENT,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  badRequest: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  unauthorized: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  forbidden: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.FORBIDDEN).json({
      statusCode: StatusCodes.FORBIDDEN,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  notFound: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.NOT_FOUND).json({
      statusCode: StatusCodes.NOT_FOUND,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  noAcceptable: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({
      statusCode: StatusCodes.NOT_ACCEPTABLE,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  conflict: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.CONFLICT).json({
      statusCode: StatusCodes.CONFLICT,
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  tooManyRequest: (res: Response, message: string, note?: null) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      statusCode: StatusCodes.TOO_MANY_REQUESTS,
      message,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  error: (res: Response, message: string, note?: null) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  }
}
