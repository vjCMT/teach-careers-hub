import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface User {
  id: string;
  email: string;
  role: 'employer' | 'college' | 'admin' | 'employee';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Load initial state from localStorage
const loadInitialState = (): AuthState => {
  const storedState = localStorage.getItem('authState');
  if (storedState) {
    try {
      return JSON.parse(storedState);
    } catch (error) {
      console.error('Error parsing stored auth state:', error);
    }
  }
  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      // Save to localStorage
      localStorage.setItem('authState', JSON.stringify(state));
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Clear from localStorage
      localStorage.removeItem('authState');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;