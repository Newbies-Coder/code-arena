import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer/userReducer'
import { api } from '@/apis/api'

export const store = configureStore({
  reducer: {
    userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
