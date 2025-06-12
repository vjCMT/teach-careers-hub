
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CollegeProfile {
  id: string;
  email: string;
  phone: string;
  collegeName: string;
  address: string;
  settings: {
    notifications: {
      emailNotifications: boolean;
      studentUpdates: boolean;
      recruitmentAlerts: boolean;
    };
  };
}

export interface CollegeNotificationSettings {
  emailNotifications: boolean;
  studentUpdates: boolean;
  recruitmentAlerts: boolean;
}

export interface CollegeProfileDetails {
  phone: string;
  collegeName: string;
  address: string;
}

export const collegeProfileApi = createApi({
  reducerPath: 'collegeProfileApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/college/',
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
      query: () => 'profile',
      providesTags: ['CollegeProfile'],
    }),
    updateCollegeNotificationSettings: builder.mutation<void, CollegeNotificationSettings>({
      query: (settings) => ({
        url: 'settings/notifications',
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: ['CollegeProfile'],
    }),
    updateCollegeProfileDetails: builder.mutation<void, CollegeProfileDetails>({
      query: (details) => ({
        url: 'profile',
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['CollegeProfile'],
    }),
  }),
});

export const {
  useGetCollegeProfileQuery,
  useUpdateCollegeNotificationSettingsMutation,
  useUpdateCollegeProfileDetailsMutation,
} = collegeProfileApi;
