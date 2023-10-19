import express, { Request, Response, NextFunction } from 'express'
import { config } from './config/env.config'
import { createServer } from 'http'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import Logging from './library/logging'

const app = express()
const httpServer = createServer(app)
// app.use(Logging.logger)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['*'],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com/css',
          'https://use.fontawesome.com/releases/v5.12.0/css/all.css'
        ],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    }
  })
)
app.use(compression())
app.use(cors())
app.use(morgan('dev'))
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.static('.'))
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.get('/hi', (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    content: 'Hello',
    dateTime: new Date()
  })
})

httpServer.listen(config.server.port, config.server.host, () => {
  console.log(`🚀 Server Running On Port ${config.server.port}`)
})
