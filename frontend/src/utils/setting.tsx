import axios from 'axios'
import { isExpired } from 'react-jwt'
import { history } from '../main'
export const config = {
  getStore: (name: string) => {
    if (localStorage.getItem(name)) {
      return localStorage.getItem(name)
    }
    return null
  },
  setStore: (name: string, value: any) => {
    localStorage.setItem(name, value)
  },
  setStoreJson: (name: string, value: any) => {
    let json = JSON.stringify(value)
    localStorage.setItem(name, json)
  },
  getStoreJson: (name: string) => {
    if (localStorage.getItem(name)) {
      let result: any = localStorage.getItem(name)
      return JSON.parse(result)
    }
    return null
  },
  clearStore: (name: string) => {
    localStorage.removeItem(name)
  },
  ACCESS_TOKEN: 'accessToken',
  USER_LOGIN: 'userLogin',
}

export const { getStore, setStore, setStoreJson, getStoreJson, clearStore, ACCESS_TOKEN, USER_LOGIN } = config

const DOMAIN = 'https://jiranew.cybersoft.edu.vn/api'
const TOKEN_CODEARENA =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNUUiLCJIZXRIYW5TdHJpbmciOiIwNy8wNi8yMDIzIiwiSGV0SGFuVGltZSI6IjE2ODYwOTYwMDAwMDAiLCJuYmYiOjE2NTczODYwMDAsImV4cCI6MTY4NjI0MzYwMH0.XsCcIZvawxcwye8KVYB2vJK4d3Gbr1XROtNyAL8nypA'

/* Cấu hình request cho tất cả api - response cho tất cả kết quả từ api trả về */

//Cấu hình domain gửi đi
export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
})
//Cấu hình request header
http.interceptors.request.use(
  (config: any) => {
    const token = getStoreJson(ACCESS_TOKEN)
    config.headers = {
      ...config.headers,
      // eslint-disable-next-line no-useless-computed-key
      ['Authorization']: `Bearer ${token}`,
      // eslint-disable-next-line no-useless-computed-key
      ['TokenCodeArena']: TOKEN_CODEARENA,
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
//Cấu hình kết quả trả về
http.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    // const originalRequest = error.config;
    console.log(err.response.status)
    if (err.response.status === 400 || err.response.status === 404) {
    }
    if (err.response.status === 401 || err.response.status === 403) {
      const isMyTokenExpired = isExpired(getStoreJson(ACCESS_TOKEN))
      //token hết hạn
      if (isMyTokenExpired) {
        alert('Hết phiên đăng nhập yêu cầu đăng nhập lại !')
        clearStore(ACCESS_TOKEN)
        clearStore(USER_LOGIN)
        //Chuyển hướng trang dạng f5
        window.location.href = '/login'
      }
      history.push('/login')
    }
    return Promise.reject(err)
  },
)
/**
 * status code
 * 400: Tham số gửi lên không hợp lệ => kết quả không tìm được (Badrequest);
 * 404: Tham số gửi lên hợp lệ nhưng không tìm thấy => Có thể bị xoá rồi (Not found) ...
 * 200: Thành công, OK
 * 201: Đã được tạo thành công => (Mình đã tạo rồi sau đó request tiếp thì sẽ trả 201) (Created)
 * 401: Không có quyền truy cập vào api đó (Unauthorize - Có thể do token không hợp lệ hoặc bị admin chặn )
 * 403: Chưa đủ quyền truy cập vào api đó (Forbiden - token hợp lệ tuy nhiên token đó chưa đủ quyền truy cập vào api)
 * 500: Lỗi xảy ra tại server (Nguyên nhân có thể frontend gửi dữ liệu không hợp lệ => backend trong quá trình xử lý code gây ra lỗi hoặc do backend code bị lỗi => Error in server )
 */
