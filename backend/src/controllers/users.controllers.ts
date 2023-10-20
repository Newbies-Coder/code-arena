import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'

const userController = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      sendResponse.success(res, '', 'Login successfully!')
    } catch (error) {
      return sendResponse.error(res, 'Internal Server Error')
    }
  }
}

export default userController
