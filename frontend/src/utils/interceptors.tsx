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

export default function requestApi(endpoint: string, method: string, body: any) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  const instance = axios.create({ headers })

  // set up send request
  instance.interceptors.request.use(
    (config: any) => {
      const token = getStore(ACCESS_TOKEN)
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
      const refresh = getCookie(REFRESH_TOKEN)
      console.log('AT het han')
      if (err.response && err.response.status === 401 && refresh) {
        try {
          console.log('call refresh token')
          console.log('rf///' + refresh)

          const result = await instance.post('http://localhost:8080/api/v1/users/refresh-token', {
            refresh_token: refresh,
          })
          console.log('call xong')

          const { access_token, refresh_token } = result.data.data
          console.log('result' + result)

          console.log('ac///' + access_token)
          setStore(ACCESS_TOKEN, access_token)
          setCookie(REFRESH_TOKEN, refresh_token, 7)
          originalResponse.headers['Authorization'] = `Bearer ${access_token}`
          console.log('lay AT moi xong')

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
