import dotenv from 'dotenv'
import Joi from 'joi'
import { CLIENT_MESSAGE, DATABASE_MESSAGE, OTP_EMAIL_MESSAGES, ENV_MESSAGE, JWT_MESSAGES, REQUEST_QUERY_MESSAGES, CLOUDINARY_MESSAGES, AUTH_MESSAGES, URL_MESSAGES } from '~/constants/message'

dotenv.config()

let { PORT, HOST } = ENV_MESSAGE
let { DB_LOGS, DB_MAIN } = DATABASE_MESSAGE
let { REQ_DURATION, REQ_POINT, COOKIES_EXPIRES_IN, SECRET_COOKIE_NAME, PASSWORD_SECRET, OTP_SECRET } = CLIENT_MESSAGE
let { JWT_SECRET_KEY, JWT_ALGORITHM, JWT_REFRESH_TOKEN_KEY, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = JWT_MESSAGES
let { OTP_EMAIL_ACCOUNT, OTP_EMAIL_PASSWORD, OTP_EMAIL_NAME } = OTP_EMAIL_MESSAGES
let { MAX_ITEM_PER_PAGE } = REQUEST_QUERY_MESSAGES
let { CLOUDINARY_KEY, CLOUDINARY_SECRET, CLOUDINARY_NAME, CLOUDINARY_AVATAR_FOLDER, CLOUDINARY_THUMBNAIL_FOLDER, CLOUDINARY_BANNER_FOLDER, CLOUDINARY_IMAGE_FOLDER } = CLOUDINARY_MESSAGES
let { FACEBOOK, GITHUB, LINKEDIN, GOOGLE } = AUTH_MESSAGES
let { AUTH_SUCCESS_URL, AUTH_FAIL_URL } = URL_MESSAGES

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
  DB_FOLlOW_COLLECTION: Joi.string().required().description(DB_MAIN.FOLLOW_COLLECTION),
  DB_BLOCKED_USER_COLLECTION: Joi.string().required().description(DB_MAIN.BLOCKED_USER_COLLECTION),
  DB_CLOSE_FRIENDS_COLLECTION: Joi.string().required().description(DB_MAIN.CLOSE_FRIENDS_COLLECTION),
  DB_BANNERS_COLLECTION: Joi.string().required().description(DB_MAIN.BANNERS_COLLECTION),
  DB_COURSE_CATEGORY_COLLECTION: Joi.string().required().description(DB_MAIN.COURSE_CATEGORY_COLLECTION),
  DB_COURSE_COLLECTION: Joi.string().required().description(DB_MAIN.COURSE_COLLECTION),
  DB_MESSAGE_COLLECTION: Joi.string().required().description(DB_MAIN.MESSAGE_COLLECTION),
  DB_ROOM_COLLECTION: Joi.string().required().description(DB_MAIN.ROOM_COLLECTION),
  DATABASE_USER_LOGS: Joi.string().required().description(DB_LOGS.USERNAME),
  PASSWORD_USER_LOGS: Joi.string().required().description(DB_LOGS.PASSWORD),
  DATABASE_CODE_ARENA: Joi.string().required().description(DB_MAIN.USERNAME),
  PASSWORD_CODE_ARENA: Joi.string().required().description(DB_MAIN.PASSWORD),
  RATE_POINT: Joi.number().required().description(REQ_POINT),
  RATE_DURATION: Joi.number().required().description(REQ_DURATION),
  PASSWORD_SECRET: Joi.string().required().description(PASSWORD_SECRET),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required().description(JWT_SECRET_KEY),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required().description(JWT_REFRESH_TOKEN_KEY),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required().description(ACCESS_TOKEN_EXPIRES_IN),
  REFRESH_TOKEN_EXPIRESIN: Joi.string().required().description(REFRESH_TOKEN_EXPIRES_IN),
  JWT_ALGORITHM: Joi.string().required().description(JWT_ALGORITHM),
  COOKIES_EXPIRESIN: Joi.number().required().description(COOKIES_EXPIRES_IN),
  SECRET_COOKIE_NAME: Joi.string().required().description(SECRET_COOKIE_NAME),
  OTP_EMAIL: Joi.string().required().description(OTP_EMAIL_ACCOUNT),
  OTP_EMAIL_PASSWORD: Joi.string().required().description(OTP_EMAIL_PASSWORD),
  OTP_EMAIL_NAME: Joi.string().required().description(OTP_EMAIL_NAME),
  OTP_SECRET: Joi.string().required().description(OTP_SECRET),
  MAX_ITEMS_PER_PAGE: Joi.string().required().description(MAX_ITEM_PER_PAGE),
  CLOUDINARY_KEY: Joi.string().required().description(CLOUDINARY_KEY),
  CLOUDINARY_SECRET: Joi.string().required().description(CLOUDINARY_SECRET),
  CLOUDINARY_NAME: Joi.string().required().description(CLOUDINARY_NAME),
  CLOUDINARY_AVATAR_FOLDER: Joi.string().required().description(CLOUDINARY_AVATAR_FOLDER),
  CLOUDINARY_IMAGE_FOLDER: Joi.string().required().description(CLOUDINARY_IMAGE_FOLDER),
  CLOUDINARY_THUMBNAIL_FOLDER: Joi.string().required().description(CLOUDINARY_THUMBNAIL_FOLDER),
  CLOUDINARY_BANNER_FOLDER: Joi.string().required().description(CLOUDINARY_BANNER_FOLDER),
  FACEBOOK_AUTH_CLIENT_ID: Joi.string().required().description(FACEBOOK.CLIENT_ID),
  FACEBOOK_AUTH_CLIENT_SECRET: Joi.string().required().description(FACEBOOK.CLIENT_SECRET),
  FACEBOOK_AUTH_CALLBACK_URL: Joi.string().required().description(FACEBOOK.CALLBACK_URL),
  GITHUB_AUTH_CLIENT_ID: Joi.string().required().description(GITHUB.CLIENT_ID),
  GITHUB_AUTH_CLIENT_SECRET: Joi.string().required().description(GITHUB.CLIENT_SECRET),
  GITHUB_AUTH_CALLBACK_URL: Joi.string().required().description(GITHUB.CALLBACK_URL),
  GOOGLE_AUTH_CLIENT_ID: Joi.string().required().description(GOOGLE.CLIENT_ID),
  GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required().description(GOOGLE.CLIENT_SECRET),
  GOOGLE_AUTH_CALLBACK_URL: Joi.string().required().description(GOOGLE.CALLBACK_URL),
  LINKEDIN_AUTH_CLIENT_ID: Joi.string().required().description(LINKEDIN.CLIENT_ID),
  LINKEDIN_AUTH_CLIENT_SECRET: Joi.string().required().description(LINKEDIN.CLIENT_SECRET),
  LINKEDIN_AUTH_CALLBACK_URL: Joi.string().required().description(LINKEDIN.CALLBACK_URL),
  AUTH_SUCCESS_URL: Joi.string().required().description(AUTH_SUCCESS_URL),
  AUTH_FAIL_URL: Joi.string().required().description(AUTH_FAIL_URL)
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
        otps: envVars.DB_OTP_COLLECTION,
        follow: envVars.DB_FOLlOW_COLLECTION,
        blocked_user: envVars.DB_BLOCKED_USER_COLLECTION,
        close_friends: envVars.DB_CLOSE_FRIENDS_COLLECTION,
        banners: envVars.DB_BANNERS_COLLECTION,
        course_category: envVars.DB_COURSE_CATEGORY_COLLECTION,
        courses: envVars.DB_COURSE_COLLECTION,
        messages: envVars.DB_MESSAGE_COLLECTION,
        rooms: envVars.DB_ROOM_COLLECTION
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
  },
  request: {
    max_items: MAX_ITEM_PER_PAGE
  },
  cloudinary: {
    secret: envVars.CLOUDINARY_SECRET,
    key: envVars.CLOUDINARY_KEY,
    cloud_name: envVars.CLOUDINARY_NAME,
    image_folder: envVars.CLOUDINARY_IMAGE_FOLDER,
    avatar_folder: envVars.CLOUDINARY_AVATAR_FOLDER,
    thumbnail_folder: envVars.THUMBNAIL_AVATAR_FOLDER,
    banner_folder: envVars.CLOUDINARY_BANNER_FOLDER
  },
  auth: {
    facebook: {
      client_id: envVars.FACEBOOK_AUTH_CLIENT_ID,
      client_secret: envVars.FACEBOOK_AUTH_CLIENT_SECRET,
      callback_url: envVars.FACEBOOK_AUTH_CALLBACK_URL
    },
    github: {
      client_id: envVars.GITHUB_AUTH_CLIENT_ID,
      client_secret: envVars.GITHUB_AUTH_CLIENT_SECRET,
      callback_url: envVars.GITHUB_AUTH_CALLBACK_URL
    },
    google: {
      client_id: envVars.GOOGLE_AUTH_CLIENT_ID,
      client_secret: envVars.GOOGLE_AUTH_CLIENT_SECRET,
      callback_url: envVars.GOOGLE_AUTH_CALLBACK_URL
    },
    linkedin: {
      client_id: envVars.LINKEDIN_AUTH_CLIENT_ID,
      client_secret: envVars.LINKEDIN_AUTH_CLIENT_SECRET,
      callback_url: envVars.LINKEDIN_AUTH_CALLBACK_URL
    }
  },
  url: {
    auth_success: envVars.AUTH_SUCCESS_URL,
    auth_fail: envVars.AUTH_FAIL_URL
  }
}
