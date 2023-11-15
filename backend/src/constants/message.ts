export const DATABASE_MESSAGE = {
  DB_LOGS: {
    NAME: 'Database access name in the user log',
    USERNAME: 'Username credentials to access the database user logs',
    PASSWORD: 'Passwrod credentials to access the database user logs ',
    CONNECT: '📒 Connected to DB User Logs successfully!',
    DICONNECT: '⛔️ Disconnected from the database the user logs in successfully!'
  },
  DB_MAIN: {
    NAME: 'Database access name in the ',
    USERNAME: 'Username credentials to access the database main',
    PASSWORD: 'Passwrod credentials to access the database main ',
    CONNECT: '🌱 Connected to DB Code Arena successfully!',
    DICONNECT: '⛔️ Disconnected from MongoDB successfully!',
    USER_COLLECTION: 'The table holds user information in the database.'
  }
} as const

export const JT_MESSAGES = {} as const

export const ENV_MESSAGE = {
  PORT: 'Port server is using',
  HOST: 'Host server is using',
  DEV: 'Environment is a collection of procedures and tools for developing, testing and debugging an application or program.',
  PROD: 'Environment contains just the final version of the product in order to avoid any confusion or security vulnerabilities',
  TEST: 'Environment is where the testing teams analyze the quality of the application/program.'
} as const

export const CLIENT_MESSAGE = {
  REQ_POINT: 'Maximum number of points can be consumed over duration',
  REQ_DURATION: 'Number of seconds before consumed points are reset.'
} as const

export const RESULT_RESPONSE_MESSAGES = {
  LOGIN_SUCCESS: 'Login successfully!',
  LOGIN_GOOGLE_SUCCESS: 'Login google successfully!',
  LOGIN_FACEBOOK_SUCCESS: 'Login faceboook successfully!',
  LOGIN_LINKEDIN_SUCCESS: 'Login linkedin successfully!',
  LOGIN_GITHUB_SUCCESS: 'Login github successfully!',
  REGISTER_SUCCESS: 'Created account successfully!',
  LOGOUT_SUCCESS: 'Logout scussessfully!',
  REFRESH_TOKEN_SUCCESS: 'User refresh_token successfully!',
  VERIFY_OTP_SUCCESS: 'Verify OTP successfully!',
  RESEND_OTP_SUCCESS: 'Resend OTP successfully!',
  FORGOT_PASSWORD_SUCCESS: 'Forgot_password successfully!',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot_password successfully!',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully!',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully!',
  UPLOAD_AVATAR_SUCCESS: 'Upload avatar successfully!',
  FOLLOW_SUCCESS: 'Follow user successfully!',
  UNFOLLOW_SUCCESS: 'Unfollow user successfully!',
  GET_ALL_USER_SUCCESS: 'Get all users successfully!',
  GET_USER_SUCCESS: 'Get user successfully!',
  GET_PROFILE_USER_SUCCESS: 'Get profile successfully!',
  UPDATE_USER_SUCCESS: 'Update successfully!',
  SEARCH_USER_SUCCESS: 'Search user successfully!',
  DETELE_USER_SUCCESS: 'Delete user successfully!',
  DELETE_MANY_USER_SUCCESS: 'Delete many user successfully!',
  PAGINATION_USER_SUCCESS: 'Pagination user successfully!',
  TEST_TOKEN_SUCCESS: 'Test token successfully!'
} as const

export const USER_VALIDATOR_MESSAGES = {
  TITLE: 'Validation error'
} as const
