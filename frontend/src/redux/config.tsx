import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from '@/apis/api'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import userReducer from './userReducer'

const reducers = combineReducers({
  user: userReducer,
  [api.reducerPath]: api.reducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['[api.reducerPath]'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch

export const persistor = persistStore(store)
