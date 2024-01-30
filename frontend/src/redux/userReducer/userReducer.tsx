import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userLoginType, userState, userType } from '@/@types/user.type'

const initialState: userState = {
  login: null,
  register: {},
  verify: {},
  resendOTP: {},
  loading: false,
  error: null,
  isLogin: false,
  isAdmin: false,
  accessToken: null,
  refreshToken: null,
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
      state.isLogin = action.payload
    },
    checkAdminAction: (state: userState, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    accessTokenReceived: (state: userState, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    logoutAction: (state: userState) => {
      state.accessToken = null
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
  checkAdminAction,
  logoutAction,
} = userReducer.actions

export default userReducer.reducer
