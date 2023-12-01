import dotenv from 'dotenv'
import Joi from 'joi'
import { CLIENT_MESSAGE, DATABASE_MESSAGE, OTP_EMAIL_MESSAGES, ENV_MESSAGE, JWT_MESSAGES } from '~/constants/message'

dotenv.config()

let { PORT, HOST } = ENV_MESSAGE
let { DB_LOGS, DB_MAIN } = DATABASE_MESSAGE
let { REQ_DURATION, REQ_POINT, COOKIES_EXPIRESIN, SECRET_COOKIE_NAME, PASSWORD_SECRET, OTP_SECRET } = CLIENT_MESSAGE
let { JWT_SECRECT_KEY, JWT_ALGORITHM, JWT_REFRESH_TOKEN_KEY, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } =
  JWT_MESSAGES
let { OTP_EMAIL_ACCOUNT, OTP_EMAIL_PASSWORD, OTP_EMAIL_NAME } = OTP_EMAIL_MESSAGES

// Validation schema env
const envSchema = Joi.object({
  APP_PORT: Joi.number().required().description(PORT),
  APP_HOST: Joi.string().required().description(HOST),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DB_NAME: Joi.string().required().description(DB_MAIN.NAME),
  DB_NAME_USER_LOGS: Joi.string().required().description(DB_LOGS.NAME),
  DB_USER_COLLECTION: Joi.string().required().description(DB_MAIN.USER_COLLECTION),
  DB_REFRESH_TOKEN_COLLECTION: Joi.string().required().description(DB_MAIN.REFRESH_TOKEN_COLLECTION),
  DB_OTP_COLLECTION: Joi.string().required().description(DB_MAIN.OTP_COLLECTION),
  DATABASE_USER_LOGS: Joi.string().required().description(DB_LOGS.USERNAME),
  PASSWORD_USER_LOGS: Joi.string().required().description(DB_LOGS.PASSWORD),
  DATABASE_CODE_ARENA: Joi.string().required().description(DB_MAIN.USERNAME),
  PASSWORD_CODE_ARENA: Joi.string().required().description(DB_MAIN.PASSWORD),
  RATE_POINT: Joi.number().required().description(REQ_POINT),
  RATE_DURATION: Joi.number().required().description(REQ_DURATION),
  PASSWORD_SECRET: Joi.string().required().description(PASSWORD_SECRET),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required().description(JWT_SECRECT_KEY),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required().description(JWT_REFRESH_TOKEN_KEY),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required().description(ACCESS_TOKEN_EXPIRES_IN),
  REFRESH_TOKEN_EXPIRESIN: Joi.string().required().description(REFRESH_TOKEN_EXPIRES_IN),
  JWT_ALGORITHM: Joi.string().required().description(JWT_ALGORITHM),
  COOKIES_EXPIRESIN: Joi.number().required().description(COOKIES_EXPIRESIN),
  SECRET_COOKIE_NAME: Joi.string().required().description(SECRET_COOKIE_NAME),
  OTP_EMAIL: Joi.string().required().description(OTP_EMAIL_ACCOUNT),
  OTP_EMAIL_PASSWORD: Joi.string().required().description(OTP_EMAIL_PASSWORD),
  OTP_EMAIL_NAME: Joi.string().required().description(OTP_EMAIL_NAME),
  OTP_SECRET: Joi.string().required().description(OTP_SECRET)
})
  .unknown()
  .required()

// Validate the environment variables
const { error, value: envVars } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const env = {
  node_env: envVars.NODE_ENV,
  client: {
    cookies_name: envVars.SECRET_COOKIE_NAME,
    cookies_exp: envVars.COOKIES_EXPIRESIN
  },
  server: {
    port: envVars.APP_PORT || 5000,
    host: envVars.APP_HOST,
    rate_point: envVars.RATE_POINT,
    rate_duration: envVars.RATE_POINT,
    password_secret: envVars.PASSWORD_SECRET,
    otp_secret: envVars.OTP_SECRET
  },
  database: {
    main: {
      url: `mongodb+srv://${envVars.DATABASE_CODE_ARENA}:${envVars.PASSWORD_CODE_ARENA}@codearena.b9lkxsv.mongodb.net/?retryWrites=true&w=majority`,
      name: envVars.DB_NAME,
      collection: {
        users: envVars.DB_USER_COLLECTION,
        refresh_tokens: envVars.DB_REFRESH_TOKEN_COLLECTION,
        otps: envVars.DB_OTP_COLLECTION
      }
    },
    logs: {
      url: `mongodb+srv://${envVars.DATABASE_USER_LOGS}:${envVars.PASSWORD_USER_LOGS}@cluster0.j1wu9d8.mongodb.net/?retryWrites=true&w=majority`,
      name: envVars.DB_NAME_USER_LOGS,
      collection: {
        logs: envVars.DB_LOGS_COLLECTION
      }
    }
  },
  jwt: {
    secret_key: envVars.JWT_ACCESS_TOKEN_SECRET,
    refresh_token_key: envVars.JWT_REFRESH_TOKEN_SECRET,
    access_token_exp: envVars.ACCESS_TOKEN_EXPIRESIN,
    refresh_token_exp: envVars.REFRESH_TOKEN_EXPIRESIN,
    jwt_algorithm: envVars.JWT_ALGORITHM
  },
  email: {
    account: envVars.OTP_EMAIL,
    password: envVars.OTP_EMAIL_PASSWORD,
    name: envVars.OTP_EMAIL_NAME
  }
}
