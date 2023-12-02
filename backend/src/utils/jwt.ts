import jwt from 'jsonwebtoken'
import { SignTokenType, VerifyTokenType } from '~/@types/tokenPayload.type'

export const signToken = ({ payload, privateKey, options }: SignTokenType): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublicKey }: VerifyTokenType) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, function (err, decoded) {
      if (err) {
        throw reject(err)
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
