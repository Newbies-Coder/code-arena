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
    USER_COLLECTION: 'The table holds user information in the database.',
    REFRESH_TOKEN_COLLECTION: 'The table holds refresh-token information in the database.',
    OTP_COLLECTION: 'The table holds otp information in the database.',
    FOLLOW_COLLECTION: 'The table holds follow information in the database.'
  }
} as const

export const JWT_MESSAGES = {
  JWT_SECRECT_KEY: 'This “Secret” string is unique to the application and must be prioritized and carefully stored securely on the server side.',
  JWT_REFRESH_TOKEN_KEY: 'This “Secret” string is unique to the application and must be prioritized and carefully stored securely on the server side.',
  ACCESS_TOKEN_EXPIRES_IN: 'Duration of existence of access_token',
  REFRESH_TOKEN_EXPIRES_IN: 'Duration of existence of access_token',
  JWT_ALGORITHM: 'List of strings with the names of the allowed algorithms'
} as const

export const OTP_EMAIL_MESSAGES = {
  OTP_EMAIL_NAME: 'Display name of the gmail account that send OTP',
  OTP_EMAIL_ACCOUNT: 'Email of the gmail account that send OTP',
  OTP_EMAIL_PASSWORD: 'Email password of the gmail account that send OTP'
}

export const ENV_MESSAGE = {
  PORT: 'Port server is using',
  HOST: 'Host server is using',
  DEV: 'Environment is a collection of procedures and tools for developing, testing and debugging an application or program.',
  PROD: 'Environment contains just the final version of the product in order to avoid any confusion or security vulnerabilities',
  TEST: 'Environment is where the testing teams analyze the quality of the application/program.'
} as const

export const CLIENT_MESSAGE = {
  REQ_POINT: 'Maximum number of points can be consumed over duration',
  REQ_DURATION: 'Number of seconds before consumed points are reset.',
  PASSWORD_SECRET: 'String of numeric or character values ​​used in security systems',
  OTP_SECRET: 'String of numeric or character values ​​used in security systems',
  COOKIES_EXPIRESIN: 'Cookie expires in the system',
  SECRET_COOKIE_NAME: 'Cookies_name when user login and register success and save local'
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
  UPLOAD_THUMBNAIL_SUCCESS: 'Upload thumbnail successfully!',
  FOLLOW_SUCCESS: 'Follow user successfully!',
  UNFOLLOW_SUCCESS: 'Unfollow user successfully!',
  GET_ALL_USER_SUCCESS: 'Get all users successfully!',
  GET_USER_SUCCESS: 'Get user successfully!',
  GET_PROFILE_USER_SUCCESS: 'Get profile successfully!',
  UPDATE_USER_SUCCESS: 'Update successfully!',
  SEARCH_USER_SUCCESS: 'Search user successfully!',
  DETELE_USER_SUCCESS: 'Delete user successfully!',
  DELETE_MANY_USER_SUCCESS: 'Delete many user successfully!',
  GET_ROLE_USER_SUCCESS: 'Get users role successfully!',
  GET_FAVORITE_USER_SUCCESS: 'Get list of close friends successfully!',
  INSERT_USER_TO_FAVORITES_SUCCESS: 'Insert user to favorite friends list successfully',
  DELETE_USER_TO_FAVORITES_SUCCESS: 'Remove user to favorite friends list successfully',
  GET_USERS_BLOCK_SUCCESS: 'Get list of block friends successfully!',
  BLOCK_USER_SUCCESS: 'Insert user to the block list successfully',
  REMOVE_USER_BLOCK_SUCCESS: 'Remove users from the block list successfully',
  PAGINATION_USER_SUCCESS: 'Pagination user successfully!',
  TEST_TOKEN_SUCCESS: 'Test token successfully!',
  USER_NOT_FOUND: 'User not found'
} as const

export const USER_VALIDATOR_MESSAGES = {
  TITLE: 'Validation error'
} as const

