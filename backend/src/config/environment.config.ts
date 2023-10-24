import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.APP_HOST ?? 'localhost'
const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 5000
const DB_PWD_USER_LOGS = process.env.PWD_USER_LOGS
const DB_USER_LOG = process.env.DATABASE_USER_LOGS

export const env = {
  client: {},
  server: {
    port: PORT,
    host: HOST
  },
  database: {
    log_name: DB_USER_LOG,
    log_pwd: DB_PWD_USER_LOGS
  },
  jwt_token: {}
}
