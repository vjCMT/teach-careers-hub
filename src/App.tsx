
// App.tsx
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { useGetMeQuery } from './features/auth/authApiService';
import {
  logOut,
  selectIsAuthenticated,
  setCredentials,
} from './features/auth/authSlice';
import i18n from './i18n/config';

import Login from './components/Login';
import Signup from './components/Signup';
import DashboardLayout from './components/DashboardLayout';

// Import all dashboard pages
import EmployeeProfile from './pages/dashboard/employee/EmployeeProfile';
import EmployeeSkills from './pages/dashboard/employee/EmployeeSkills';
import EmployeeJobs from './pages/dashboard/employee/EmployeeJobs';
import MyApplications from './pages/dashboard/employee/MyApplications';

import CollegeProfile from './pages/dashboard/college/CollegeProfile';
import PostJob from './pages/dashboard/college/PostJob';

import AdminJobs from './pages/dashboard/admin/AdminJobs';
import AdminUsers from './pages/dashboard/admin/AdminUsers';

// Import existing pages
import CareerGuide from './pages/CareerGuide';
import CompanyReviews from './pages/CompanyReviews';
import FindCV from './pages/FindCV';
import Help from './pages/Help';
import Index from './pages/Index';
import JobDetailPage from './pages/Jobfulldetailspage';
import Messages from './pages/Messages';
import MyJobs from './pages/MyJobs';
import MyProfile from './pages/MyProfile';
import MyReviews from './pages/MyReviews';
import NotFound from './pages/NotFound';
import Notifications from './pages/Notifications';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import SalaryDetailsPage from './pages/SalaryDetailsPage';
import SalaryGuide from './pages/SalaryGuide';
import SettingsPage from './pages/SettingsPage/SettingsPage';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const DashboardRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppContent = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data, isSuccess, isError, isLoading, refetch } = useGetMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch().catch(() => {
        dispatch(logOut());
      });
    }
  }, [isAuthenticated, refetch, dispatch]);

  useEffect(() => {
    if (isSuccess && data?.success) {
      dispatch(setCredentials({ user: data.data }));
    } else if (isError) {
      dispatch(logOut());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isLoading && isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/company-reviews" element={<CompanyReviews />} />
        <Route path="/salary-guide" element={<SalaryGuide />} />
        <Route path="/career-guide" element={<CareerGuide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/career/:careerPath/salaries" element={<SalaryDetailsPage />} />
        <Route path="/findcv" element={<FindCV />} />
        <Route path="/resources" element={<Resources />} />

        {/* Dashboard Routes - Employee */}
        <Route path="/dashboard/employee/profile" element={<DashboardRoute><EmployeeProfile /></DashboardRoute>} />
        <Route path="/dashboard/employee/skills" element={<DashboardRoute><EmployeeSkills /></DashboardRoute>} />
        <Route path="/dashboard/employee/jobs" element={<DashboardRoute><EmployeeJobs /></DashboardRoute>} />
        <Route path="/dashboard/employee/applications" element={<DashboardRoute><MyApplications /></DashboardRoute>} />
        <Route path="/dashboard/employee/settings" element={<DashboardRoute><SettingsPage /></DashboardRoute>} />

        {/* Dashboard Routes - College */}
        <Route path="/dashboard/college/profile" element={<DashboardRoute><CollegeProfile /></DashboardRoute>} />
        <Route path="/dashboard/college/post-job" element={<DashboardRoute><PostJob /></DashboardRoute>} />
        <Route path="/dashboard/college/jobs" element={<DashboardRoute><div>College Jobs Management - Coming Soon</div></DashboardRoute>} />
        <Route path="/dashboard/college/applications" element={<DashboardRoute><div>College Applications - Coming Soon</div></DashboardRoute>} />
        <Route path="/dashboard/college/messages" element={<DashboardRoute><Messages /></DashboardRoute>} />

        {/* Dashboard Routes - Admin */}
        <Route path="/dashboard/admin/jobs" element={<DashboardRoute><AdminJobs /></DashboardRoute>} />
        <Route path="/dashboard/admin/users" element={<DashboardRoute><AdminUsers /></DashboardRoute>} />
        <Route path="/dashboard/admin/analytics" element={<DashboardRoute><div>Analytics Dashboard - Coming Soon</div></DashboardRoute>} />
        <Route path="/dashboard/admin/settings" element={<DashboardRoute><div>System Settings - Coming Soon</div></DashboardRoute>} />

        {/* Protected Routes - Legacy */}
        <Route element={<ProtectedRoute />}>
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/products" element={<Products />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AppContent />
      <Toaster position="top-right" />
    </I18nextProvider>
  );
};

export default App;
