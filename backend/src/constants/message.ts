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

export const USER_VALIDATOR_MESSAGES = {
  TITLE: 'Validation error'
} as const
