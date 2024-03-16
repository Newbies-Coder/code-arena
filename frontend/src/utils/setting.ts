import { userType } from '@/@types/user.type'

export const config = {
  setCookie: (name: string, value: string, days: number) => {
    var expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  },
  getCookie: (name: string) => {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  },
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
  clearCookie: (name: string) => {
    document.cookie = name + '=; Path=/; Expires=' + new Date().toUTCString() + ';'
  },
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',

  //count number of objects in an array
  objectLength: (obj: userType[]) => {
    var result = 0
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        result++
      }
    }
    return result
  },
}

export const {
  getStore,
  setStore,
  setStoreJson,
  getStoreJson,
  clearStore,
  setCookie,
  getCookie,
  clearCookie,
  objectLength,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} = config

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
