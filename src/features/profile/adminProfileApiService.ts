
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AdminProfile {
  id: string;
  userId: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdminProfileRequest {
  role: string;
  permissions: string[];
}

export const adminProfileApi = createApi({
  reducerPath: 'adminProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/profile/admin',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['AdminProfile'],
  endpoints: (builder) => ({
    getAdminProfile: builder.query<AdminProfile, void>({
      query: () => '/',
      providesTags: ['AdminProfile'],
    }),
    updateAdminProfileDetails: builder.mutation<AdminProfile, UpdateAdminProfileRequest>({
      query: (profileData) => ({
        url: '/details',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['AdminProfile'],
    }),
  }),
});

export const {
  useGetAdminProfileQuery,
  useUpdateAdminProfileDetailsMutation,
} = adminProfileApi;
