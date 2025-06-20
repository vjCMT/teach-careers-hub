
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "../LanguageToggle";
import ProfileDropdown from "./ProfileDropdown";
import { User as UserType } from "@/types/user";

interface HeaderActionsProps {
  user: UserType | null;
}

const HeaderActions = ({ user }: HeaderActionsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* "For Employers" link styled as a ghost button for consistency */}
      <div className="hidden md:block">
        <Button variant="ghost" asChild>
          <Link to="/post-job" className="text-sm font-medium">
            For Employers
          </Link>
        </Button>
      </div>
      
      {/* A modern vertical separator */}
      <div className="hidden md:block h-6 w-px bg-border" />

      {/* Language Toggle */}
      {/* <LanguageToggle /> */}

      {/* Conditional rendering for user authentication status */}
      {user ? (
        // Actions for logged-in users
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="group">
            <Link to="/notifications" aria-label="Notifications">
              <Bell className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </Button>
          <ProfileDropdown user={user} />
        </div>
      ) : (
        // Actions for logged-out users
        <div className="hidden sm:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="transition-transform duration-200 hover:scale-105 active:scale-100"
          >
            <Link to="/login">{t("login")}</Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="transition-transform duration-200 hover:scale-105 active:scale-100"
          >
            <Link to="/signup">{t("signup")}</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default HeaderActions;
