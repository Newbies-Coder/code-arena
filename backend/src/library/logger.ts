import path from 'path'
import mongo from 'winston-mongodb'
import moment from 'moment'
import winston from 'winston'
import { env } from '~/config/environment.config'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { USER_LOGS_DIR } from '~/constants/dir'
import { Request, Response, NextFunction } from 'express'

const url = `mongodb+srv://${env.database.log_name}:${env.database.log_pwd}@cluster0.j1wu9d8.mongodb.net/?retryWrites=true&w=majority`
const mongoClient = new MongoClient(url)
;(async () => await mongoClient.connect())()

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.json() }),
    new winston.transports.File({ filename: path.join(USER_LOGS_DIR, 'reqLog.log') }),
    new mongo.MongoDB({ db: Promise.resolve(mongoClient), collection: 'log', capped: true, cappedMax: 10000 })
  ]
})

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    id: uuidv4(),
    dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
    method: req.method,
    url: req.url,
    headers: req.headers.origin,
    statusCode: res.statusCode
  })
  next()
}

export default logger
