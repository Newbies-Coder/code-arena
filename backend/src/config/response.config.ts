import { Response } from 'express'
import moment from 'moment'
import { StatusCodes } from 'http-status-codes'

export const sendResponse = {
  success: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.CREATED).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  created: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.CREATED).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  noContent: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.NO_CONTENT).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  badRequest: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.BAD_REQUEST).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  unauthorized: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  forbindden: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.FORBIDDEN).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  notFound: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.NOT_FOUND).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  noAcceptable: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  conflict: (res: Response, data: any, message: string, note?: null) => {
    res.status(StatusCodes.CONFLICT).json({
      message,
      data,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  tooManyRequest: (res: Response, message: string, note?: null) => {
    res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      message,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  },
  error: (res: Response, message: string, note?: null) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message,
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      messageConstants: note
    })
  }
}
