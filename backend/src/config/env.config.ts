import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000
const DB_PASS_USER_LOGS = process.env.DB_PASS_USER_LOGS
const DB_USER_LOG = process.env.DB_USER_LOG
const LOG_PATH = '../backend/src/logs'

export const config = {
  client: {},
  server: {
    port: PORT,
    host: HOST,
    log_path: LOG_PATH
  },
  database: {
    log_name: DB_USER_LOG,
    log_pass: DB_PASS_USER_LOGS
  },
  jwt_token: {}
}
