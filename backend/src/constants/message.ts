export const DATABASE_MESSAGE = {
  DB_LOGS: {
    NAME: 'Database access name in the user log',
    USERNAME: 'Username credentials to access the database user logs',
    PASSWORD: 'Password credentials to access the database user logs ',
    CONNECT: '📒 Connected to DB User Logs successfully!',
    DISCONNECT: '⛔️ Disconnected from the database user logs successfully!'
  },
  DB_MAIN: {
    NAME: 'Database access name in the ',
    USERNAME: 'Username credentials to access the database main',
    PASSWORD: 'Password credentials to access the database main ',
    CONNECT: '🌱 Connected to DB Code Arena successfully!',
    DISCONNECT: '⛔️ Disconnected from the database main successfully!',
    USER_COLLECTION: 'The table holds user information in the database.',
    REFRESH_TOKEN_COLLECTION: 'The table holds refresh-token information in the database.',
    OTP_COLLECTION: 'The table holds otp information in the database.',
    FOLLOW_COLLECTION: 'The table holds follow information in the database.',
    BLOCKED_USER_COLLECTION: 'The table holds user block user information in the database.',
    CLOSE_FRIENDS_COLLECTION: 'The table holds close friends information in the database.',
    BANNERS_COLLECTION: 'The table holds banners in the database.',
    COURSE_CATEGORY_COLLECTION: 'The table holds course category in the database.',
    COURSE_COLLECTION: 'The table holds course in the database.',
    MESSAGE_COLLECTION: 'The table holds message in the database.',
    ROOM_COLLECTION: 'The table holds room in the database.',
    INVITE_COLLECTION: 'The table holds room invite in the database.',
    MEMBER_COLLECTION: 'The table holds room members in the database.'
  }
} as const

export const JWT_MESSAGES = {
  JWT_SECRET_KEY: 'This “Secret” string is unique to the application and must be prioritized and carefully stored securely on the server side.',
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
  PASSWORD_SECRET: 'String of numeric or character values used in security systems',
  ROOM_PASSWORD_SECRET: 'String of numeric or character values used in security systems',
  OTP_SECRET: 'String of numeric or character values used in security systems',
  COOKIES_EXPIRES_IN: 'Cookie expires in the system',
  SECRET_COOKIE_NAME: 'Cookies_name when user login and register success and save local'
} as const

export const DEV_ERRORS_MESSAGES = {
  LOGIN: 'Error during login process',
  REGISTER: 'Error during register process',
  FIND_OTP: 'Error finding OTP',
  REFESH_TOKEN: 'Error refresh token',
  GENERATED_OTP: 'Error generated OTP',
  VERIFY_OTP: 'Error verifying OTP',
  GET_ALL_USER: 'Error retrieving users',
  DELETED_BANNER: 'Error delete banner',
  GET_ALL_BANNER: 'Error get all banners',
  GET_BANNER_WITH_USER_ID: 'Error get banners by user_id',
  INSERT_BANNER: 'Error inert banner',
  LOGOUT: 'Error occurred during logout.',
  CHANGE_PASSWORD: 'Error changing password',
  FORGOT_PASSWORD: 'Error in forgot-password',
  SEND_FAILURE: 'Error in send OTP',
  GET_ROLE_USER: 'Error fetching users by role',
  VALIDATION_EMAIL_AND_PASSWORD: 'Error validating email and password',
  CHECK_TOKEN: 'Error checking token',
  GET_USER_BY_ID: 'Error fetching user',
  FOLLOW_USER: 'Error in follow operation',
  GET_ALL_USER_FOLLOW: 'Error in follow operation',
  GET_ALL_USER_FOLLOWER: 'An error occurred while fetching followers.',
  USERS_FOLLOWER_BY_ID: 'An error occurred while fetching follower by user id',
  USERS_FOLLOWING_BY_ID: 'An error occurred while fetching following by user id.',
  GET_ALL_USER_NOT_FOLLOW: 'Error in unfollow operation',
  UNFOLLOW_USER: 'Error in unfollow operation',
  UPLOAD_AVATAR: 'Error updating avatar',
  UPLOAD_THUMBNAIL: 'Error updating thumbnail',
  GET_USER_BY_ROLE: 'Error get user by role',
  UPDATE_PROFILE: 'Error update profile user',
  DELETED_MANY_USER: 'Error deleting users',
  BLOCKED_USER: 'Error fetching blocked users',
  UNBLOCKED_USER: 'Error fetching unblocked users',
  INSERT_USER_FAVORITES: 'Error fetching insert users into favorite list',
  REMOVED_USER_FAVORITES: 'Error fetching remove users into favorite list',
  GET_ALL_USER_FAVORITE: 'Error fetching favorites',
  VERIFY_FORGOT_PASSWORD_TOKEN: 'Error verifying forgot-password token',
  CREATE_USER_BY_ADMIN: 'Error create user by admin',
  UPDATE_USER_BY_ADMIN: 'Error udpate user by admin'
}

