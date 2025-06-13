
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Edit, Trash2, Check, X, Plus } from 'lucide-react';

const AdminJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'English Teacher - Secondary',
      school: 'Delhi Public School',
      location: 'New Delhi',
      salary: '₹40,000 - ₹55,000',
      status: 'pending',
      postedDate: '2024-01-15',
      applicants: 12
    },
    {
      id: 2,
      title: 'Mathematics Teacher',
      school: 'St. Mary\'s School',
      location: 'Mumbai',
      salary: '₹35,000 - ₹50,000',
      status: 'approved',
      postedDate: '2024-01-10',
      applicants: 8
    },
    {
      id: 3,
      title: 'Science Teacher - Primary',
      school: 'Green Valley School',
      location: 'Bangalore',
      salary: '₹30,000 - ₹40,000',
      status: 'rejected',
      postedDate: '2024-01-05',
      applicants: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: 'Pending Review', variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      'approved': { label: 'Approved', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      'rejected': { label: 'Rejected', variant: 'destructive' as const, className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filterJobsByStatus = (status?: string) => {
    const filtered = status ? jobs.filter(job => job.status === status) : jobs;
    return filtered.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.school.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleApprove = (jobId: number) => {
    console.log('Approving job:', jobId);
  };

  const handleReject = (jobId: number) => {
    console.log('Rejecting job:', jobId);
  };

  const handleDelete = (jobId: number) => {
    console.log('Deleting job:', jobId);
  };

  const JobCard = ({ job }: { job: typeof jobs[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-blue-600 font-medium mb-2">{job.school}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{job.location}</span>
              <span>{job.salary}</span>
              <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
              <span>{job.applicants} applicants</span>
            </div>
          </div>
          <div className="text-right">
            {getStatusBadge(job.status)}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          {job.status === 'pending' && (
            <>
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                onClick={() => handleApprove(job.id)}
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={() => handleReject(job.id)}
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-red-600 hover:text-red-700"
            onClick={() => handleDelete(job.id)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Jobs</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Job
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs by title or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({jobs.filter(j => j.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({jobs.filter(j => j.status === 'approved').length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({jobs.filter(j => j.status === 'rejected').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filterJobsByStatus().map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterJobsByStatus('pending').map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filterJobsByStatus('approved').map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {filterJobsByStatus('rejected').map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminJobs;
