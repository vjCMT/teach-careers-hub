import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useGetMeQuery } from './features/auth/authApiService';
import { logOut, selectIsAuthenticated, selectCurrentUser, setCredentials } from './features/auth/authSlice';
import i18n from './i18n/config';

import Login from './components/Login';
import Signup from './components/Signup';
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
import PostJob from './pages/PostJob';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import SalaryDetailsPage from './pages/SalaryDetailsPage';
import SalaryGuide from './pages/SalaryGuide';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ArticleDetailsPage from "./pages/ArticlesDetailsPage";

import CollegeDashboard from './pages/dashboard/CollegeDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';

import EmployerProfile from './pages/dashboard/employer/Profile';
import MyContributions from './pages/dashboard/employer/MyContributions';
import EmployerApplications from './pages/dashboard/employer/Applications';
import EmployerSettings from './pages/dashboard/employer/Settings';

import CollegePostJob from './pages/dashboard/college/PostJob';
import CollegeProfile from './pages/dashboard/college/Profile';
import CollegePosts from './pages/dashboard/college/Posts';
import CollegeApplications from './pages/dashboard/college/Applications';
import CollegeShortlist from './pages/dashboard/college/Shortlist';
import CollegeOfferLetter from './pages/dashboard/college/OfferLetter';
import CollegeSettings from './pages/dashboard/college/Settings';

import AdminProfile from './pages/dashboard/admin/Profile';
import Jobs from './pages/dashboard/admin/Jobs';
import AdminUsers from './pages/dashboard/admin/Users';
import AdminWorkflow from './pages/dashboard/admin/Workflow';
import AdminControl from './pages/dashboard/admin/Control';
import AdminSettings from './pages/dashboard/admin/Settings';
import ManageArticles from "./pages/dashboard/admin/ManageArticles";
import ManageSalaryGuides from "./pages/dashboard/admin/ManageSalaryGuides";
import ResourceDetailPage from './pages/ResourceDetailPage';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useAppSelector(selectCurrentUser);
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role.toLowerCase())) return <Navigate to="/" replace />;
  return <Outlet />;
};

const AppContent = () => {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isError, isLoading } = useGetMeQuery();

  useEffect(() => {
    if (isSuccess && data?.success) {
      dispatch(setCredentials({ user: data.data }));
    } else if (isError) {
      dispatch(logOut());
    }
  }, [isSuccess, isError, data, dispatch]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/company-reviews" element={<CompanyReviews />} />
        <Route path="/salary-guide" element={<SalaryGuide />} />
        <Route path="/career-guide" element={<CareerGuide />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/career/:careerPath/salaries" element={<SalaryDetailsPage />} />
        <Route path="/career-guide/:slug" element={<ArticleDetailsPage />} />
        <Route path="/findcv" element={<FindCV />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<ResourceDetailPage />} />
        
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
        
        <Route element={<RoleProtectedRoute allowedRoles={['employer']} />}>
          <Route path="/dashboard/employer" element={<EmployerDashboard />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<EmployerProfile />} />
            <Route path="contributions" element={<MyContributions />} />
            <Route path="applications" element={<EmployerApplications />} />
            <Route path="settings" element={<EmployerSettings />} />
          </Route>
        </Route>
        
        <Route element={<RoleProtectedRoute allowedRoles={['college']} />}>
          <Route path="/dashboard/college" element={<CollegeDashboard />}>
            <Route index element={<Navigate to="profile" />} />
            <Route path="profile" element={<CollegeProfile />} />
            <Route path="posts" element={<CollegePosts />} />
            <Route path="post-job" element={<CollegePostJob />} />
            <Route path="post-job/edit/:jobId" element={<CollegePostJob />} />
            <Route path="applications" element={<CollegeApplications />} />
            <Route path="shortlist" element={<CollegeShortlist />} />
            <Route path="offer-letter" element={<CollegeOfferLetter />} />
            <Route path="settings" element={<CollegeSettings />} />
          </Route>
        </Route>
        
        <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/dashboard/admin" element={<AdminDashboard />}>
                <Route index element={<Navigate to="profile" />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="workflow" element={<AdminWorkflow />} />
                <Route path="control" element={<AdminControl />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="articles" element={<ManageArticles />} />
                <Route path="salary-guides" element={<ManageSalaryGuides />} />
            </Route>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const App = () => { return <I18nextProvider i18n={i18n}><AppContent /><Toaster position="top-right" /></I18nextProvider>; };

export default App;