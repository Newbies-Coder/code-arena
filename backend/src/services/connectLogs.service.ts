import { Db, MongoClient, ServerApiVersion } from 'mongodb'
import path from 'path'
import { env } from '~/config/environment.config'
import { Request, Response, NextFunction } from 'express'
import { DATABASE_MESSAGE } from '~/constants/message'
import winston from 'winston'
import { MongoDB } from 'winston-mongodb'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { USER_LOGS_DIR } from '~/constants/dir'

class DatabaseLogServices {
  private client: MongoClient | undefined
  private db: Db
  private logger: winston.Logger
  constructor() {
    this.client = new MongoClient(env.database.logs.url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    ;(this.db = this.client.db(env.database.logs.name)),
      (this.logger = winston.createLogger({
        transports: [
          new winston.transports.Console({ format: winston.format.simple() }),
          new winston.transports.File({ filename: path.join(USER_LOGS_DIR, 'reqLog.log') }),
          new MongoDB({
            db: env.database.logs.url,
            collection: env.database.logs.collection.logs,
            options: { useUnifiedTopology: true },
            capped: true,
            cappedMax: 10000
          })
        ]
      }))
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log(DATABASE_MESSAGE.DB_LOGS.CONNECT)
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  async disConnectLogs() {
    try {
      await this.client.close()
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  public logRequest(req: Request, res: Response, next: NextFunction): void {
    this.logger.info({
      id: uuidv4(),
      dateTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS'),
      method: req.method,
      url: req.url,
      headers: req.headers.origin,
      statusCode: res.statusCode
    })
    next()
  }
}

export const logServices = new DatabaseLogServices()
