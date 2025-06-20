
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { logOut } from '@/features/auth/authSlice';
import { Shield, Briefcase, Users, BarChart3, Monitor, Home, Settings, Newspaper, DollarSign, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const AdminDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

  const menuItems = [
    { path: '/dashboard/admin/profile', label: 'My Profile', icon: Shield },
    { path: '/dashboard/admin/jobs', label: 'Manage Jobs', icon: Briefcase },
    { path: '/dashboard/admin/users', label: 'User Management', icon: Users },
    { path: '/dashboard/admin/workflow', label: 'Workflows', icon: BarChart3 },
    { path: "/dashboard/admin/articles", label: "Manage Articles", icon: Newspaper },
    { path: "/dashboard/admin/salary-guides", label: "Salary Guides", icon: DollarSign },
    { path: '/dashboard/admin/control', label: 'Control Panel', icon: Monitor },
    { path: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-page">
      <div className="flex">
        {/* Mobile Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-background border"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Admin Dashboard</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Home className="w-4 h-4 mr-3" />
                  Back to Home
                </Link>
              </Button>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname.startsWith(item.path) ? "default" : "ghost"}
                  size="sm"
                  asChild
                  className="w-full justify-start"
                >
                  <Link to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
            
            {/* Sign Out Button */}
            <div className="absolute bottom-6 left-6 right-6">
              <Button 
                variant="outline" 
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-0">
          <div className="p-6 pt-20 md:pt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
