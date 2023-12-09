import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { AuthProvider } from '~/@types/auth.type'
import oauthService from '~/services/oauth.service'

const authController = {
  callback: (provider: AuthProvider) => async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    await oauthService.callback(provider, req, res)
    
  }
}

export default authController
