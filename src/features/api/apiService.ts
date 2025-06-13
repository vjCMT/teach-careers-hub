import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../app/store';

// Get the API URL from environment variables
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

console.log('API URL:', API_URL); // Debug log

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

// Add logging for debugging
const baseQueryWithLogging = async (args: any, api: any, extraOptions: any) => {
  try {
    console.log('API Request:', {
      url: `${API_URL}${args.url}`,
      method: args.method,
      body: args.body,
    });
    
    const result = await baseQuery(args, api, extraOptions);
    console.log('API Response:', result);
    
    if (result.error) {
      console.error('API Error:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('API Request Failed:', error);
    return {
      error: {
        status: 'FETCH_ERROR',
        error: 'Failed to connect to the server. Please check if the server is running.',
      },
    };
  }
};

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithLogging,
  tagTypes: ['User', 'EmployerProfile', 'CollegeProfile', 'AdminProfile', 'Job', 'Application'],
  endpoints: () => ({}),
});