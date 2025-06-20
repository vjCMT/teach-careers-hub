import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User,
  Star,
  Search,
  FileText,
  Settings as SettingsIcon,
  GraduationCap,
  PlusCircle,
  ClipboardList,
  UserCheck,
  FileCheck,
  Briefcase,
  Users,
  BarChart3,
  Monitor,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks";
import { logOut } from "@/features/auth/authSlice";
import { User as UserType } from '@/types/user';

interface ProfileDropdownProps {
  user: UserType;
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  console.log('ProfileDropdown user:', user);

  // Remove mutation, show fallback UI if role missing
  if (!user.role) {
    return (
      <div className="p-4 text-red-500 bg-white rounded shadow">
        User role missing! Please contact support or try logging in again.
      </div>
    );
  }

  const getProfileMenuItems = () => {
    switch (user.role.toLowerCase()) {
      case 'employer':
        return [
          { label: 'My Profile', path: '/dashboard/employer/profile', icon: User },
          { label: 'Skills & Experience', path: '/dashboard/employer/skills', icon: Star },
          { label: 'Browse Jobs', path: '/dashboard/employer/jobs', icon: Search },
          { label: 'My Applications', path: '/dashboard/employer/applications', icon: FileText },
          { label: 'Settings', path: '/dashboard/employer/settings', icon: SettingsIcon },
        ];
      case 'college':
        return [
          { label: 'Profile', path: '/dashboard/college/profile', icon: GraduationCap },
          { label: 'Post New Job', path: '/dashboard/college/post-job', icon: PlusCircle },
          { label: 'Manage Posts', path: '/dashboard/college/posts', icon: ClipboardList },
          { label: 'Applications', path: '/dashboard/college/applications', icon: FileText },
          { label: 'Shortlist Candidates', path: '/dashboard/college/shortlist', icon: UserCheck },
          { label: 'Offer Letters', path: '/dashboard/college/offer-letter', icon: FileCheck },
          { label: 'Settings', path: '/dashboard/college/settings', icon: SettingsIcon },
        ];
      case 'admin':
        return [
          { label: 'Manage Jobs', path: '/dashboard/admin/jobs', icon: Briefcase },
          { label: 'User Management', path: '/dashboard/admin/users', icon: Users },
          { label: 'Workflows', path: '/dashboard/admin/workflow', icon: BarChart3 },
          { label: 'Control Panel', path: '/dashboard/admin/control', icon: Monitor },
          { label: 'Settings', path: '/dashboard/admin/settings', icon: SettingsIcon },
        ];
      default:
        return [];
    }
  };

  const getDashboardPath = () => {
    switch (user.role.toLowerCase()) {
      case 'employer':
        return '/dashboard/employer';
      case 'college':
        return '/dashboard/college';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/';
    }
  };

  const profileMenuItems = getProfileMenuItems();

  const handleLogout = () => {
    dispatch(logOut());
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const getRoleDisplayName = () => {
    switch (user.role.toLowerCase()) {
      case 'employer':
        return 'Teacher/Job Seeker';
      case 'college':
        return 'College/Institution';
      case 'admin':
        return 'Administrator';
      default:
        return user.role;
    }
  };

  const handleProfileClick = () => {
    navigate(getDashboardPath());
    setIsProfileMenuOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <User className="h-4 w-4" />
        <ChevronDown className="h-3 w-3" />
      </Button>
      
      {isProfileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsProfileMenuOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-80 bg-background rounded-lg shadow-lg z-50 border border-border overflow-hidden">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-border bg-muted/50">
              <p className="text-sm font-semibold text-foreground truncate">
                {user.email}
              </p>
              <p className="text-xs text-muted-foreground">
                {getRoleDisplayName()}
              </p>
            </div>

            {/* Dashboard Link */}
            <div className="py-2">
              <button
                onClick={handleProfileClick}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors font-medium"
              >
                <User className="w-4 h-4 text-muted-foreground" />
                <span>Go to Dashboard</span>
              </button>
            </div>

            {/* Menu Items */}
            <div className="py-2 border-t border-border">
              {profileMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-muted/30">
              <div className="px-4 py-2 text-xs text-muted-foreground">
                © 2025 TeacherConnect -{" "}
                <a href="#" className="underline hover:text-foreground">
                  Terms
                </a>{" "}
                -{" "}
                <a href="#" className="underline hover:text-foreground">
                  Accessibility
                </a>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
