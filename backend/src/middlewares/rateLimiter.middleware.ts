import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { sendResponse } from '~/config/response.config'
import { env } from '~/config/environment.config'

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
      sendResponse.tooManyRequest(res, 'Too Many Requests')
    })
}
