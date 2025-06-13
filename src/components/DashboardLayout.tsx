
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  User, 
  Briefcase, 
  Settings, 
  FileText, 
  Building, 
  Users, 
  Shield, 
  Plus,
  Eye,
  MessageSquare,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCurrentUser, logOut } from '@/features/auth/authSlice';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
  };

  const getMenuItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'employer':
        return [
          { path: '/dashboard/employee/profile', label: 'My Profile', icon: User },
          { path: '/dashboard/employee/skills', label: 'Skills & Experience', icon: Briefcase },
          { path: '/dashboard/employee/jobs', label: 'Browse Jobs', icon: Eye },
          { path: '/dashboard/employee/applications', label: 'My Applications', icon: FileText },
          { path: '/dashboard/employee/settings', label: 'Settings', icon: Settings }
        ];
      case 'college':
        return [
          { path: '/dashboard/college/profile', label: 'College Profile', icon: Building },
          { path: '/dashboard/college/post-job', label: 'Post New Job', icon: Plus },
          { path: '/dashboard/college/jobs', label: 'Manage Jobs', icon: Briefcase },
          { path: '/dashboard/college/applications', label: 'Applications', icon: FileText },
          { path: '/dashboard/college/messages', label: 'Messages', icon: MessageSquare }
        ];
      case 'admin':
        return [
          { path: '/dashboard/admin/jobs', label: 'Manage Jobs', icon: Briefcase },
          { path: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
          { path: '/dashboard/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { path: '/dashboard/admin/settings', label: 'System Settings', icon: Shield }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'employer': return 'Teacher Dashboard';
      case 'college': return 'College Dashboard';
      case 'admin': return 'Admin Dashboard';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">{getRoleTitle()}</h2>
          <p className="text-sm text-gray-600 mt-1">{user?.email}</p>
        </div>
        
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Signout Button at Bottom of Sidebar */}
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content with Left Margin and Scroll */}
      <div className="flex-1 ml-64">
        <div className="h-screen overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
