
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter } from 'lucide-react';

const EmployeeJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'English Teacher - Secondary',
      school: 'Delhi Public School',
      location: 'New Delhi',
      salary: '₹40,000 - ₹55,000',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Looking for an experienced English teacher for grades 6-10.',
      requirements: ['B.Ed required', '3+ years experience', 'CBSE curriculum knowledge']
    },
    {
      id: 2,
      title: 'Mathematics Teacher - High School',
      school: 'St. Mary\'s School',
      location: 'Mumbai',
      salary: '₹35,000 - ₹50,000',
      type: 'Full-time',
      posted: '1 week ago',
      description: 'Seeking a passionate mathematics teacher for high school students.',
      requirements: ['M.Sc Mathematics', 'B.Ed preferred', 'Good communication skills']
    },
    {
      id: 3,
      title: 'Science Teacher - Primary',
      school: 'Green Valley School',
      location: 'Bangalore',
      salary: '₹30,000 - ₹40,000',
      type: 'Part-time',
      posted: '3 days ago',
      description: 'Part-time science teacher position for primary grades.',
      requirements: ['B.Sc required', 'Experience with young children', 'Creative teaching methods']
    }
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
        <Badge variant="secondary">{filteredJobs.length} Jobs Available</Badge>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs, schools, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-lg font-medium text-blue-600 mb-2">{job.school}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.posted}
                    </div>
                  </div>
                </div>
                <Button>Apply Now</Button>
              </div>
              
              <p className="text-gray-700 mb-4">{job.description}</p>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Requirements:</h4>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <Badge key={index} variant="outline">{req}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new opportunities.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeJobs;
