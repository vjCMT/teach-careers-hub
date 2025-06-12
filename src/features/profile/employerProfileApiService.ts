
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface EmployerProfile {
  id: string;
  email: string;
  phone: string;
  companyName: string;
  settings: {
    notifications: {
      emailNotifications: boolean;
      pushNotifications: boolean;
      jobAlerts: boolean;
      messageNotifications: boolean;
      marketingEmails: boolean;
    };
  };
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  jobAlerts: boolean;
  messageNotifications: boolean;
  marketingEmails: boolean;
}

export interface EmployerProfileDetails {
  phone: string;
  companyName: string;
}

export const employerProfileApi = createApi({
  reducerPath: 'employerProfileApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/employer/',
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
      query: () => 'profile',
      providesTags: ['EmployerProfile'],
    }),
    updateNotificationSettings: builder.mutation<void, NotificationSettings>({
      query: (settings) => ({
        url: 'settings/notifications',
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: ['EmployerProfile'],
    }),
    updateEmployerProfileDetails: builder.mutation<void, EmployerProfileDetails>({
      query: (details) => ({
        url: 'profile',
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: ['EmployerProfile'],
    }),
  }),
});

export const {
  useGetEmployerProfileQuery,
  useUpdateNotificationSettingsMutation,
  useUpdateEmployerProfileDetailsMutation,
} = employerProfileApi;
