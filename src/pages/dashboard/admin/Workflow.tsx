import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, FileText, Calendar, Building, User, Briefcase, Info, Mail, Phone, MapPin, Star, GraduationCap, LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useGetApplicationsForAdminQuery, useForwardInterviewMutation, useForwardOfferMutation, useUpdateApplicationByAdminMutation, useGetPendingApplicationsQuery } from '@/features/admin/adminApiService';

const Workflow = () => {
  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Platform Approval Workflows</CardTitle>
                <CardDescription>Manage all critical approval points in the platform, from new applications to interviews and offers.</CardDescription>
            </CardHeader>
        </Card>
        <Tabs defaultValue="new-applications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new-applications">New Application Approvals</TabsTrigger>
                <TabsTrigger value="interview-offer-approvals">Interview & Offer Approvals</TabsTrigger>
            </TabsList>
            <TabsContent value="new-applications" className="mt-4">
                <NewApplicationApprovalQueue />
            </TabsContent>
            <TabsContent value="interview-offer-approvals" className="mt-4">
                <InterviewOfferApprovalQueue />
            </TabsContent>
        </Tabs>
    </div>
  );
};

const NewApplicationApprovalQueue = () => {
    const { data: pendingApps = [], isLoading, isError, refetch } = useGetPendingApplicationsQuery();
    const [updateApplication, { isLoading: isUpdating }] = useUpdateApplicationByAdminMutation();

    const handleApproval = async (appId: string, isApproved: boolean) => {
        const status = isApproved ? 'applied' : 'rejected';
        try {
            await updateApplication({ appId, body: { status, category: isApproved ? 'applied' : 'archived' } }).unwrap();
            toast.success(`Application has been ${isApproved ? 'approved and sent to college' : 'rejected'}.`);
        } catch (err) {
            toast.error("Failed to update application status.");
        }
    };

    if (isLoading) return <Skeleton className="h-64 w-full rounded-lg" />;
    if (isError) return <div className="text-center py-10 text-red-500"><Button onClick={() => refetch()} variant="link">Error loading data. Click to try again.</Button></div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>New Application Queue</CardTitle>
                <CardDescription>Review new applications before they are visible to colleges. Approve to forward, or reject to dismiss.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingApps.length === 0 && <div className="text-center py-10 text-muted-foreground"><Info className="mx-auto mb-2" />No new applications are pending approval.</div>}
                {pendingApps.map(app => (
                    <Card key={app._id} className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2"><User size={16} /><h4 className="font-semibold">{app.user.employerProfile?.name}</h4></div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Briefcase size={14} /><span>Applied for: {app.job.title}</span></div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground"><Building size={14} /><span>At: {app.job.schoolName}</span></div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Dialog><DialogTrigger asChild><Button variant="outline" size="sm" className="flex-1">View Details</Button></DialogTrigger><ApplicationDetailsModal application={app} /></Dialog>
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => handleApproval(app._id, true)} disabled={isUpdating}><Check size={16} className="mr-2"/>Approve</Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive" size="sm" className="flex-1"><X size={16} className="mr-2"/>Reject</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>Reject Application?</AlertDialogTitle><AlertDialogDescription>This will permanently dismiss the application. It will not be sent to the college.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleApproval(app._id, false)} className="bg-destructive hover:bg-destructive/90">Confirm Reject</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

const InterviewOfferApprovalQueue = () => {
    const { data: applications = [], isLoading, isError, refetch } = useGetApplicationsForAdminQuery();
    const [forwardInterview, { isLoading: isApprovingInterview }] = useForwardInterviewMutation();
    const [forwardOffer, { isLoading: isApprovingOffer }] = useForwardOfferMutation();
    const [updateApplication, { isLoading: isRejecting }] = useUpdateApplicationByAdminMutation();

    const workflowItems = useMemo(() => applications.map(app => {
      let type = '', status = '';
      if (app.status === 'interview_scheduled') { type = 'Interview Schedule'; status = app.interviewDetails?.confirmedByAdmin ? 'Approved' : 'Pending Approval'; } 
      else if (app.status === 'offer_extended' || app.status === 'hired') { type = 'Offer Letter'; status = app.offerLetter?.forwardedByAdmin ? 'Approved' : 'Pending Approval'; } 
      else { return null; }
      return { id: app._id, type, status, candidateName: app.user?.employerProfile?.name || 'N/A', collegeName: app.job?.schoolName || 'N/A', jobTitle: app.job?.title || 'N/A', updatedAt: app.updatedAt, interviewDetails: app.interviewDetails, offerLetter: app.offerLetter };
    }).filter(item => item !== null && item.status === 'Pending Approval'), [applications]);

    const handleApprove = async (item) => {
        try {
            if (item.type === 'Interview Schedule') { await forwardInterview(item.id).unwrap(); toast.success('Interview forwarded!'); } 
            else if (item.type === 'Offer Letter') { await forwardOffer(item.id).unwrap(); toast.success('Offer forwarded!'); }
        } catch (err) { toast.error('Failed to approve.'); }
    };

    const handleReject = async (item) => {
        try {
            await updateApplication({ appId: item.id, body: { status: 'rejected', category: 'archived' } }).unwrap();
            toast.success('Submission rejected.');
        } catch (err) { toast.error('Failed to reject.'); }
    };

    if (isLoading) return <Skeleton className="h-64 w-full rounded-lg" />;
    if (isError) return <div className="text-center py-10 text-red-500"><Button onClick={() => refetch()} variant="link">Error loading data. Click to try again.</Button></div>;

    return (
        <Card>
             <CardHeader>
                <CardTitle>Interview & Offer Queue</CardTitle>
                <CardDescription>Review interviews and offers scheduled by colleges before they are sent to candidates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {workflowItems.length === 0 && <div className="text-center py-10 text-muted-foreground"><Info className="mx-auto mb-2" />No interviews or offers are pending approval.</div>}
                {workflowItems.map(item => (
                    <Card key={item.id} className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                           <div className="flex-1">
                               <div className="flex items-center gap-3 mb-2">
                                   <div className={`p-2 rounded-full ${item.type === 'Interview Schedule' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                                       {item.type === 'Interview Schedule' ? <Calendar size={16}/> : <FileText size={16}/>}
                                   </div>
                                   <h4 className="font-semibold">{item.type}</h4>
                               </div>
                               <p className="text-sm"><strong>Candidate:</strong> {item.candidateName}</p>
                               <p className="text-sm"><strong>College:</strong> {item.collegeName} for {item.jobTitle}</p>
                               {item.type === 'Offer Letter' && item.offerLetter?.url && <a href={item.offerLetter.url} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"><LinkIcon size={14}/>View Offer Letter</a>}
                           </div>
                           <div className="flex gap-2 w-full sm:w-auto">
                                <Button size="sm" className="flex-1" onClick={() => handleApprove(item)} disabled={isApprovingInterview || isApprovingOffer}><Check size={16} className="mr-2"/>Approve</Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><Button variant="destructive" size="sm" className="flex-1"><X size={16} className="mr-2"/>Reject</Button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader><AlertDialogTitle>Reject Submission?</AlertDialogTitle><AlertDialogDescription>This will reject the submission and notify the college.</AlertDialogDescription></AlertDialogHeader>
                                        <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleReject(item)} disabled={isRejecting} className="bg-destructive hover:bg-destructive/90">Confirm Reject</AlertDialogAction></AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                           </div>
                        </div>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

const ApplicationDetailsModal = ({ application }) => (
    <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>A complete overview of the applicant and the job they applied for.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 flex-1 overflow-y-auto pr-4">
            <div className="space-y-4">
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><User size={20}/>Applicant Profile</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <p><strong>Name:</strong> {application.user.employerProfile.name}</p>
                        <p className="flex items-center gap-2"><strong>Email:</strong> <a href={`mailto:${application.user.email}`} className="text-primary hover:underline">{application.user.email}</a></p>
                        <p className="flex items-center gap-2"><strong>Phone:</strong> {application.user.employerProfile.phone || 'N/A'}</p>
                        <p className="flex items-center gap-2"><strong>Location:</strong> {application.user.employerProfile.location || 'N/A'}</p>
                        <p><strong>Headline:</strong> {application.user.employerProfile.headline || 'N/A'}</p>
                        <div className="pt-2"><p className="font-semibold mb-2">Skills:</p><div className="flex flex-wrap gap-2">{application.user.employerProfile.skills.map(s => <Badge key={s._id} variant="secondary">{s.name}</Badge>)}</div></div>
                    </CardContent>
                </Card>
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><Briefcase size={20}/>Work Experience</CardTitle></CardHeader>
                    <CardContent>{application.user.employerProfile.workExperience.map(exp => <div key={exp._id} className="mb-2"><p className="font-semibold">{exp.title} at {exp.company}</p><p className="text-sm text-muted-foreground">{exp.duration}</p></div>)}</CardContent>
                </Card>
                 <Card><CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap size={20}/>Education</CardTitle></CardHeader>
                    <CardContent>{application.user.employerProfile.education.map(edu => <div key={edu._id} className="mb-2"><p className="font-semibold">{edu.degree} from {edu.school}</p><p className="text-sm text-muted-foreground">{edu.year}</p></div>)}</CardContent>
                </Card>
            </div>
            <div className="space-y-4">
                <Card><CardHeader><CardTitle className="flex items-center gap-2"><Briefcase size={20}/>Job Details</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <p><strong>Title:</strong> {application.job.title}</p>
                        <p><strong>School:</strong> {application.job.schoolName}</p>
                        <p><strong>Location:</strong> {application.job.location}</p>
                        <p><strong>Salary:</strong> {application.job.salary || 'Not Disclosed'}</p>
                        <p><strong>Type:</strong> {application.job.type || 'N/A'}</p>
                        <div className="pt-2"><p className="font-semibold">Description:</p><p className="text-sm text-muted-foreground whitespace-pre-wrap">{application.job.description}</p></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </DialogContent>
);

export default Workflow;