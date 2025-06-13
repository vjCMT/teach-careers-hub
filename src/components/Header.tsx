
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Bell,
  User,
  Menu,
  FileText,
  Bookmark,
  Star,
  Settings as SettingsIcon,
  HelpCircle,
  Lock,
  Briefcase,
  Building,
  Shield,
  Eye,
  Plus,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logOut, selectCurrentUser } from "@/features/auth/authSlice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Company Reviews", path: "/company-reviews" },
    { label: "Salary Guide", path: "/salary-guide" },
    { label: "Career Guide", path: "/career-guide" },
  ];

  const getProfileMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'employer':
        return [
          { label: 'My Profile', path: '/dashboard/employee/profile', icon: User },
          { label: 'Skills & Experience', path: '/dashboard/employee/skills', icon: Briefcase },
          { label: 'Browse Jobs', path: '/dashboard/employee/jobs', icon: Eye },
          { label: 'My Applications', path: '/dashboard/employee/applications', icon: FileText },
          { label: 'Settings', path: '/dashboard/employee/settings', icon: SettingsIcon }
        ];
      case 'college':
        return [
          { label: 'College Profile', path: '/dashboard/college/profile', icon: Building },
          { label: 'Post New Job', path: '/dashboard/college/post-job', icon: Plus },
          { label: 'Manage Jobs', path: '/dashboard/college/jobs', icon: Briefcase },
          { label: 'Applications', path: '/dashboard/college/applications', icon: FileText },
          { label: 'Messages', path: '/dashboard/college/messages', icon: MessageSquare }
        ];
      case 'admin':
        return [
          { label: 'Manage Jobs', path: '/dashboard/admin/jobs', icon: Briefcase },
          { label: 'Manage Users', path: '/dashboard/admin/users', icon: User },
          { label: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart3 },
          { label: 'System Settings', path: '/dashboard/admin/settings', icon: Shield }
        ];
      default:
        return [
          { label: "Profile", path: "/profile", icon: FileText },
          { label: "My Jobs", path: "/my-jobs", icon: Bookmark },
          { label: "My Reviews", path: "/my-reviews", icon: Star },
          { label: "Settings", path: "/settings", icon: SettingsIcon },
          { label: "Help", path: "/help", icon: HelpCircle },
          { label: "Privacy Center", path: "/privacy-centre", icon: Lock }
        ];
    }
  };

  const profileMenuItems = getProfileMenuItems();

  const handleLogout = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const handleProfileIconClick = () => {
    if (user) {
      // Navigate to role-based dashboard
      switch (user.role) {
        case 'employer':
          navigate('/dashboard/employee/profile');
          break;
        case 'college':
          navigate('/dashboard/college/profile');
          break;
        case 'admin':
          navigate('/dashboard/admin/jobs');
          break;
        default:
          setIsProfileMenuOpen(!isProfileMenuOpen);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <span className="text-3xl font-bold text-primary">
                Teacher-Connect
              </span>
            </Link>

            <nav className="hidden md:flex items-center h-16 space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`h-full flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "text-foreground border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground border-b-2 border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1">
              {user ? (
                <>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/notifications">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </Button>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleProfileIconClick}
                    >
                      <User className="h-5 w-5 text-muted-foreground" />
                    </Button>
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-background rounded-md shadow-lg z-50 border border-border overflow-hidden">
                        <div className="px-4 py-3">
                          <p className="text-sm font-bold text-foreground truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {user.role}
                          </p>
                        </div>
                        <div className="py-1">
                          {profileMenuItems.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted"
                              onClick={() => setIsProfileMenuOpen(false)}
                            >
                              <item.icon className="w-5 h-5 text-muted-foreground" />
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-border">
                          <div className="px-4 py-3 text-xs text-muted-foreground">
                            © 2025 TeacherConnect -{" "}
                            <a href="#" className="underline">
                              Terms
                            </a>{" "}
                            -{" "}
                            <a href="#" className="underline">
                              Accessibility
                            </a>
                          </div>
                        </div>
                        <div className="border-t border-border">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-sm font-medium text-primary hover:bg-muted"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            <span className="hidden md:block text-border text-2xl font-light">
              |
            </span>

            <div className="hidden md:block">
              <Link
                to="/post-job"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Post a Job
              </Link>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-muted"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {!user ? (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="px-2 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-border">
              <div className="px-2 space-y-1">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Logged in as: {user.email} ({user.role})
                </div>
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-muted"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
