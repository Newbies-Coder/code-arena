import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000
const MONGO_PASS_USER_LOGS = process.env.MONGO_PASSWORD_USER_LOGS
const DB_USER_LOG = process.env.DATABASE_USER_LOGS
const LOG_PATH = '../backend/src/logs'

export const env = {
  client: {},
  server: {
    port: PORT,
    host: HOST,
    log_path: LOG_PATH
  },
  database: {
    log_name: DB_USER_LOG,
    log_pass: MONGO_PASS_USER_LOGS
  },
  jwt_token: {}
}
