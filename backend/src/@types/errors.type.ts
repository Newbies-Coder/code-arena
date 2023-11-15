export type ErrorType = {
  statusCode: number
  message: string
  created_at?: string
  updated_at?: string
  messageConstants?: string
}
export type ErrorEntityType = {
  msg: string
  [key: string]: any
}
