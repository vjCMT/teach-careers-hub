import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import CompanyReviews from "./pages/CompanyReviews";
import SalaryGuide from "./pages/SalaryGuide";
import CareerGuide from "./pages/CareerGuide";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import MyJobs from "./pages/MyJobs";
import MyProfile from "./pages/MyProfile";
import MyReviews from "./pages/MyReviews";
import Settings from "./pages/Settings";
import PostJob from "./pages/PostJob";
import Products from "./pages/Products";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./pages/Profile";
import JobDetailPage from "./pages/Jobfulldetailspage";
import Help from "./pages/Help";
import SalaryDetailsPage from "./pages/SalaryDetailsPage";
import FindCV from "./pages/FindCV";
import Resources from "./pages/Resources";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/company-reviews" element={<CompanyReviews />} />
            <Route path="/salary-guide" element={<SalaryGuide />} />
            <Route path="/career-guide" element={<CareerGuide />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/job/:id" element={<JobDetailPage />} />
            <Route path="/help" element={<Help />} />
            <Route
              path="/career/:careerPath/salaries"
              element={<SalaryDetailsPage />}
            />
            <Route path="/findcv" element={<FindCV />} />
            <Route path="/resources" element={<Resources />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
