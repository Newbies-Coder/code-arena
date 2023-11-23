import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer/userReducer'

export const store = configureStore({
  reducer: {
    userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type DispathType = typeof store.dispatch