export const RESULT_RESPONSE_MESSAGES = {
  COURSE_CATEGORY: {
    INSERT: 'Insert course category successfully',
    UPDATE: 'Update course category successfully',
    DELETE: 'Delete course category successfully'
  },
  COURSE: {
    INSERT: 'Insert course successfully',
    UPDATE: 'Update course successfully',
    DELETE: 'Delete course successfully'
  },
  AUTH_SUCCESS: {
    LOGIN: 'Login successfully!',
    LOGIN_GOOGLE: 'Login google successfully!',
    LOGIN_FACEBOOK: 'Login facebook successfully!',
    LOGIN_LINKEDIN: 'Login linkedin successfully!',
    LOGIN_GITHUB: 'Login github successfully!'
  },
  USER_SUCCESS: {
    REGISTER: 'Created account successfully!',
    LOGOUT: 'Logout successfully!',
    REFRESH_TOKEN: 'User refresh_token successfully!',
    FORGOT_PASSWORD: 'Forgot_password successfully!',
    VERIFY_FORGOT_PASSWORD: 'Verify forgot_password successfully!',
    RESET_PASSWORD: 'Reset password successfully!',
    CHANGE_PASSWORD: 'Change password successfully!',
    UPLOAD_AVATAR: 'Upload avatar successfully!',
    UPLOAD_THUMBNAIL: 'Upload thumbnail successfully!',
    GET_ALL_USER: 'Get all users successfully!',
    GET_USER: 'Get user successfully!',
    GET_PROFILE_USER: 'Get profile successfully!',
    UPDATE_USER: 'Update successfully!',
    SEARCH_USER: 'Search user successfully!',
    DELETE_USER: 'Delete user successfully!',
    DELETE_MANY_USER: 'Delete many user successfully!',
    GET_ROLE_USER: 'Get users role successfully!',
    GET_FAVORITE_USER: 'Get list of close friends successfully!',
    INSERT_USER_TO_FAVORITES: 'Insert user to favorite friends list successfully',
    DELETE_USER_TO_FAVORITES: 'Remove user to favorite friends list successfully',
    GET_USERS_BLOCK: 'Get list of block friends successfully!',
    BLOCK_USER: 'Insert user to the block list successfully',
    REMOVE_USER_BLOCK: 'Remove users from the block list successfully',
    PAGINATION_USER: 'Pagination user successfully!',
    TEST_TOKEN: 'Test token successfully!',
    USER_NOT_FOUND: 'User not found',
    FOLLOW: 'Follow user successfully!',
    GET_USERS_FOLLOW: 'Get all following list successfully!',
    GET_USERS_NOT_FOLLOW: "Get the list of users that you don't follow successfully!",
    GET_USERS_FOLLOWERS: 'Get all follower list successfully!',
    GET_USERS_FOLLOWER_BY_ID: "Get a user's followers list",
    GET_USERS_FOLLOWING_BY_ID: "Get a user's following list",
    GET_MULTUAL_FOLLOWS: 'Get multual follow successfully!',
    UNFOLLOW: 'Unfollow user successfully!',
    GET_BLOCKED_USER: 'Get blocked users successfully',
    INSERT_BLOCKED_USER: 'Blocked users successfully',
    DELETE_BLOCKED_USER: 'Unblocked users successfully',
    UPLOAD_IMAGE: 'Upload image sucessfully!',
    UPLOAD_MUL_IMAGE: 'Upload multiple image sucessfully!',
    CREATE_ACCOUNT_ADMIN: 'Created account successfully!',
    UPDATE_ACCOUNT_ADMIN: 'Updated account successfully!'
  },
  OTP_SUCCESS: {
    VERIFY_OTP: 'Verify OTP successfully!',
    RESEND_OTP: 'Resend OTP successfully!'
  },
  BANNERS_SUCCESS: {
    GET_ALL: 'Get all banners successfully!',
    GET_WITH_USER_ID: 'Get banners with user id successfully!',
    INSERT: 'Insert banners successfully!',
    DELETE: 'Delete banners successfully!'
  },
  VERIFY_FORGOT_PASSWORD_TOKEN: {
    CHECK_EMAIL_TO_RESET_PASSWORD: 'User already exist in database'
  },
  ROOM: {
    GET_ALL: 'Get all rooms successfully!',
    CREATE: 'Create room successfully!',
    UPDATE: 'Update room successfully!',
    DELETE: 'Delete room successfully!',
    MAKE_PRIVATE: 'Make private successfully!',
    CREATE_INVITE: 'Create invite successfully!',
    GET_INVITE: 'Get invite successfully!',
    GET_MESSAGE: 'Get message successfully',
    CREATE_MESSAGE: 'Create message successfully',
    DELETE_MESSAGE: 'Delete message successfully',
    PIN_MESSAGE: 'Pin message successfully',
    BAN_MEMBER: 'Ban member successfully',
    KICK_MEMBER: 'Kick member successfully',
    DISMISS_MESSAGE: 'Dismiss message successfully',
    CHANGE_AVATAR: 'Change avatar successfully',
    CHANGE_BACKGROUND: 'Change background successfully',
    LEAVE_ROOM: 'Leave room successfully',
    ACCEPT_INVITE: 'Accept invite successfully',
    REJECT_INVITE: 'Reject invite successfully',
    REACT_MESSAGE: 'React message successfully',
    CHANGE_NICKNAME: 'Change nickname successfully',
    FIND_MESSAGE: 'Find message successfully'
  }
} as const

