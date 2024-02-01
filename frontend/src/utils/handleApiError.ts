import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { StatusCodes } from 'http-status-codes'

export const handleApiError = (error: unknown) => {
  if (!(error instanceof Error)) {
    toast.error('An unknown error occurred')
    return
  }

  const axiosError = error as AxiosError // Replace with your HTTP client error type
  if (!axiosError.response) {
    toast.error(error.message)
    return
  }

  const { status, data } = axiosError.response
  const { message, errors } = data as { message: string; errors?: { [key: string]: { msg: string } } }

  if (status === StatusCodes.UNPROCESSABLE_ENTITY && errors?.password) {
    toast.error(errors.password.msg)
  } else {
    toast.error(message)
  }
}
