
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: string;
  email: string;
  role: 'employer' | 'college' | 'admin';
}

export interface AuthResponse {
  data: User;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountRequest {
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/auth/',
    prepareHeaders: (headers) => {
      // Add auth token if available
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<AuthResponse, void>({
      query: () => 'me',
      providesTags: ['User'],
    }),
    updatePassword: builder.mutation<void, UpdatePasswordRequest>({
      query: (credentials) => ({
        url: 'updatepassword',
        method: 'PUT',
        body: credentials,
      }),
    }),
    deleteAccount: builder.mutation<void, DeleteAccountRequest>({
      query: (credentials) => ({
        url: 'deleteaccount',
        method: 'DELETE',
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
} = authApi;
