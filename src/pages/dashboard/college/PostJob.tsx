
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Save, Eye } from 'lucide-react';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    department: '',
    jobType: '',
    experience: '',
    salary: '',
    location: '',
    description: '',
    requirements: '',
    benefits: '',
    applicationDeadline: '',
    isUrgent: false,
    contactEmail: '',
    contactPhone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Posting job:', jobData);
    // API call to post job
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', jobData);
    // API call to save draft
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Post New Job</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Job Title *</Label>
                    <Input
                      id="title"
                      value={jobData.title}
                      onChange={(e) => setJobData({...jobData, title: e.target.value})}
                      placeholder="e.g., English Teacher - Secondary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(value) => setJobData({...jobData, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="social-studies">Social Studies</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="physical-education">Physical Education</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="administration">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="jobType">Job Type *</Label>
                    <Select onValueChange={(value) => setJobData({...jobData, jobType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Required</Label>
                    <Select onValueChange={(value) => setJobData({...jobData, experience: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresher">Fresher</SelectItem>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      value={jobData.salary}
                      onChange={(e) => setJobData({...jobData, salary: e.target.value})}
                      placeholder="e.g., ₹30,000 - ₹45,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={jobData.location}
                      onChange={(e) => setJobData({...jobData, location: e.target.value})}
                      placeholder="e.g., New Delhi"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={jobData.description}
                    onChange={(e) => setJobData({...jobData, description: e.target.value})}
                    placeholder="Provide detailed job description..."
                    rows={5}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">Requirements & Qualifications *</Label>
                  <Textarea
                    id="requirements"
                    value={jobData.requirements}
                    onChange={(e) => setJobData({...jobData, requirements: e.target.value})}
                    placeholder="List the required qualifications, skills, and experience..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits & Perks</Label>
                  <Textarea
                    id="benefits"
                    value={jobData.benefits}
                    onChange={(e) => setJobData({...jobData, benefits: e.target.value})}
                    placeholder="List benefits like health insurance, PF, etc..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={jobData.applicationDeadline}
                    onChange={(e) => setJobData({...jobData, applicationDeadline: e.target.value})}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isUrgent"
                    checked={jobData.isUrgent}
                    onCheckedChange={(checked) => setJobData({...jobData, isUrgent: checked as boolean})}
                  />
                  <Label htmlFor="isUrgent">Mark as Urgent Hiring</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={jobData.contactEmail}
                    onChange={(e) => setJobData({...jobData, contactEmail: e.target.value})}
                    placeholder="hr@school.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={jobData.contactPhone}
                    onChange={(e) => setJobData({...jobData, contactPhone: e.target.value})}
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostJob;
