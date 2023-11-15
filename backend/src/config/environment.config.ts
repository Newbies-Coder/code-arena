import dotenv from 'dotenv'
import Joi from 'joi'
import { CLIENT_MESSAGE, DATABASE_MESSAGE, ENV_MESSAGE } from '~/constants/message'

dotenv.config()

let { PORT, HOST } = ENV_MESSAGE
let { DB_LOGS, DB_MAIN } = DATABASE_MESSAGE
let { REQ_DURATION, REQ_POINT } = CLIENT_MESSAGE
// Validation schema env
const envSchema = Joi.object({
  APP_PORT: Joi.number().required().description(PORT),
  APP_HOST: Joi.string().required().description(HOST),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DB_NAME: Joi.string().required().description(DB_MAIN.NAME),
  DB_NAME_USER_LOGS: Joi.string().required().description(DB_LOGS.NAME),
  DB_USER_COLLECTION: Joi.string().required().description(DB_MAIN.USER_COLLECTION),
  DATABASE_USER_LOGS: Joi.string().required().description(DB_LOGS.USERNAME),
  PASSWORD_USER_LOGS: Joi.string().required().description(DB_LOGS.PASSWORD),
  DATABASE_CODE_ARENA: Joi.string().required().description(DB_MAIN.USERNAME),
  PASSWORD_CODE_ARENA: Joi.string().required().description(DB_MAIN.PASSWORD),
  RATE_POINT: Joi.number().required().description(REQ_POINT),
  RATE_DURATION: Joi.number().required().description(REQ_DURATION)
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
  client: {},
  server: {
    port: envVars.APP_PORT || 5000,
    host: envVars.APP_HOST,
    rate_point: envVars.RATE_POINT,
    rate_duration: envVars.RATE_POINT
  },
  database: {
    main: {
      url: `mongodb+srv://${envVars.DATABASE_CODE_ARENA}:${envVars.PASSWORD_CODE_ARENA}@codearena.b9lkxsv.mongodb.net/?retryWrites=true&w=majority`,
      name: envVars.DB_NAME,
      collection: {
        users: envVars.DB_USER_COLLECTION
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
  jwt: {}
}
