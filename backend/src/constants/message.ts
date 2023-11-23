export const DATABASE_MESSAGE = {
  DB_LOGS: {
    NAME: 'Database access name in the user log',
    USERNAME: 'Username credentials to access the database user logs',
    PASSWORD: 'Passwrod credentials to access the database user logs ',
    CONNECT: '📒 Connected to DB User Logs successfully!',
    DICONNECT: '⛔️ Disconnected from the database user logs successfully!'
  },
  DB_MAIN: {
    NAME: 'Database access name in the ',
    USERNAME: 'Username credentials to access the database main',
    PASSWORD: 'Passwrod credentials to access the database main ',
    CONNECT: '🌱 Connected to DB Code Arena successfully!',
    DICONNECT: '⛔️ Disconnected from the database main successfully!',
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

export const VALIDATION_MESSAGES = {
  TITLE: 'Validation Error',
  USER: {
    LOGIN: {
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      EMAIL_ACCESSBILITY: "The email address doesn't exist. Please try the valid one or simply register",
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      PASSWORD_MUST_BE_STRONG:
        'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      PASSWORD_IS_INCORRECT: 'Password is incorrect'
    },
    REGISTER: {
      NAME_IS_REQUIRED: 'Username is required',
      NAME_MUST_BE_A_STRING: 'Username must be a string',
      NAME_LENGTH_MUST_BE_FROM_4_TO_20: 'Username must be between 4 and 20 characters long',
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      EMAIL_ACCESSBILITY: 'The email address is already subscribed. Please use a different email.',
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      PASSWORD_MUST_BE_STRONG:
        'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm_password is required',
      CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm_password must be a string',
      CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
      CONFIRM_PASSWORD_MUST_BE_STRONG:
        'Confirm_password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm_password must be between 8 and 16 characters long',
      DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
      DATE_OF_BIRTH_IS_ISO8601: 'Date of birth must be a YYYY-MM-DDTHH:mm:ss.ssssZ'
    }
  },
  TOKEN: {
    ACCESS_TOKEN_IS_REQUIRED: 'Access_token is required',
    ACCESS_TOKEN_MUST_BE_A_STRING: 'Access_token must be a string',
    REFRESH_TOKEN_IS_REQUIRED: 'Refresh_token is required',
    REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh_token must be a string',
    REFRESH_TOKEN_USED_OR_NOT_EXIST: 'Used refresh token or not exist',
    REFRESH_TOKEN_IS_NOT_EXIST_IN_COOKIES: 'No refresh token in cookies!',
    EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
    EMAIL_VERIFY_TOKEN_MUST_BE_A_STRING: 'Email verify token must be a string'
  }
} as const
