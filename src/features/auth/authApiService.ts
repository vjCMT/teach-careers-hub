import { apiService } from '../api/apiService';
import { User } from './authSlice';

interface AuthResponse {
  success: boolean;
  user: User;
  message?: string;
}

interface MeResponse {
  success: boolean;
  data: User;
}

export const authApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: 'auth/me',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      transformResponse: (response: AuthResponse) => {
        console.log('Raw login response:', response);
        if (!response.success) {
          throw new Error(response.message || 'Login failed');
        }
        return response;
      },
      transformErrorResponse: (response) => {
        console.log('Login error response:', response);
        if (response.status === 'FETCH_ERROR') {
          return {
            status: 'FETCH_ERROR',
            data: {
              message: 'Unable to connect to the server. Please check if the server is running.'
            }
          };
        }
        return response;
      },
    }),
    signup: builder.mutation<AuthResponse, {
      fullName: string;
      email: string;
      password: string;
      confirmPassword: string;
      role: string;
    }>({
      query: (userInfo) => ({
        url: 'auth/signup',
        method: 'POST',
        body: userInfo,
        credentials: 'include',
      }),
      transformResponse: (response: AuthResponse) => {
        console.log('Raw signup response:', response);
        if (!response.success) {
          throw new Error(response.message || 'Signup failed');
        }
        return response;
      },
      transformErrorResponse: (response) => {
        console.log('Signup error response:', response);
        if (response.status === 'FETCH_ERROR') {
          return {
            status: 'FETCH_ERROR',
            data: {
              message: 'Unable to connect to the server. Please check if the server is running.'
            }
          };
        }
        return response;
      },
    }),
    updatePassword: builder.mutation<{ success: boolean; message: string }, {
      currentPassword: string;
      newPassword: string;
    }>({
      query: (credentials) => ({
        url: 'auth/updatepassword',
        method: 'PUT',
        body: credentials,
        credentials: 'include',
      }),
    }),
    deleteAccount: builder.mutation<{ success: boolean; message: string }, {
      password: string;
    }>({
      query: (credentials) => ({
        url: 'auth/deleteaccount',
        method: 'DELETE',
        body: credentials,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useLogoutMutation,
} = authApi;