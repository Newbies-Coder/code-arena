import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof ErrorWithStatus) {
      return res.status(err.statusCode).json(omit(err, ['statusCode']))
    }
    // Print out stacktrace to find bug easier
    console.error(err)
    const finalError: any = {}
    Object.getOwnPropertyNames(err).forEach((key) => {
      if (
        !Object.getOwnPropertyDescriptor(err, key)?.configurable ||
        !Object.getOwnPropertyDescriptor(err, key)?.writable
      ) {
        return
      }
      finalError[key] = err[key]
    })
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: finalError.message,
      errorInfo: omit(finalError, ['stack'])
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      errorInfo: omit(error as any, ['stack'])
    })
  }
}
