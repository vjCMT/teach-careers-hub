import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateJobByAdminMutation, useGetUsersByRoleQuery } from '@/features/admin/adminApiService';
import toast from 'react-hot-toast';

interface CreateJobModalProps {
  onClose: () => void;
}

const CreateJobModal = ({ onClose }: CreateJobModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    schoolName: '',
    location: '',
    description: '',
    type: '',
    salary: '',
    postedBy: '',
  });

  const { data: colleges = [], isLoading: isLoadingColleges } = useGetUsersByRoleQuery({ role: 'college' });
  const [createJob, { isLoading: isCreating }] = useCreateJobByAdminMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.schoolName || !formData.location || !formData.postedBy) {
      toast.error('Please fill all required fields, including selecting a college.');
      return;
    }
    try {
      await createJob(formData).unwrap();
      toast.success('Job created successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to create job.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Job Posting</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new job post on behalf of a college.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input id="title" value={formData.title} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="schoolName" className="text-right">School Name</Label>
            <Input id="schoolName" value={formData.schoolName} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <Input id="location" value={formData.location} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="postedBy" className="text-right">College</Label>
            <Select onValueChange={(value) => handleSelectChange('postedBy', value)} value={formData.postedBy}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={isLoadingColleges ? "Loading colleges..." : "Select a college"} />
              </SelectTrigger>
              <SelectContent>
                {colleges.map((college) => (
                  <SelectItem key={college._id} value={college._id}>{college.collegeProfile?.name || college.email}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="salary" className="text-right">Salary</Label>
            <Input id="salary" value={formData.salary} onChange={handleChange} className="col-span-3" placeholder="e.g., $50,000 - $65,000" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Job Type</Label>
            <Input id="type" value={formData.type} onChange={handleChange} className="col-span-3" placeholder="e.g., Full-time" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" rows={4} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create Job'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;