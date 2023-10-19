import dotenv from 'dotenv'

dotenv.config()

const HOST = process.env.HOST ?? 'localhost'
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000

export const config = {
  client: {},
  server: {
    port: PORT,
    host: HOST
  },
  database: {},
  jwt_token: {}
}
