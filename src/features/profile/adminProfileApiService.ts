
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface AdminProfile {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  settings: {
    notifications: {
      emailNotifications: boolean;
      systemAlerts: boolean;
      userReports: boolean;
    };
  };
}

export interface AdminNotificationSettings {
  emailNotifications: boolean;
  systemAlerts: boolean;
  userReports: boolean;
}

export interface AdminProfileDetails {
  role: string;
  permissions: string[];
}

export const adminProfileApi = createApi({
  reducerPath: 'adminProfileApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/admin/',
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
      query: () => 'profile',
      providesTags: ['AdminProfile'],
    }),
    updateAdminNotificationSettings: builder.mutation<void, AdminNotificationSettings>({
      query: (settings) => ({
        url: 'settings/notifications',
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: ['AdminProfile'],
    }),
    updateAdminProfileDetails: builder.mutation<void, AdminProfileDetails>({
      query: (details) => ({
        url: 'profile',
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['AdminProfile'],
    }),
  }),
});

export const {
  useGetAdminProfileQuery,
  useUpdateAdminNotificationSettingsMutation,
  useUpdateAdminProfileDetailsMutation,
} = adminProfileApi;
