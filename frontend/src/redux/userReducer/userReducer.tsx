import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../config'
import { userState, userType } from 'src/@types/user'
import { ACCESS_TOKEN, http, setStore } from '@/utils/setting'
import { history } from '@/main'

const initialState: userState = {
  userLogin: {},
  userRegister: {},
  userVerify: {},
  userResendOTP: {},
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state: userState, action: PayloadAction<userType>) => {
      state.userLogin = action.payload
    },
    registerAction: (state: userState, action: PayloadAction<userType>) => {
      state.userRegister = action.payload
    },
    verifyAction: (state: userState, action: PayloadAction<userType>) => {
      state.userVerify = action.payload
    },
    resendOTPAction: (state: userState, action: PayloadAction<userType>) => {
      state.userVerify = action.payload
    },
  },
})

export const { loginAction, registerAction, verifyAction, resendOTPAction } = userReducer.actions

export default userReducer.reducer

/*--------------- Action async --------------- */

export const loginApi = (userLogin: userType) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await http.post('/users/login', userLogin)
      let { data } = response.data
      const action: PayloadAction<userType> = loginAction(data)
      dispatch(action)
      setStore(ACCESS_TOKEN, data.access_token)
      history.push('/')
    } catch (error) {
      console.error('error:', error)
      // if (error instanceof AxiosError) {
      //   alert(error.response?.data.message)
      // }
    }
  }
}

export const registerApi = (userRegister: userType) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await http.post('/users/register', userRegister)
      let { data } = response.data
      const action: PayloadAction<userType> = registerAction(data)
      dispatch(action)
      setStore(ACCESS_TOKEN, data.access_token)
      history.push('/verification')
    } catch (error) {
      console.error('error:', error)
    }
  }
}

export const verifyApi = (userVerify: userType) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await http.post('/users/verify-otp', userVerify)
      let { data } = response.data
      const action: PayloadAction<userType> = verifyAction(data)
      dispatch(action)
      setStore(ACCESS_TOKEN, data.access_token)
      history.push('/login')
    } catch (error) {
      console.error('error:', error)
    }
  }
}

export const resendOTPApi = (userResendOTP: userType) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await http.post('/users/resend-verify-otp', userResendOTP)
      let { data } = response.data
      const action: PayloadAction<userType> = resendOTPAction(data)
      dispatch(action)
      setStore(ACCESS_TOKEN, data.access_token)
      history.push('/')
    } catch (error) {
      console.error('error:', error)
    }
  }
}
