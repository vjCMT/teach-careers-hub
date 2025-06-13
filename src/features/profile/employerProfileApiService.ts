import { apiService } from '../api/apiService';

export const employerProfileApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getEmployerProfile: builder.query<any, void>({
      query: () => 'employer/profile',
      providesTags: ['EmployerProfile'],
    }),
    updateEmployerProfileDetails: builder.mutation<any, Partial<any>>({
      query: (details) => ({ url: 'employer/profile', method: 'PUT', body: details }),
      invalidatesTags: ['EmployerProfile'],
    }),
    updateEmployerNotificationSettings: builder.mutation<any, any>({
      query: (settings) => ({ url: 'employer/settings/notifications', method: 'PUT', body: settings }),
      invalidatesTags: ['EmployerProfile'],
    }),
  }),
});

export const { 
  useGetEmployerProfileQuery, 
  useUpdateEmployerProfileDetailsMutation,
  useUpdateEmployerNotificationSettingsMutation
} = employerProfileApi;