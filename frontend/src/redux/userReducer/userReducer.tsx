import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispathType } from '../config'
import { userState, userType } from 'src/@types/user'

const initialState: userState = {
  userLogin: {},
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state: userState, action: PayloadAction<userType>) => {
      state.userLogin = action.payload
    },
  },
})

export const { loginAction } = userReducer.actions

export default userReducer.reducer

/*--------------- Action async --------------- */

export const loginApi = (userLogin: userType) => {
  return async (dispatch: DispathType) => {}
}
