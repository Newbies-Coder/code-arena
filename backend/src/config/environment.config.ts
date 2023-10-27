import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

// Validation schema env
const envSchema = Joi.object({
  APP_PORT: Joi.number().required().description('App port'),
  APP_HOST: Joi.string().required().description('App host'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DATABASE_USER_LOGS: Joi.string().required().description('Collection name users log'),
  PWD_USER_LOGS: Joi.string().required().description('Collection password users log')
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
    host: envVars.APP_HOST
  },
  database: {
    log_name: envVars.DATABASE_USER_LOGS,
    log_pwd: envVars.PWD_USER_LOGS
  },
  jwt: {}
}
