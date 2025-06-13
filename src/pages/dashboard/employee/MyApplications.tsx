
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Eye, MessageSquare, FileText } from 'lucide-react';

const MyApplications = () => {
  const applications = [
    {
      id: 1,
      jobTitle: 'English Teacher - Secondary',
      school: 'Delhi Public School',
      location: 'New Delhi',
      appliedDate: '2024-01-15',
      status: 'interview_scheduled',
      interviewDate: '2024-01-22',
      salary: '₹40,000 - ₹55,000'
    },
    {
      id: 2,
      jobTitle: 'Mathematics Teacher',
      school: 'St. Mary\'s School',
      location: 'Mumbai',
      appliedDate: '2024-01-10',
      status: 'under_review',
      salary: '₹35,000 - ₹50,000'
    },
    {
      id: 3,
      jobTitle: 'Science Teacher - Primary',
      school: 'Green Valley School',
      location: 'Bangalore',
      appliedDate: '2024-01-05',
      status: 'shortlisted',
      salary: '₹30,000 - ₹40,000'
    },
    {
      id: 4,
      jobTitle: 'Hindi Teacher',
      school: 'Modern Public School',
      location: 'Pune',
      appliedDate: '2023-12-28',
      status: 'rejected',
      salary: '₹25,000 - ₹35,000'
    },
    {
      id: 5,
      jobTitle: 'Physics Teacher',
      school: 'Cambridge School',
      location: 'Chennai',
      appliedDate: '2023-12-20',
      status: 'offer_received',
      salary: '₹45,000 - ₹60,000'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'applied': { label: 'Applied', variant: 'secondary' as const },
      'under_review': { label: 'Under Review', variant: 'default' as const },
      'shortlisted': { label: 'Shortlisted', variant: 'default' as const },
      'interview_scheduled': { label: 'Interview Scheduled', variant: 'default' as const },
      'offer_received': { label: 'Offer Received', variant: 'default' as const },
      'rejected': { label: 'Rejected', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={
        status === 'offer_received' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
        status === 'shortlisted' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
        status === 'interview_scheduled' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' :
        ''
      }>
        {config.label}
      </Badge>
    );
  };

  const filterApplicationsByStatus = (status?: string) => {
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  };

  const ApplicationCard = ({ application }: { application: typeof applications[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{application.jobTitle}</h3>
            <p className="text-blue-600 font-medium mb-2">{application.school}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {application.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Applied: {new Date(application.appliedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(application.status)}
            <p className="text-sm text-gray-600 mt-2">{application.salary}</p>
          </div>
        </div>

        {application.interviewDate && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-purple-800">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Interview Scheduled</span>
            </div>
            <p className="text-sm text-purple-700 mt-1">
              {new Date(application.interviewDate).toLocaleDateString()} at 10:00 AM
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            Message HR
          </Button>
          {application.status === 'offer_received' && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Accept Offer
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <Badge variant="secondary">{applications.length} Total Applications</Badge>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({filterApplicationsByStatus('under_review').length})</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted ({filterApplicationsByStatus('shortlisted').length})</TabsTrigger>
          <TabsTrigger value="interview_scheduled">Interviews ({filterApplicationsByStatus('interview_scheduled').length})</TabsTrigger>
          <TabsTrigger value="offer_received">Offers ({filterApplicationsByStatus('offer_received').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({filterApplicationsByStatus('rejected').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="under_review" className="space-y-4">
          {filterApplicationsByStatus('under_review').map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="shortlisted" className="space-y-4">
          {filterApplicationsByStatus('shortlisted').map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="interview_scheduled" className="space-y-4">
          {filterApplicationsByStatus('interview_scheduled').map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="offer_received" className="space-y-4">
          {filterApplicationsByStatus('offer_received').map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {filterApplicationsByStatus('rejected').map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyApplications;
