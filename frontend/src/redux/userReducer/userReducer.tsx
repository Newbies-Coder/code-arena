import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../config'
import { userLoginType, userState, userType } from '@/@types/user.type'
import { ACCESS_TOKEN, http, setStore } from '@/utils/setting'
import { history } from '@/main'
import { LoginFieldType } from '@/@types/form.type'

const initialState: userState = {
  userLogin: null,
  userRegister: {},
  userVerify: {},
  userResendOTP: {},
  loading: false,
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    //
    loginAction: (state: userState, action: PayloadAction<userLoginType>) => {
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
    loadingAction: (state: userState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { loginAction, registerAction, verifyAction, resendOTPAction, loadingAction } = userReducer.actions

export default userReducer.reducer

/*--------------- Action async --------------- */

//fetch login api
export const loginApi = (userLogin: LoginFieldType) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await http.post('/users/login', userLogin)
      let { data, message } = response.data
      const action: PayloadAction<userLoginType> = loginAction(data)
      dispatch(action)
      //save access token to local storage
      setStore(ACCESS_TOKEN, data.access_token)
      history.push('/')
    } catch (error) {
      console.error('error:', error)
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
