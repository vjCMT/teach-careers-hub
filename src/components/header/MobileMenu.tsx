import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/app/hooks"; // Correct import
import { logOut } from "@/features/auth/authSlice";
import { User as UserType } from "@/types/user";

interface MobileMenuProps {
  user: UserType | null;
}

const MobileMenu = ({ user }: MobileMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  // Corrected typo: useAppDispatch instead of useAppdDispatch
  const dispatch = useAppDispatch(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function to restore scroll on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    dispatch(logOut());
    closeMenu();
    navigate("/");
  };

  const navItems = [
    { label: t("header.nav.home"), path: "/" },
    { label: t("header.nav.companyReviews"), path: "/company-reviews" },
    { label: t("header.nav.salaryGuide"), path: "/salary-guide" },
    { label: t("header.nav.careerGuide"), path: "/career-guide" },
  ];

  const getProfileMenuItems = () => {
    if (!user) return [];
    
    switch (user.role) {
      case 'employee':
        return [
          { label: 'My Profile', path: '/dashboard/employee/profile' },
          { label: 'Skills & Experience', path: '/dashboard/employee/skills' },
          { label: 'Browse Jobs', path: '/dashboard/employee/browse-jobs' },
          { label: 'My Applications', path: '/dashboard/employee/applications' },
          { label: 'Settings', path: '/dashboard/employee/settings' },
        ];
      case 'college':
        return [
          { label: 'College Profile', path: '/dashboard/college/profile' },
          { label: 'Post New Job', path: '/dashboard/college/post-job' },
          { label: 'Manage Posts', path: '/dashboard/college/posts' },
          { label: 'Applications', path: '/dashboard/college/applications' },
          { label: 'Shortlist Candidates', path: '/dashboard/college/shortlist' },
          { label: 'Offer Letters', path: '/dashboard/college/offer-letter' },
          { label: 'Settings', path: '/dashboard/college/settings' },
        ];
      case 'admin':
        return [
          { label: 'Manage Jobs', path: '/dashboard/admin/jobs' },
          { label: 'User Management', path: '/dashboard/admin/users' },
          { label: 'Workflows', path: '/dashboard/admin/workflows' },
          { label: 'Control Panel', path: '/dashboard/admin/control-panel' },
          { label: 'Settings', path: '/dashboard/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const profileMenuItems = getProfileMenuItems();

  const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
        location.pathname === to
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-primary hover:bg-muted"
      }`}
    >
      {children}
    </Link>
  );

  return (
    <div className="md:hidden">
      {/* Menu Icon */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-sm bg-background shadow-xl transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu">
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-120px)]">
          {/* Main Navigation */}
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
          ))}
          
          <div className="pt-2">
            <div className="h-px w-full bg-border" />
          </div>

          {/* User Specific Links */}
          {user ? (
            <>
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              {profileMenuItems.map((item) => (
                <NavLink key={item.path} to={item.path}>{item.label}</NavLink>
              ))}
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </>
          )}
        </div>
        
        {/* Logout Button at the bottom */}
        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive bg-destructive/5 hover:bg-destructive/10 transition-colors duration-200"
            >
              {t("header.profile.signOut")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;