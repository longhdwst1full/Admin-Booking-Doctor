import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist'

import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'

import { AuthApi } from './services/Auth/auth'
import { orderApi } from './services/Orders/orders.service'
import { userApi } from './services/Users/user.service'
import { clinicsApi } from './services/clinics'
import { doctorApi } from './services/docter'
import { roleApi } from './services/role.service'
import { servicesApi } from './services/services.service'
import { authReducer } from './slices/auth.slice'
import { themeReducer } from './slices/theme.slice'
import { userReducer } from './slices/user.slice'
import { specialtyApi } from './services/specialty'

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

const middlewares = [
  userApi.middleware,

  orderApi.middleware,

  AuthApi.middleware,

  doctorApi.middleware,
  roleApi.middleware,
  servicesApi.middleware,
  clinicsApi.middleware,
  specialtyApi.middleware
]

export const store = configureStore({
  reducer: {
    /* redux toolkit query */
    [userApi.reducerPath]: userApi.reducer,

    [orderApi.reducerPath]: orderApi.reducer,

    [AuthApi.reducerPath]: AuthApi.reducer,

    [doctorApi.reducerPath]: doctorApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [clinicsApi.reducerPath]: clinicsApi.reducer,
    [specialtyApi.reducerPath]: specialtyApi.reducer,
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