export const USER_VALIDATOR_MESSAGES = {
  TITLE: 'Validation error'
} as const

export const VALIDATION_MESSAGES = {
  TITLE: 'Validation Error',
  ERROR_MANY_REQ: 'Too many request from this IP, please try again in an hour',
  PAGINATION: {
    PAGE_CAN_NOT_LESS_THAN_ZERO: 'Page number cannot less than 1',
    ITEMS_IS_NOT_IN_RANGE: 'Item per page can not less than 1 and greater than 100'
  },
  UPLOAD: {
    IMAGE: {
      INVALID_IMAGE_EXTENSION: 'Image extension is invalid',
      INVALID_IMAGE_SIZE: 'Image is too large',
      MAX_IMAGE_UPLOAD: 'Upload maximum 4 images',
      ERROR_INSERT_BANNERS: 'Failed to insert banners',
      ID_BANNER_IS_INVALID: 'Banner id is invalid'
    }
  },
  ADMIN: {
    CREATE_USER: {
      ID_IS_REQUIRED: 'User id is required',
      ID_NOT_FOUND: 'User id not found',
      ID_IS_INVALID: 'User id is invalid',
      ROLE_IS_REQUIRED: 'User role is required',
      ROLE_MUST_BE_A_STRING: 'Role must be a string',
      ROLE_IS_INVALID: 'Access denied. User does not have the required role.',
      FULL_NAME_IS_REQUIRED: 'Fullname is required',
      FULL_NAME_MUST_BE_A_STRING: 'Fullname must be a string',
      FULL_NAME_MAX_LENGTH_IS_50: 'Fullname length must be from 4 to 50',
      INVALID_FULLNAME: 'Must be a valid fullname',
      USERNAME_IS_REQUIRED: 'Username is required',
      INVALID_USERNAME: 'Must be a valid username',
      USERNAME_MUST_BE_A_STRING: 'Username must be a string',
      USERNAME_LENGTH_MUST_BE_FROM_2_TO_30: 'Username must be between 2 and 30 characters long',
      USERNAME_INCLUDES_MUL_WHITESPACE: 'Username can not contains multiple consecutive whitespace',
      PHONE_MUST_BE_A_STRING: 'Phone must be a string',
      PHONE_LENGTH_MUST_BE_10_CHARACTER: 'Phone length must be 10 character',
      PHONE_INVALID: 'Phone number invalid',
      DATE_OF_BIRTH_IS_ISO8601: 'Date of birth must be a YYYY-MM-DDTHH:mm:ss.ssssZ',
      ADDRESS_MUST_BE_STRING: 'Address must be a string',
      ADDRESS_LENGTH_IS_VALID: 'Address length must be from 10 to 255 characters',
      FIELD_UPDATE_IS_REQUIRED: 'Must be at least 1 field that to updating',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      VALID_USERNAME_PART_OF_EMAIL: 'Username part of the email must not contain special characters',
      DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
      DATE_OF_BIRTH_ERROR_FORMAT: 'Date_of_birth must be yyyy-mm-dd',
      DATE_OF_BIRTH_MUST_BE_A_STRING: 'Date_of_birth must be string',
      PHONE_IS_REQUIRED: 'Phone is required',
      PHONE_MUST_BE_STRING: 'Phone is must be string',
      PHONE_IS_INVALID: 'Valid the input phone is a Vietnamese phone number',
      GENDER_MUST_BE_STRING: 'Gender is must be string',
      GENDER_IS_INVALID: 'Gender is invalid. Please enter like: Male, Female, Other,..',
      AVATAR_MUST_BE_STRING: 'Avatar image is must be string',
      THUMBNAIL_MUST_BE_STRING: 'Cover_photo is must be string',
      VALID_URL_AVATAR: 'Valid URL avatar and image extension',
      VALID_URL_COVER_PHOTO: 'Valid URL cover_photo and image extension',
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_ACCESSIBILITY: 'The email address is already subscribed. Please use a different email.',
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      PASSWORD_CONTAINS_EMOJI: 'Password cannot contains emoji symbol and white space',
      CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm-password is required',
      CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm-password must be a string',
      CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm-password must be the same as password',
      CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm-password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm-password must be between 8 and 16 characters long',
      CONFIRM_PASSWORD_CONTAINS_EMOJI: 'Confirm-password cannot contains emoji symbol and white space',
      URL_MUST_BE_A_STRING: 'Website-url must be a string',
      INVALID_URL: 'Invalid Website-url format',
      BIO_MUST_BE_A_STRING: 'Bio must be a string',
      BIO_LENGTH_MUST_BE_FROM_5_TO_500: 'Bio must be between 5 and 500 characters long',
      VERIFY_STATUS_MUST_BE_A_STRING: 'Verify status must be a string',
      INVALID_VERIFY_STATUS: 'Status must be one of the following: Verified, Unverified, Celerity,Banned',
      ACCOUNT_NOT_EXISTS: "The user's account has been removed."
    }
  },
  USER: {
    COMMONS: {
      USER_RESET_PASSWORD_FAILED: 'Reset password failed!',
      USER_CHANGE_PASSWORD_FAILED: 'Change password failed!',
      USER_WITH_ID_IS_NOT_EXIST: 'User with id is not exist',
      USER_ID_MUST_BE_A_STRING: 'User id must be a string',
      USER_ID_CAN_NOT_BE_EMPTY: 'User id cannot be empty',
      USER_NOT_LOGIN: 'You must logged in to continue',
      USER_NOT_ROLE_NOT_SATISFIED: 'You don not have the right role to access this resources',
      USER_ID_IS_INVALID: 'User id is invalid',
      USERNAME_MUST_BE_STRING: 'Username must be a string',
      INVALID_INCLUDES: 'Invalid includes pagination',
      INVALID_SORT_ORDER_CREATED_AT: 'Invalid sort order created_at pagination',
      USER_BLOCKED: 'User account has been blocked'
    },
    VERIFY_FORGOT_PASSWORD_TOKEN: {
      IS_REQUIRED: 'Forgot-password token is required',
      MUST_BE_A_STRING: 'Forgot-password token must be a string',
      LENGTH_MUST_BE_6: 'Forgot-password token length must be 6 characters long',
      IS_NOT_EXIST: 'Forgot-password token is not found',
      IS_EXPIRED: 'Forgot-password token expired!',
      NOT_FOUND_OR_ALREADY_VERIFIED: 'User not found or forgot-password token already verified',
      INVALID_TOKEN: 'Invalid forgot-password token',
      IS_NUMBERIC: 'Please enter forgot-password token must be numberic'
    },
    LOGIN: {
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      EMAIL_ACCESSIBILITY: "The email address doesn't exist. Please try the valid one or simply register",
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      PASSWORD_IS_INCORRECT: 'Password is incorrect',
      ACCOUNT_IS_UNVERIFIED: 'Account is unverified',
      ACCOUNT_IS_BANNED: 'Account is banned',
      ACCOUNT_NOT_FOUND: 'Account not found',
      USER_NOT_FOUND: 'User not found',
      ACCOUNT_NOT_EXISTS: "The user's account has been removed.",
      EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect'
    },
    REGISTER: {
      USERNAME_IS_REQUIRED: 'Username is required',
      USERNAME_MUST_BE_A_STRING: 'Username must be a string',
      USERNAME_LENGTH_MUST_BE_FROM_2_TO_30: 'Username must be between 2 and 30 characters long',
      INVALID_USERNAME: 'Must be a valid username',
      USERNAME_INCLUDES_MUL_WHITESPACE: 'Username can not contains multiple consecutive whitespace',
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      EMAIL_ACCESSIBILITY: 'The email address is already subscribed. Please use a different email.',
      PASSWORD_IS_REQUIRED: 'Password is required',
      PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
      PASSWORD_MUST_BE_STRONG: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Password must be between 8 and 16 characters long',
      PASSWORD_CAN_NOT_CONTAIN_SPACE: 'Password can not contain space',
      CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm_password is required',
      CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm_password must be a string',
      CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
      CONFIRM_PASSWORD_MUST_BE_STRONG: 'Confirm_password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_16: 'Confirm_password must be between 8 and 16 characters long',
      DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
      DATE_OF_BIRTH_MUST_BE_A_STRING: 'Date of birth must be a string',
      DATE_OF_BIRTH_ERROR_FORMAT: 'Invalid date format. Please using yyyy-mm-dd',
      AGE_IS_NOT_ENOUGH: 'You must above 12 years old to register'
    },
    VERIFY_OTP: {
      OTP_IS_REQUIRED: 'OTP is required',
      OTP_MUST_BE_A_STRING: 'OTP must be a string',
      OPT_LENGTH_MUST_BE_6: 'OTP length must be 6 characters long',
      OTP_IS_NOT_EXIST: 'OTP is not found',
      OTP_IS_EXPIRED: 'OTP expired!',
      NOT_FOUND_OR_ALREADY_VERIFIED: 'User not found or OTP already verified',
      INVALID_OTP: 'Invalid OTP',
      OTP_IS_NUMBERIC: 'Please enter OTP must be numberic'
    },
    REFRESH_TOKEN: {
      REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
      REFRESH_TOKEN_IS_NOT_EXIST: 'Refresh token is not exist',
      TOKEN_NOT_FOUND: 'Attempted to delete non-existent refresh token.'
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
      PASSWORD_NOT_SAME_OLD_PASSWORD: 'New password must be not same as old password',
      PASSWORD_CONTAINS_EMOJI: 'Password cannot contains emoji symbol and white space',
      CONFIRM_PASSWORD_CONTAINS_EMOJI: 'Confirm password cannot contains emoji symbol and white space'
    },
    EMAIL: {
      EMAIL_IS_REQUIRED: 'Email is required',
      EMAIL_MUST_BE_A_STRING: 'Email address must be a string',
      EMAIL_ACCESSABILITY: "The email address doesn't exist. Please try the valid one or simply register",
      EMAIL_IS_NOT_REGISTER: 'Email is not register',
      EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
      EMAIL_ALREADY_EXISTS: 'Email already exists',
      VALID_EMAIL: 'Email address is invalid',
      VALID_DOMAIN: 'Email must end with @gmail.com or @gmail.edu.com',
      CONTAIN_SPECAIL_CHARACTER: 'Email must contain at least one special character.'
    },
    USER_PROFILE: {
      USER_ID_IS_REQUIRED: 'User id is required',
      USER_ID_NOT_FOUND: 'User id not found',
      USER_ID_IS_INVALID: 'User id is invalid',
      FULL_NAME_MUST_BE_A_STRING: 'Full name must be a string',
      FULL_NAME_MAX_LENGTH_IS_50: 'Full name length must be from 4 to 50',
      INVALID_FULLNAME: 'Must be a valid fullname',
      USERNAME_IS_REQUIRED: 'Username is required',
      USERNAME_MUST_BE_A_STRING: 'Username must be a string',
      USERNAME_LENGTH_MUST_BE_FROM_2_TO_30: 'Username must be between 2 and 30 characters long',
      USERNAME_INCLUDES_MUL_WHITESPACE: 'Username can not contains multiple consecutive whitespace',
      INVALID_USERNAME: 'Must be a valid username',
      PHONE_MUST_BE_A_STRING: 'Phone must be a string',
      PHONE_LENGTH_MUST_BE_10_CHARACTER: 'Phone length must be 10 character',
      PHONE_INVALID: 'Phone number invalid',
      DATE_OF_BIRTH_IS_ISO8601: 'Date of birth must be a YYYY-MM-DDTHH:mm:ss.ssssZ',
      BIO_MUST_BE_STRING: 'Bio must be a string',
      BIO_MAX_LENGTH_IS_500: 'Bio max length is 500 character',
      ADDRESS_MUST_BE_STRING: 'Address must be a string',
      ADDRESS_LENGTH_IS_VALID: 'Address length must be from 10 to 255 characters',
      FIELD_UPDATE_IS_REQUIRED: 'Must be at least 1 field that to updating',
      EMAIL_MUST_BE_A_STRING: 'Must be a valid email address',
      VALID_USERNAME_PART_OF_EMAIL: 'Username part of the email must not contain special characters',
      DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required',
      DATE_OF_BIRTH_ERROR_FORMAT: 'Date_of_birth must be yyyy-mm-dd',
      DATE_OF_BIRTH_MUST_BE_A_STRING: 'Date_of_birth must be string',
      PHONE_IS_REQUIRED: 'Phone is required',
      PHONE_MUST_BE_STRING: 'Phone is must be string',
      PHONE_IS_INVALID: 'Valid the input phone is a Vietnamese phone number',
      GENDER_MUST_BE_STRING: 'Gender is must be string',
      GENDER_IS_INVALID: 'Gender is invalid. Please enter like: Male, Female, Other,..',
      AVATAR_MUST_BE_STRING: 'Avatar image is must be string',
      THUMBNAIL_MUST_BE_STRING: 'Cover_photo is must be string',
      VALID_URL_AVATAR: 'Valid URL avatar and image extension',
      VALID_URL_COVER_PHOTO: 'Valid URL cover_photo and image extension'
    },
    BLOCKED: {
      USER_ALREADY_BLOCKED: 'User already been blocked',
      USER_ID_IS_INVALID: 'User id is invalid',
      USER_NOT_ALREADY_BLOCKED_USER: 'User has not already been blocked',
      USER_BLOCK_THEMSELVES: 'Users cannot block themselves'
    },
    GET_USERS_BY_ROLE: {
      ROLE_IS_REQUIRED: 'Role is required',
      ROLE_IS_INVALID: 'Role is invalid',
      ERROR_WHEN_FETCH_DATA: 'Error when fetch data from database'
    },
    FAVORITE: {
      FRIEND_ID_NOT_USER_ID: 'Friend id not user id',
      FRIEND_ID_IS_REQUIRED: 'Friend id is required',
      FRIEND_ID_IS_EXIT: 'Friend id is exit',
      FAVORITE_NOT_EXIT: 'Favorite not exit',
      USER_FAVOTITE_THEMSELVES: 'Users cannot favorite themselves',
      USER_FAVOTITE_REMOVE_THEMSELVES: 'Users cannot remove themselves',
      FRIEND_ALREADY_FAVORITE: 'Friend already been favorite list',
      FRIEND_NOT_ALREADY_FAVORITE_USER: 'Friend has not already been favorite list'
    },
    FOLLOW: {
      INVALID_ID: 'Invalid user or follow target ID.',
      NOT_ALREADY_FOLLOW_USER: 'User not already follows user',
      ALREADY_FOLLOW_USER: 'User already follows user',
      USER_FOLLOW_THEMSELVES: 'Users may not follow themselves'
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
    EMAIL_VERIFY_TOKEN_MUST_BE_A_STRING: 'Email verify token must be a string',
    EXPIRED_TIME: 'Token has expired.',
    INVALID_TOKEN: 'Invalid token missing iat or exp'
  },
  AUTHORIZATION: {
    HEADER_AUTHORIZATION_IS_INVALID: 'Header authorization is invalid'
  },
  BANNER: {
    BANNER_NOT_FOUND: 'Banner not found',
    BANNER_ID_INVALID: 'Banner_id is invalid',
    BANNER_ID_IS_REQUIRED: 'Banner_id is required',
    SLUG_IS_REQUIRED: 'Slug is required',
    SLUG_MUST_BE_STRING: 'Slug is must be string',
    SLUG_LENGTH_IS_INVALID: 'Slug length must be from 10 to 50 characters',
    INVALID_SLUG: 'Must be a valid slug',
    SLUG_INCLUDES_MUL_WHITESPACE: 'Slug can not contains multiple consecutive whitespace',
    DESCRIPTION_IS_REQUIRED: 'Description is required',
    DESCRIPTION_MUST_BE_STRING: 'Description is must be string',
    DESCRIPTION_LENGTH_IS_INVALID: 'Description length must be from 0 to 500 characters',
    URL_IS_REQUIRED: 'Url image is required',
    URL_MUST_BE_STRING: 'Url image is must be string',
    VALID_URL_IMAGE: 'Valid url image and image extension',
    INVALID_SORT_ORDER: 'Invalid sorting order'
  },
  COURSE_CATEGORY: {
    CATEGORY_ID_IS_REQUIRED: 'Category id is required',
    CATEGORY_NOT_FOUND: 'Category not found',
    CATEGORY_ID_IS_INVALID: 'Category id is invalid',
    CATEGORY_NAME_IS_REQUIRED: 'Category name is required',
    CATEGORY_NAME_MUST_BE_A_STRING: 'Category name must be a string',
    CATEGORY_NAME_EXIST: 'Category name exists',
    CATEGORY_NAME_LENGTH_IS_INVALID: 'Category name must be longer than 4 characters and less than 30 characters'
  },
  COURSE: {
    COURSE_ID_IS_REQUIRED: 'Course id is required',
    COURSE_NOT_FOUND: 'Course not found',
    COURSE_ID_IS_INVALID: 'Course id is invalid',
    COURSE_NAME_IS_REQUIRED: 'Course name is required',
    COURSE_NAME_MUST_BE_A_STRING: 'Course name must be a string',
    COURSE_CONTENT_MUST_BE_A_STRING: 'Course content must be a string',
    COURSE_NAME_EXIST: 'Course name exists',
    COURSE_NAME_LENGTH_IS_INVALID: 'Course name must be longer than 4 characters and less than 30 characters',
    COURSE_CONTENT_IS_REQUIRED: 'Course content is required',
    COURSE_CONTENT_LENGTH_IS_INVALID: 'Course content must be longer than 10 characters and less than 100000 characters',
    COURSE_CATEGORY_MUST_BE_A_STRING: 'Course content must be a string',
    COURSE_CATEGORY_IS_REQUIRED: 'Course name is required'
  },
  ROOM: {
    ROOM_EMOTE_MUST_BE_1_CHARACTER: 'Room emote must be 1 character',
    ROOM_NAME_CAN_NOT_CONTAIN_NEWLINE: 'Room name can not contains new line',
    ROOM_NEED_AT_LEAST_3_MEMBERS: 'Room  need at least 3 members',
    ROOM_IS_DELETED: 'Room is deleted',
    ROOM_NAME_IS_REQUIRED: 'Room name is required',
    ROOM_NAME_MUST_BE_A_STRING: 'Room name must be a string',
    ROOM_NAME_LENGTH_MUST_BE_FROM_1_TO_20: 'Room name must be longer than 1 characters and less than 20 characters',
    ROOM_TYPE_IS_REQUIRED: 'Room type is required',
    ROOM_TYPE_MUST_BE_A_STRING: 'Room type must be a string',
    ROOM_TYPE_IS_INVALID: 'Room type is invalid',
    ROOM_MEMBERS_IS_REQUIRED: 'Room members is required',
    ROOM_MEMBERS_MUST_BE_A_ARRAY: 'Room members must be an array',
    ROOM_ID_IS_REQUIRED: 'Room id is required',
    ROOM_ID_IS_INVALID: 'Room id is invalid',
    INVITE_RECIPIENT_IS_REQUIRED: 'Invite recipient is required',
    ROOM_WITH_ID_IS_NOT_EXIST: 'Room with id is not exist',
    SINGLE_ROOM_MUST_HAVE_2_MEMBER: 'Single room must have exactly two member',
    NOT_OWNER: "You don't own this room",
    MEMBER_NOT_FOUND: 'Member not found',
    ROOM_ALREADY_PRIVATE: 'Room already private',
    USER_ALREADY_IN_ROOM: 'User already in room',
    DUE_TO_IS_REQUIRED: 'Due to date is required',
    DUE_TO_DATE_IS_INVALID: 'Due to date is invalid',
    DUE_TO_DATE_CANNOT_BEFORE_NOW: 'Due to date can not be before now',
    USER_NOT_IN_ROOM: 'You not in this room',
    OWNER_CAN_NOT_BE_MEMBER: 'Owner can not be member of this room',
    CAN_NOT_CREATE_INVITATION_ON_SINGLE_ROOM: 'Can not create invite in direct chat room',
    CAN_NOT_DELETE_SINGLE_ROOM: 'Can not delete direct chat room',
    CAN_NOT_BAN_MEMBER_ON_SINGLE_ROOM: 'Can not ban member in direct chat room',
    CAN_NOT_KICK_MEMBER_ON_SINGLE_ROOM: 'Can not kick member in direct chat room',
    CAN_NOT_MAKE_ROOM_PRIVATE_ON_SINGLE_ROOM: 'Can not make room private to yourself',
    ROOM_EMOTE_MUST_BE_A_STRING: 'Room emote must be a string',
    EMOTE_MUST_BE_AN_EMOJI: 'Room emote must be a emoji',
    CAN_NOT_KICK_OWNER: 'Can not kick owner',
    CAN_NOT_BAN_OWNER: 'Can not ban owner',
    ROOM_MEMBERS_IS_NOT_UNIQUE: 'Room members must be unique',
    CAN_NOT_LEAVE_SINGLE_ROOM: 'Can not leave direct chat room',
    USER_IS_BANNED_FROM_ROOM: 'Can not invite user that is banned from room'
  },
  MESSAGE: {
    INDEX_IS_OUT_OF_BOUND: 'Index is out of bound',
    MESSAGE_NOT_FOUND: 'Message not found',
    MESSAGE_LENGTH_MUST_GREATER_THAN_2_AND_LESS_THAN_100: 'Message length must be greater than 2 and less than 100',
    MESSAGE_IS_REQUIRED: 'Message is required',
    MESSAGE_MUST_BE_STRING: 'Message must be a string',
    MESSAGE_ID_IS_REQUIRED: 'Message id is required',
    MESSAGE_ID_IS_INVALID: 'Message id is invalid',
    MESSAGE_WITH_ID_IS_NOT_EXIST: 'Message with id is not exist',
    CONTENT_MUST_BE_A_STRING: 'Content must be a string',
    CONTENT_LENGTH_MUST_BE_FROM_1_TO_1024: 'Content length must be greater than 0 or less than 1025 characters',
    ATTACHMENTS_MUST_BE_ARRAY: 'Attachments must be arrays',
    ATTACHMENT_TYPE_IS_REQUIRED: 'Attachment type is required',
    INVALID_ATTACHMENT_TYPE: 'Invalid attachment type',
    ATTACHMENT_CONTENT_IS_REQUIRED: 'Attachment content is required',
    ATTACHMENT_CONTENT_IS_NOT_VALID_URL: 'Attachment content is not valid URL',
    MESSAGE_NOT_OWN: 'This is not your message',
    MESSAGE_IS_EMPTY: 'Message is empty',
    EMOTE_IS_REQUIRED: 'Emote is required',
    EMOTE_IS_INVALID: 'Emote is invalid',
    EMOTE_MUST_BE_STRING: 'Emote must be a string',
    MESSAGE_INDEX_IS_REQUIRED: 'Message index is required',
    MESSAGE_INDEX_MUST_BE_INTEGER: 'Message index must be an integer greater than or equal to 0'
  },
  INVITATION: {
    INVITE_ID_IS_REQUIRED: 'Invite id is required',
    INVITATION_NOT_FOUND: 'Invitation not found',
    INVITATION_IS_ACCEPTED: 'Invitation already accepted',
    INVITATION_IS_REJECTED: 'Invitation already rejected',
    INVITATION_NOT_OWN: 'Invitation is not your',
    INVITE_ID_IS_INVALID: 'Invite id is invalid',
    INVITE_ALREADY_SENT: 'Invite already sent'
  },
  MEMBER: {
    NICKNAME_IS_REQUIRED: 'Nickname is required',
    NICKNAME_MUST_BE_STRING: 'Nickname must be a string',
    NICKNAME_LENGTH_MUST_GREATER_THAN_2_AND_LESS_THAN_31: 'Nickname length must greater than 2 and less than 31'
  }
} as const

export const REQUEST_QUERY_MESSAGES = {
  MAX_ITEM_PER_PAGE: 'How many items per page'
} as const

export const CLOUDINARY_MESSAGES = {
  CLOUDINARY_KEY: 'Key to access cloudinary',
  CLOUDINARY_SECRET: 'Password to access cloudinary',
  CLOUDINARY_NAME: 'Cloud name of current cloudinary account',
  CLOUDINARY_AVATAR_FOLDER: 'Folder that contain avatar images on cloudinary',
  CLOUDINARY_THUMBNAIL_FOLDER: 'Folder that contain thumbnail images on cloudinary',
  CLOUDINARY_BANNER_FOLDER: 'Folder that contain banner images on cloudinary',
  CLOUDINARY_IMAGE_FOLDER: 'Folder that contain image images on cloudinary',
  CLOUDINARY_ROOM_AVATAR_FOLDER: 'Folder that contain room avatar images on cloudinary',
  CLOUDINARY_ROOM_BACKGROUND_FOLDER: 'Folder that contain room background images on cloudinary'
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
