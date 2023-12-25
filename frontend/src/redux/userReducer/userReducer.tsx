import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../config'
import { userState, userType } from 'src/@types/user'
import axios from 'axios'

const initialState: userState = {
  userLogin: {},
  userRegister: {},
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
  },
})

export const { loginAction, registerAction } = userReducer.actions

export default userReducer.reducer

/*--------------- Action async --------------- */

export const loginApi = (userLogin: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/login`, userLogin)
      const userData = response.data
      dispatch(loginAction(userData))
      console.log('success:', userData)
    } catch (error) {
      console.log(error)
    }
  }
}

export const registerApi = (userRegister: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/register`, userRegister)
      const userData = response.data
      dispatch(registerAction(userData))
      console.log('success:', userData)
    } catch (error) {
      console.log(error)
    }
  }
}
