
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CollegeProfile {
  id: string;
  userId: string;
  collegeName: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCollegeProfileRequest {
  collegeName: string;
  phone: string;
  address: string;
}

export const collegeProfileApi = createApi({
  reducerPath: 'collegeProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/profile/college',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['CollegeProfile'],
  endpoints: (builder) => ({
    getCollegeProfile: builder.query<CollegeProfile, void>({
      query: () => '/',
      providesTags: ['CollegeProfile'],
    }),
    updateCollegeProfileDetails: builder.mutation<CollegeProfile, UpdateCollegeProfileRequest>({
      query: (profileData) => ({
        url: '/details',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['CollegeProfile'],
    }),
  }),
});

export const {
  useGetCollegeProfileQuery,
  useUpdateCollegeProfileDetailsMutation,
} = collegeProfileApi;
