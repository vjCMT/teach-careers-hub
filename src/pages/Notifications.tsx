
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, Check, X, Briefcase, MessageSquare, Star, Users } from 'lucide-react';

const Notifications = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Math Teacher at Lincoln Elementary has been reviewed.',
      time: '2 hours ago',
      read: false,
      icon: Briefcase,
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message regarding your interview.',
      time: '4 hours ago',
      read: false,
      icon: MessageSquare,
      color: 'text-secondary'
    },
    {
      id: 3,
      type: 'review',
      title: 'Company Review',
      message: 'Oak Hill School District has been reviewed by a teacher.',
      time: '1 day ago',
      read: true,
      icon: Star,
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Views',
      message: 'Your profile has been viewed 15 times this week.',
      time: '2 days ago',
      read: true,
      icon: Users,
      color: 'text-success'
    },
    {
      id: 5,
      type: 'application',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for Science Teacher position at Central High.',
      time: '3 days ago',
      read: true,
      icon: Briefcase,
      color: 'text-primary'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const markAsRead = (id: number) => {
    // Implementation for marking notification as read
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // Implementation for marking all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BellRing className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with your latest activities</p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {unreadCount} new
              </Badge>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              All ({notifications.length})
            </Button>
            <Button 
              variant={filter === 'application' ? 'default' : 'outline'}
              onClick={() => setFilter('application')}
              className="flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              Applications
            </Button>
            <Button 
              variant={filter === 'message' ? 'default' : 'outline'}
              onClick={() => setFilter('message')}
              className="flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </Button>
            <Button 
              variant={filter === 'review' ? 'default' : 'outline'}
              onClick={() => setFilter('review')}
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Reviews
            </Button>
            {unreadCount > 0 && (
              <Button 
                variant="secondary"
                onClick={markAllAsRead}
                className="ml-auto"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md ${
                !notification.read ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-muted ${notification.color}`}>
                    <notification.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                        {!notification.read && (
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                    
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1"
                        >
                          <Check className="h-3 w-3" />
                          Mark as read
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="flex items-center gap-1">
                        <X className="h-3 w-3" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
              <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
