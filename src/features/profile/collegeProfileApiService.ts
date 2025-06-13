import { apiService } from '../api/apiService';

export const collegeProfileApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getCollegeProfile: builder.query<any, void>({
      query: () => 'college/profile',
      providesTags: ['CollegeProfile'],
    }),
    updateCollegeProfileDetails: builder.mutation<any, Partial<any>>({
      query: (details) => ({ url: 'college/profile', method: 'PUT', body: details }),
      invalidatesTags: ['CollegeProfile'],
    }),
  }),
});

export const { useGetCollegeProfileQuery, useUpdateCollegeProfileDetailsMutation } = collegeProfileApi;