
import React, { useState } from 'react';
import { User } from '../../../features/auth/authSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { Bell } from 'lucide-react';
import toast from 'react-hot-toast';

interface NotificationSettingsProps {
  user: User;
}

const NotificationSettings = ({ user }: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>Choose how you want to be notified</CardDescription>
      </CardHeader>
      <CardContent>
        {user.role === 'employer' && <EmployerNotifications />}
        {user.role === 'college' && <CollegeNotifications />}
        {user.role === 'admin' && <AdminNotifications />}
        {!['employer', 'college', 'admin'].includes(user.role) && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No notification settings are available for your account type.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const EmployerNotifications = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    jobAlerts: true,
    messageNotifications: true,
    marketingEmails: false,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async (key: keyof typeof settings) => {
    setIsUpdating(true);
    const newSettings = { ...settings, [key]: !settings[key] };
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSettings(newSettings);
      toast.success('Notification settings updated!');
    } catch (err) {
      toast.error('Failed to update settings.');
    } finally {
      setIsUpdating(false);
    }
  };

  const notifications = [
    {
      key: 'emailNotifications' as const,
      label: 'Email Notifications',
      description: 'Receive notifications via email',
    },
    {
      key: 'pushNotifications' as const,
      label: 'Push Notifications',
      description: 'Receive notifications on your device',
    },
    {
      key: 'jobAlerts' as const,
      label: 'Job Application Alerts',
      description: 'Get notified when candidates apply to your jobs',
    },
    {
      key: 'messageNotifications' as const,
      label: 'Message Notifications',
      description: 'Get notified about new messages from candidates',
    },
    {
      key: 'marketingEmails' as const,
      label: 'Marketing Emails',
      description: 'Receive updates about new features and tips',
    },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <div key={notification.key}>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{notification.label}</Label>
              <p className="text-sm text-muted-foreground">{notification.description}</p>
            </div>
            <Switch
              checked={settings[notification.key]}
              onCheckedChange={() => handleToggle(notification.key)}
              disabled={isUpdating}
            />
          </div>
          {index < notifications.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  );
};

const CollegeNotifications = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    studentUpdates: true,
    recruitmentAlerts: true,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async (key: keyof typeof settings) => {
    setIsUpdating(true);
    const newSettings = { ...settings, [key]: !settings[key] };
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSettings(newSettings);
      toast.success('Notification settings updated!');
    } catch (err) {
      toast.error('Failed to update settings.');
    } finally {
      setIsUpdating(false);
    }
  };

  const notifications = [
    {
      key: 'emailNotifications' as const,
      label: 'Email Notifications',
      description: 'Receive notifications via email',
    },
    {
      key: 'studentUpdates' as const,
      label: 'Student Updates',
      description: 'Get notified about student activity and progress',
    },
    {
      key: 'recruitmentAlerts' as const,
      label: 'Recruitment Alerts',
      description: 'Get notified about new recruitment opportunities',
    },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <div key={notification.key}>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{notification.label}</Label>
              <p className="text-sm text-muted-foreground">{notification.description}</p>
            </div>
            <Switch
              checked={settings[notification.key]}
              onCheckedChange={() => handleToggle(notification.key)}
              disabled={isUpdating}
            />
          </div>
          {index < notifications.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  );
};

const AdminNotifications = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    systemAlerts: true,
    userReports: true,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async (key: keyof typeof settings) => {
    setIsUpdating(true);
    const newSettings = { ...settings, [key]: !settings[key] };
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSettings(newSettings);
      toast.success('Notification settings updated!');
    } catch (err) {
      toast.error('Failed to update settings.');
    } finally {
      setIsUpdating(false);
    }
  };

  const notifications = [
    {
      key: 'emailNotifications' as const,
      label: 'Email Notifications',
      description: 'Receive notifications via email',
    },
    {
      key: 'systemAlerts' as const,
      label: 'System Alerts',
      description: 'Get notified about system status and issues',
    },
    {
      key: 'userReports' as const,
      label: 'User Reports',
      description: 'Get notified about user reports and feedback',
    },
  ];

  return (
    <div className="space-y-4">
      {notifications.map((notification, index) => (
        <div key={notification.key}>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>{notification.label}</Label>
              <p className="text-sm text-muted-foreground">{notification.description}</p>
            </div>
            <Switch
              checked={settings[notification.key]}
              onCheckedChange={() => handleToggle(notification.key)}
              disabled={isUpdating}
            />
          </div>
          {index < notifications.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  );
};

export default NotificationSettings;