export const VALIDATION_MESSAGES = {
  TITLE: 'Validation Error',
  PAGINATION: {
    PAGE_CAN_NOT_LESS_THAN_ZERO: 'Page number cannot less than zero',
    ITEMS_IS_NOT_IN_RANGE: 'Item per page can not less than zero and greater than 100'
  },
  USER: {
    COMMONS: {
      USER_WITH_ID_IS_NOT_EXIST: 'User with id is not exist',
      USER_ID_MUST_BE_A_STRING: 'User id must be a string',
      USER_ID_CAN_NOT_BE_EMPTY: 'User id cannot be empty',
      USER_NOT_LOGIN: 'You must logged in to continue',
      USER_NOT_ROLE_NOT_SATISFIED: 'You don not have the right role to access this resources',
      USER_ID_IS_INVALID: 'User id is invalid'
    },
    LOGIN: {
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      EMAIL_ACCESSBILITY: "The email address doesn't exist. Please try the valid one or simply register",
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      PASSWORD_IS_INCORRECT: 'Password is incorrect',
      ACCOUNT_IS_UNVERIFIED: 'Account is unverified',
      ACCOUNT_IS_BANNED: 'Account is banned'
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
      PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm_password is required',
      CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm_password must be a string',
      CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
      CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm_password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm_password must be between 8 and 16 characters long',
      DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
      DATE_OF_BIRTH_IS_ISO8601: 'Date of birth must be a YYYY-MM-DDTHH:mm:ss.ssssZ'
    },
    VERIFY_OTP: {
      OTP_IS_REQUIRED: 'OTP is required',
      OTP_MUST_BE_A_STRING: 'OTP must be a string',
      OPT_LENGTH_MUST_BE_6: 'OTP length must be 6 characters long',
      OTP_IS_NOT_EXIST: 'OTP is not exist',
      OTP_IS_EXPIRED: 'OTP is not exist'
    },
    REFRESH_TOKEN: {
      REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
      REFRESH_TOKEN_IS_NOT_EXIST: 'Refresh token is not exist'
    },
    LOGOUT: {
      HEADER_AUTHORIZATION_IS_INVALID: 'Header authorization is invalid'
    },
    PASSWORD: {
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      PASSWORD_IS_INCORRECT: 'Password is incorrect',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
      CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
      CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm password must be between 8 and 16 characters long',
      CONFIRM_PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      OLD_PASSWORD_IS_REQUIRED: 'Old password is required',
      OLD_PASSWORD_IS_INCORRECT: 'Old password is incorrect',
      PASSWORD_NOT_SAME_OLD_PASSWORD: 'New password must be not same as old password'
    },
    EMAIL: {
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      EMAIL_ACCESSABILITY: "The email address doesn't exist. Please try the valid one or simply register",
      EMAIL_IS_NOT_EXIT: 'Email is not exit'
    },
    UPLOAD_AVATAR: {
      INVALID_AVATAR_EXTENSION: 'Avatar image extension is invalid'
    },
    USER_PROFILE: {
      USER_ID_IS_REQUIRED: 'User id is required',
      USER_ID_NOT_FOUND: 'User id not found',
      USER_ID_IS_INVALID: 'User id is invalid',
      FULL_NAME_MUST_BE_A_STRING: 'Full name must be a string',
      FULL_NAME_MAX_LENGTH_IS_50: 'Full name length must be from 4 to 50',
      USER_NAME_MUST_BE_A_STRING: 'User name must be a string',
      USER_NAME_LENGTH_MUST_BE_FROM_4_TO_20: 'User name length must be from 4 to 20',
      PHONE_MUST_BE_A_STRING: 'Phone must be a string',
      PHONE_LENGTH_MUST_BE_10_CHARACTER: 'Phone length must be 10 character',
      PHONE_LENGTH_MUST_BE_STRING_NUMBER: 'Phone length must be a string number',
      DATE_OF_BIRTH_IS_ISO8601: 'Date of birth must be a YYYY-MM-DDTHH:mm:ss.ssssZ',
      BIO_MUST_BE_STRING: 'Bio must be a string',
      BIO_MAX_LENGTH_IS_150: 'Bio max length is 50 character',
      ADDRESS_MUST_BE_STRING: 'Address must be a string',
      ADDRESS_MAX_LENGTH_IS_255: 'Address max length is 255 character'
    }
  },
  TOKEN: {
    ACCESS_TOKEN_IS_REQUIRED: 'Access_token is required',
    ACCESS_TOKEN_MUST_BE_A_STRING: 'Access_token must be a string',
    INVALID_BEARER_TOKEN: 'Invalid bearer token',
    REFRESH_TOKEN_IS_REQUIRED: 'Refresh_token is required',
    REFRESH_TOKEN_MUST_BE_A_STRING: 'Refresh_token must be a string',
    REFRESH_TOKEN_USED_OR_NOT_EXIST: 'Used refresh token or not exist',
    REFRESH_TOKEN_IS_NOT_EXIST_IN_COOKIES: 'No refresh token in cookies!',
    EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
    EMAIL_VERIFY_TOKEN_MUST_BE_A_STRING: 'Email verify token must be a string'
  },
  AUTHORIZATION: {
    HEADER_AUTHORIZATION_IS_INVALID: 'Header authorization is invalid'
  }
} as const

export const REQUEST_QUERY_MESSAGES = {
  MAX_ITEM_PER_PAGE: 'How many items per page'
} as const

export const CLOUDINARY_MESSAGES = {
  CLOUDINARY_KEY: 'Key to access cloudinary',
  CLOUDINARY_SECRET: 'Password to access cloudinary',
  CLOUDINARY_NAME: 'Cloud name of current cloudinary account',
  CLOUDINARY_AVATAR_FOLDER: 'Folder that contain avatar images on cloudinary'
}

export const AUTH_MESSAGES = {
  FACEBOOK: {
    CLIENT_ID: 'ID to login with facebook and oauth2',
    CLIENT_SECRET: 'Password to login with facebook and oauth2',
    CALLBACK_URL: 'Url that facebook callback when authenticate'
  },
  GITHUB: {
    CLIENT_ID: 'ID to login with github and oauth2',
    CLIENT_SECRET: 'Password to login with github and oauth2',
    CALLBACK_URL: 'Url that github callback when authenticate'
  },
  GOOGLE: {
    CLIENT_ID: 'ID to login with google and oauth2',
    CLIENT_SECRET: 'Password to login with google and oauth2',
    CALLBACK_URL: 'Url that google callback when authenticate'
  },
  LINKEDIN: {
    CLIENT_ID: 'ID to login with linkedin and oauth2',
    CLIENT_SECRET: 'Password to login with linkedin and oauth2',
    CALLBACK_URL: 'Url that linkedin callback when authenticate'
  }
}

export const URL_MESSAGES = {
  AUTH_SUCCESS_URL: 'URL that user get redirected when authenticate success',
  AUTH_FAIL_URL: 'URL that user get redirected when authenticate fail'
}
