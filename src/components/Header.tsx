import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { selectCurrentUser } from "@/features/auth/authSlice";
import NavigationMenu from "./header/NavigationMenu";
import HeaderActions from "./header/HeaderActions";
import MobileMenu from "./header/MobileMenu";
import { GraduationCap } from "lucide-react";

const Header = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 border-b border-border/40 backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">
                EduSphere
              </span>
            </Link>
            <NavigationMenu />
          </div>

          <div className="flex items-center gap-4">
            <HeaderActions user={user} />
            <MobileMenu user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;