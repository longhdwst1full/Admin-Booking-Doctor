import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'

import { AuthApi } from './services/Auth/auth'

import { authReducer } from './slices/auth.slice'
import { themeReducer } from './slices/theme.slice'
import { userReducer } from './slices/user.slice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [AuthApi.middleware]

export const store = configureStore({
  reducer: {
    /* redux toolkit query */

    [AuthApi.reducerPath]: AuthApi.reducer,

    /* redux toolkit */
    persistedReducer,
    theme: themeReducer,

    user: userReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(...middlewares)
})

export const persistor = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
