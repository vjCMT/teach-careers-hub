import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "./LanguageToggle";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logOut, selectCurrentUser } from "@/features/auth/authSlice";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navItems = [
    { label: t("header.nav.home"), path: "/" },
    { label: t("header.nav.companyReviews"), path: "/company-reviews" },
    { label: t("header.nav.salaryGuide"), path: "/salary-guide" },
    { label: t("header.nav.careerGuide"), path: "/career-guide" },
  ];

  const profileMenuItems = [
    { label: t("header.profile.profile"), path: "/profile", icon: FileText },
    { label: t("header.profile.myJobs"), path: "/my-jobs", icon: Bookmark },
    { label: t("header.profile.myReviews"), path: "/my-reviews", icon: Star },
    {
      label: t("header.profile.settings"),
      path: "/settings",
      icon: SettingsIcon,
    },
    { label: t("header.profile.help"), path: "/help", icon: HelpCircle },
    {
      label: t("header.profile.privacyCenter"),
      path: "/privacy-centre",
      icon: Lock,
    },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex-shrink-0">
              <span className="text-3xl font-bold text-primary">
                {t("header.brandName")}
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
              <LanguageToggle />
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
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
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
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <User className="w-5 h-5 text-muted-foreground" />
                            <span>My Profile</span>
                          </Link>
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
                            {t("header.profile.signOut")}
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
                {t("header.employers")}
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
            <div className="px-3 py-2">
              <LanguageToggle />
            </div>
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
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
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
                  {t("header.profile.signOut")}
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
