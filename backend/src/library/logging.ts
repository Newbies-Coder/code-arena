import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import fsPromises from 'fs/promises'
import { config } from '../config/env.config'

class Logging {
  public static logEvents = async (message: string, logFileName: string) => {
    const now = moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
    const date = moment(new Date()).format('DD-MM-YYYY')
    const logItem = `${uuidv4()}\t${now}\t${message}\n`

    try {
      if (!fs.existsSync(path.join(config.server.log_path, date))) {
        await fsPromises.mkdir(path.join(config.server.log_path, date))
      }
      await fsPromises.appendFile(path.join(config.server.log_path, date, logFileName), logItem)
    } catch (error) {
      console.error(error)
    }
  }

  public static logger = (req: Request, res: Response, next: NextFunction) => {
    let message = `${req.method}\t${req.url}\t${res.statusCode}\t${req.headers.origin}`
    this.logEvents(message, 'reqLog.log')
    next()
  }
}

export default Logging
