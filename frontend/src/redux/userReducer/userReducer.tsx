import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userType, userState } from '@/@types/user.type'

const initialState: userState = {
  login: null,
  register: null,
  verify: null,
  resendOTP: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  email: null,
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    // Action to handle user login
    setLoginDetails: (state: userState, action: PayloadAction<userType>) => {
      state.login = action.payload
    },
    // Action to handle user registration
    setRegistrationDetails: (state: userState, action: PayloadAction<userType>) => {
      state.register = action.payload
    },
    // Action to handle user verification
    setVerificationDetails: (state: userState, action: PayloadAction<userType>) => {
      state.verify = action.payload
    },
    // Action to resend OTP
    setOTPResendDetails: (state: userState, action: PayloadAction<userType>) => {
      state.verify = action.payload
    },
    // Toggle loading state
    setLoadingStatus: (state: userState, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    // Update authentication status
    setAuthenticationStatus: (state: userState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    // Check if the user is an admin
    setAdminStatus: (state: userState, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    userEmail: (state: userState, action: PayloadAction<string>) => {
      state.email = action.payload
    },
  },
})

export const {
  setLoginDetails,
  setRegistrationDetails,
  setVerificationDetails,
  setOTPResendDetails,
  setLoadingStatus,
  setAdminStatus,
  setAuthenticationStatus,
  userEmail,
} = userReducer.actions

export default userReducer.reducer
