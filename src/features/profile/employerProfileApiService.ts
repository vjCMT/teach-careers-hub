
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateEmployerProfileRequest {
  companyName: string;
  phone: string;
}

export const employerProfileApi = createApi({
  reducerPath: 'employerProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/profile/employer',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['EmployerProfile'],
  endpoints: (builder) => ({
    getEmployerProfile: builder.query<EmployerProfile, void>({
      query: () => '/',
      providesTags: ['EmployerProfile'],
    }),
    updateEmployerProfileDetails: builder.mutation<EmployerProfile, UpdateEmployerProfileRequest>({
      query: (profileData) => ({
        url: '/details',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['EmployerProfile'],
    }),
  }),
});

export const {
  useGetEmployerProfileQuery,
  useUpdateEmployerProfileDetailsMutation,
} = employerProfileApi;
