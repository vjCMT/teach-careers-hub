
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApiService';
import { employerProfileApi } from '../features/profile/employerProfileApiService';
import { collegeProfileApi } from '../features/profile/collegeProfileApiService';
import { adminProfileApi } from '../features/profile/adminProfileApiService';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [employerProfileApi.reducerPath]: employerProfileApi.reducer,
    [collegeProfileApi.reducerPath]: collegeProfileApi.reducer,
    [adminProfileApi.reducerPath]: adminProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(
      authApi.middleware,
      employerProfileApi.middleware,
      collegeProfileApi.middleware,
      adminProfileApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
