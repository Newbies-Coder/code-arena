import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType, RootState } from '../config'
import { userLoginType, userState, userType } from '@/@types/user.type'
import { ACCESS_TOKEN, getStore, http, setStore } from '@/utils/setting'
import { history } from '@/main'
import { LoginFieldType } from '@/@types/form.type'
import { AxiosError } from 'axios'

const initialState: userState = {
  login: null,
  register: {},
  verify: {},
  resendOTP: {},
  loading: false,
  error: null,
  isAdmin: false,
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    //
    loginAction: (state: userState, action: PayloadAction<userLoginType>) => {
      state.login = action.payload
    },
    registerAction: (state: userState, action: PayloadAction<userType>) => {
      state.register = action.payload
    },
    verifyAction: (state: userState, action: PayloadAction<userType>) => {
      state.verify = action.payload
    },
    resendOTPAction: (state: userState, action: PayloadAction<userType>) => {
      state.verify = action.payload
    },
    loadingAction: (state: userState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    loginFailAction: (state: userState, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    authAction: (state: userState, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
  },
})

export const {
  loginAction,
  registerAction,
  verifyAction,
  resendOTPAction,
  loadingAction,
  loginFailAction,
  authAction,
} = userReducer.actions

export default userReducer.reducer

/*--------------- Action async --------------- */

export const loginApi = (userLogin: LoginFieldType) => {
  return async (dispatch: DispatchType) => {
    try {
      const storedAC = getStore(ACCESS_TOKEN)
      if (storedAC) {
        const storedData: userLoginType = {
          _id: '',
          username: '',
          email: '',
          access_token: storedAC,
          refresh_token: '',
        }
        const action: PayloadAction<userLoginType> = loginAction(storedData)
        dispatch(action)
        history.push('/')
        return
      }
      const response = await http.post('/users/login', userLogin)
      let { data } = response.data
      const action: PayloadAction<userLoginType> = loginAction(data)
      dispatch(action)
      //save access token to local storage
      setStore(ACCESS_TOKEN, data.access_token)
      history.push('/')
    } catch (error: any) {
      let errorMessage = 'login fail'
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response?.data.message || errorMessage
      }
      dispatch(loginFailAction(errorMessage))
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
