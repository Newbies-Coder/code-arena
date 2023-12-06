import express, { Request, Response, NextFunction } from 'express'
import { env } from './config/environment.config'
import { createServer } from 'http'
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import rootRouter from './routes'
import { rateLimiterMiddleware } from './middlewares/rateLimiter.middleware'
import { logServices } from './services/connectLogs.service'
import { databaseService } from './services/connectDB.service'
import { defaultErrorHandler } from './middlewares/errors.middleware'
import exitHook from 'async-exit-hook'
import { DATABASE_MESSAGE } from './constants/message'
import './config/passport.config'
import session from 'express-session'
import passport from 'passport'

const app = express()
const httpServer = createServer(app)
logServices.connect()
app.use((req, res, next) => logServices.logRequest(req, res, next))
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
// express session
app.use(
  session({
    secret: env.jwt.secret_key,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Rate limit request from client
if (env.node_env === 'production') {
  app.use('/api', rateLimiterMiddleware)
}
app.use('/api', rootRouter)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

//Connect Database Code Arena
databaseService.connect()
// Error handling
app.use(defaultErrorHandler)
httpServer.listen(env.server.port, env.server.host, () => {
  console.log(`🚀 Server Running On Port ${env.server.port}`)
})
// Close db and close db_logs
exitHook(() => {
  databaseService.disConnect()
  console.log(DATABASE_MESSAGE.DB_MAIN.DICONNECT)
  logServices.disConnectLogs()
  console.log(DATABASE_MESSAGE.DB_LOGS.DICONNECT)
})
