import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userType, userState } from '@/@types/user.type'

const initialState: userState = {
  login: null,
  register: null,
  verify: null,
  resendOTP: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isAdmin: false,
  email: null,
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    //
    loginAction: (state: userState, action: PayloadAction<userType>) => {
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
      state.isAuthenticated = action.payload
    },
    checkAdminAction: (state: userState, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    userEmail: (state: userState, action: PayloadAction<string>) => {
      state.email = action.payload
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
  userEmail,
} = userReducer.actions

export default userReducer.reducer
