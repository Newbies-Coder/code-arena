import { createHash } from 'crypto'
import { env } from '~/config/environment.config'

export const sha256 = (content: string) => createHash('sha256').update(content).digest('hex')

export const hashPassword = (password: string) => sha256(password + env.server.password_secret)
