import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { sendResponse } from '~/config/response.config'
import { env } from '~/config/environment.config'
import { StatusCodes } from 'http-status-codes'
import moment from 'moment'
import { VALIDATION_MESSAGES } from '~/constants/message'

const rateLimiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: +env.server.rate_point, // 10 requests
  duration: +env.server.rate_duration // per 1 second
})

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next()
    })
    .catch(() => {
      sendResponse.tooManyRequest(res, VALIDATION_MESSAGES.ERROR_MANY_REQ)
    })
}

// Check rate-limit end-point
export const checkRequestRateLimit = (windowTime: number, maxRequests: number) => {
  const rateLimiter = new RateLimiterMemory({
    points: maxRequests, // Number of points
    duration: windowTime * 1000 // Duration of limit in seconds
  })

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await rateLimiter.consume(req.ip)
      next()
    } catch (rejRes) {
      sendResponse.tooManyRequest(res, VALIDATION_MESSAGES.ERROR_MANY_REQ)
    }
  }
}
