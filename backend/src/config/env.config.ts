import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000
const LOG_PATH = '../backend/src/logs'

export const config = {
  client: {},
  server: {
    port: PORT,
    host: HOST,
    log_path: LOG_PATH
  },
  database: {},
  jwt_token: {}
}
