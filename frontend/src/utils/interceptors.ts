import axios from 'axios'
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  clearCookie,
  clearStore,
  getCookie,
  getStore,
  setCookie,
  setStore,
} from './setting'

const token = getStore(ACCESS_TOKEN)
const refresh = getCookie(REFRESH_TOKEN)

export default function requestApi(endpoint: string, method: string, body: any, header?: any) {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  const headers = {
    ...defaultHeaders,
    ...header,
  }

  const instance = axios.create({ headers })

  // set up send request
  instance.interceptors.request.use(
    (config: any) => {
      if (token) {
        config.headers = {
          ...config.headers,
          ['Authorization']: `Bearer ${token}`,
        }
      }
      return config
    },
    (error) => {
      Promise.reject(error)
    },
  )

  // set up receive response
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (err) => {
      const originalResponse = err.config

      //access token expires => status code 401
      if (err.response && err.response.status === 401 && refresh && token) {
        try {
          const result = await instance.post('http://localhost:8080/api/v1/users/refresh-token', {
            refresh_token: refresh,
          })
          const { access_token, refresh_token } = result.data.data
          //save new AT & RT into storage
          setStore(ACCESS_TOKEN, access_token)
          setCookie(REFRESH_TOKEN, refresh_token, 7)
          originalResponse.headers['Authorization'] = `Bearer ${access_token}`
          return instance(originalResponse)
        } catch (error: any) {
          if (error?.response?.status === 404) {
            clearStore(ACCESS_TOKEN)
            clearCookie(REFRESH_TOKEN)
            window.location.href = '/login'
          }
          return Promise.reject(error)
        }
      }
      return Promise.reject(err)
    },
  )

  return instance.request({
    method: method,
    url: `http://localhost:8080/api/v1/${endpoint}`,
    data: body,
  })
}
