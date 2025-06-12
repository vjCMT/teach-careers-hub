
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import Header from '../../components/Header';
import { Card, CardContent } from '../../components/ui/card';
import { User, Bell, Settings as SettingsIcon } from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState<'account' | 'notifications'>('account');
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return (
      <div className="min-h-screen bg-page">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Error: User not found</h1>
            <p className="text-muted-foreground">Please log in to access settings.</p>
          </div>
        </div>
      </div>
    );
  }

  const sections = [
    { key: 'account' as const, label: 'Account', icon: User },
    { key: 'notifications' as const, label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account preferences and settings for {user.role}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                        activeSection === section.key
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <section.icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            {activeSection === 'account' && <AccountSettings user={user} />}
            {activeSection === 'notifications' && <NotificationSettings user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
