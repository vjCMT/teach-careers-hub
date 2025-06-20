import { apiService } from '../api/apiService';

interface SingleItemApiResponse {
  success: boolean;
  data: any;
}

interface ApiResponse {
  success: boolean;
  count?: number;
  data: any;
}

export const adminApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<any, void>({
        query: () => 'admin/stats',
        providesTags: ['User', 'Job', 'Application'],
    }),
    getSystemActivity: builder.query<any[], void>({
        query: () => 'notifications/activity',
        providesTags: ['Notification'],
    }),
    getAdminProfile: builder.query<any, void>({
        query: () => 'admin/profile',
        providesTags: ['AdminProfile'],
    }),
    updateAdminProfile: builder.mutation<any, Partial<any>>({
        query: (profileData) => ({
            url: 'admin/profile',
            method: 'PUT',
            body: profileData,
        }),
        invalidatesTags: ['AdminProfile'],
    }),
    getPendingApprovalJobs: builder.query<any[], void>({
        query: () => 'admin/jobs/pending-approval',
        providesTags: ['Job'],
    }),
    getAllJobsForAdmin: builder.query<any[], void>({
      query: () => 'admin/jobs',
      providesTags: (result) => result ? [...result.map(({ _id }) => ({ type: 'Job' as const, id: _id })), { type: 'Job', id: 'LIST' }] : [{ type: 'Job', id: 'LIST' }],
    }),
    getJobDetailsForAdmin: builder.query<any, string>({
        query: (jobId) => `admin/jobs/${jobId}`,
        providesTags: (result, error, id) => [{ type: 'Job', id }],
    }),
    createJobByAdmin: builder.mutation<any, any>({
      query: (jobData) => ({ url: 'admin/jobs', method: 'POST', body: jobData }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    updateJobByAdmin: builder.mutation<any, { jobId: string; data: any }>({
      query: ({ jobId, data }) => ({ url: `admin/jobs/${jobId}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { jobId }) => [{ type: 'Job', id: jobId }, { type: 'Job', id: 'LIST' }],
    }),
    deleteJobByAdmin: builder.mutation<any, string>({
      query: (jobId) => ({ url: `admin/jobs/${jobId}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Job', id: 'LIST' }],
    }),
    manageJobStatus: builder.mutation<any, { jobId: string; status: string }>({
      query: ({ jobId, status }) => ({ url: `admin/jobs/${jobId}/manage`, method: 'PUT', body: { status } }),
      invalidatesTags: (result, error, { jobId }) => [{ type: 'Job', id: jobId }, { type: 'Job', id: 'LIST' }],
    }),
    getUsersByRole: builder.query<any[], { role: string }>({
      query: ({ role }) => `admin/users?role=${role}`,
      providesTags: ['User'],
    }),
    getApplicationsForAdmin: builder.query<any[], void>({
      query: () => 'admin/applications',
      providesTags: ['Application'],
    }),
    updateApplicationByAdmin: builder.mutation<any, { appId: string; body: any }>({
        query: ({ appId, body }) => ({
            url: `admin/applications/${appId}`,
            method: 'PUT',
            body,
        }),
        invalidatesTags: ['Application'],
    }),
    getPendingApplications: builder.query<any[], void>({
        query: () => 'admin/applications/pending-approval',
        providesTags: ['Application'],
    }),
    forwardInterview: builder.mutation<any, string>({
      query: (appId) => ({ url: `admin/applications/${appId}/forward-interview`, method: 'PUT' }),
      invalidatesTags: ['Application'],
    }),
    forwardOffer: builder.mutation<any, string>({
      query: (appId) => ({ url: `admin/applications/${appId}/forward-offer`, method: 'PUT' }),
      invalidatesTags: ['Application'],
    }),
    getAllUsers: builder.query<any[], void>({
        query: () => 'admin/users/all',
        providesTags: ['User'],
    }),
    getFullUserDetails: builder.query<any, string>({
        query: (userId) => `admin/users/${userId}`,
        providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUserStatus: builder.mutation<any, { userId: string; status: string }>({
        query: ({ userId, status }) => ({ url: `admin/users/${userId}/status`, method: 'PUT', body: { status }, }),
        invalidatesTags: (result, error, { userId }) => [{ type: 'User', id: userId }, { type: 'User' }],
    }),
    updateCollegeProfileByAdmin: builder.mutation<any, { userId: string; data: any }>({
        query: ({ userId, data }) => ({ url: `admin/users/college/${userId}/profile`, method: 'PUT', body: data }),
        invalidatesTags: (result, error, { userId }) => [{ type: 'User', id: userId }, { type: 'User' }],
    }),
    updateEmployerProfileByAdmin: builder.mutation<any, { userId: string; data: any }>({
        query: ({ userId, data }) => ({ url: `admin/users/employer/${userId}/profile`, method: 'PUT', body: data }),
        invalidatesTags: (result, error, { userId }) => [{ type: 'User', id: userId }, { type: 'User' }],
    }),
    deleteUserByAdmin: builder.mutation<any, string>({
        query: (userId) => ({ url: `admin/users/${userId}`, method: 'DELETE' }),
        invalidatesTags: ['User'],
    }),
    getAllCareerArticles: builder.query<ApiResponse, string | void>({
      query: (category) => {
        if (category) {
          return `/career-articles?category=${encodeURIComponent(category)}`;
        }
        return "/career-articles";
      },
      providesTags: ["CareerArticle"],
    }),
    getArticleBySlug: builder.query<SingleItemApiResponse, string>({
      query: (slug) => `/career-articles/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "CareerArticle", id: slug },
      ],
    }),
    createArticle: builder.mutation<any, any>({
      query: (articleData) => ({
        url: "/career-articles",
        method: "POST",
        body: articleData,
      }),
      invalidatesTags: ["CareerArticle"],
    }),
    updateArticle: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/career-articles/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "CareerArticle", id },
        "CareerArticle",
      ],
    }),
    deleteArticle: builder.mutation<any, string>({
      query: (id) => ({
        url: `/career-articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CareerArticle"],
    }),
    getAllSalaryGuides: builder.query<ApiResponse, void>({
      query: () => "/salary-guide",
      providesTags: ["SalaryGuide"],
    }),
    getSalaryGuideById: builder.query<SingleItemApiResponse, string>({
      query: (id) => `/salary-guide/${id}`,
      providesTags: (result, error, id) => [{ type: "SalaryGuide", id }],
    }),
    createSalaryGuide: builder.mutation<any, any>({
      query: (salaryData) => ({
        url: "/salary-guide",
        method: "POST",
        body: salaryData,
      }),
      invalidatesTags: ["SalaryGuide"],
    }),
    updateSalaryGuide: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/salary-guide/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "SalaryGuide", id },
        "SalaryGuide",
      ],
    }),
    deleteSalaryGuide: builder.mutation<any, string>({
      query: (id) => ({
        url: `/salary-guide/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SalaryGuide"],
    }),
    getPublicJobs: builder.query<any[], void>({
      query: () => "/jobs",
      providesTags: ["Job"],
    }),

  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetSystemActivityQuery,
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useGetPendingApprovalJobsQuery,
  useGetAllJobsForAdminQuery,
  useGetJobDetailsForAdminQuery,
  useCreateJobByAdminMutation,
  useUpdateJobByAdminMutation,
  useDeleteJobByAdminMutation,
  useManageJobStatusMutation,
  useGetUsersByRoleQuery,
  useGetApplicationsForAdminQuery,
  useUpdateApplicationByAdminMutation,
  useGetPendingApplicationsQuery,
  useForwardInterviewMutation,
  useForwardOfferMutation,
  useGetAllUsersQuery,
  useGetFullUserDetailsQuery,
  useUpdateUserStatusMutation,
  useUpdateCollegeProfileByAdminMutation,
  useUpdateEmployerProfileByAdminMutation,
  useDeleteUserByAdminMutation,
  useGetAllCareerArticlesQuery,
  useGetArticleBySlugQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  useGetAllSalaryGuidesQuery,
  useGetSalaryGuideByIdQuery,
  useCreateSalaryGuideMutation,
  useUpdateSalaryGuideMutation,
  useDeleteSalaryGuideMutation,
  useGetPublicJobsQuery,
} = adminApi;