import React, { useState, useEffect } from 'react';
import { Send, Calendar, FileText, CheckCircle, Bookmark, Check, Loader2, Info, Building, Link as LinkIcon, X, Briefcase, Trash2, MapPin } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useGetMyApplicationsQuery, useUpdateApplicationMutation, useWithdrawApplicationMutation, useApplyToJobMutation, useUnsaveJobMutation } from '@/features/profile/employerProfileApiService';
import toast from 'react-hot-toast';
import { Application } from '@/types/employer';

type ApplicationCategory = 'applied' | 'interviews' | 'offers' | 'hired' | 'saved';

const getApplicationStatus = (app: Application) => {
    if (app.status === 'pending_admin_approval') return { text: "Pending Admin Approval", color: "bg-gray-100 text-gray-800", icon: <Loader2 className="w-3 h-3 animate-spin" /> };
    if (app.status === 'applied') return { text: "Application Sent", color: "bg-blue-100 text-blue-800", icon: <Send className="w-3 h-3" /> };
    if (app.status === 'viewed' || app.status === 'shortlisted') return { text: "Reviewed by College", color: "bg-blue-100 text-blue-800", icon: <Info className="w-3 h-3" /> };
    if (app.status === 'interview_scheduled' && app.interviewDetails?.confirmedByAdmin) return { text: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: <Calendar className="w-3 h-3" /> };
    if (app.status === 'offer_extended' && app.offerLetter?.forwardedByAdmin) return { text: "Offer Received", color: "bg-green-100 text-green-800", icon: <FileText className="w-3 h-3" /> };
    if (app.status === 'hired') return { text: "Offer Accepted", color: "bg-green-200 text-green-900", icon: <CheckCircle className="w-3 h-3" /> };
    if (app.status === 'rejected') return { text: "Not Selected", color: "bg-red-100 text-red-800", icon: <X className="w-3 h-3" /> };
    return { text: "In Progress", color: "bg-gray-100 text-gray-800", icon: <Info className="w-3 h-3" /> };
};

const ApplicationProgress = ({ app }: { app: Application }) => {
    const steps = [ { label: "Applied" }, { label: "Admin Review" }, { label: "College Review" }, { label: "Interview" }, { label: "Offer" }, { label: "Hired" } ];
    let currentStep = 0;
    if (app.status === 'pending_admin_approval') currentStep = 1;
    if (app.status === 'applied' || app.status === 'viewed' || app.status === 'shortlisted') currentStep = 2;
    if (app.status === 'interview_scheduled') currentStep = 3;
    if (app.status === 'offer_extended') currentStep = 4;
    if (app.status === 'hired') currentStep = 5;
    return (
        <div className="flex items-center">
            {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center text-center px-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`}>
                            {index <= currentStep && <Check className="w-4 h-4 text-primary-foreground" />}
                        </div>
                        <p className={`text-xs mt-1 whitespace-nowrap ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step.label}</p>
                    </div>
                    {index < steps.length - 1 && <div className={`flex-1 h-0.5 transition-colors min-w-[10px] sm:min-w-[20px] ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />}
                </React.Fragment>
            ))}
        </div>
    );
};

const InterviewLink = ({ scheduledOn, meetingLink }: { scheduledOn?: string; meetingLink?: string; }) => {
    const [linkState, setLinkState] = useState<'upcoming' | 'active' | 'expired'>('upcoming');
    useEffect(() => {
        if (!scheduledOn) return;
        const checkTime = () => {
            const now = new Date();
            const interviewTime = new Date(scheduledOn);
            const startTime = new Date(interviewTime.getTime() - 30 * 60000); 
            const endTime = new Date(interviewTime.getTime() + 30 * 60000);
            if (now >= startTime && now <= endTime) { setLinkState('active'); } 
            else if (now > endTime) { setLinkState('expired'); } 
            else { setLinkState('upcoming'); }
        };
        checkTime();
        const interval = setInterval(checkTime, 60000);
        return () => clearInterval(interval);
    }, [scheduledOn]);
    if (!meetingLink) return null;
    if (linkState === 'active') { return <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium break-all">{meetingLink}</a>; }
    const message = linkState === 'upcoming' ? `Link will be active 30 mins before the interview` : `Interview time has passed`;
    return <span className="text-muted-foreground italic" title={message}>{meetingLink}</span>;
};

const SavedJobCard = ({ app, onUnsave }: { app: Application; onUnsave: (appId: string) => void; }) => {
    const [applyToJob, { isLoading: isApplying }] = useApplyToJobMutation();

    const handleApply = async () => {
        const loadingToast = toast.loading('Applying...');
        try {
            await applyToJob(app.job._id).unwrap();
            toast.success('Successfully applied!', { id: loadingToast });
        } catch (err: any) {
            toast.error(err.data?.message || 'Failed to apply.', { id: loadingToast });
        }
    };
    
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <CardTitle className="text-lg">{app.job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1"><Building size={14}/> {app.job.schoolName}</CardDescription>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1"><MapPin size={14}/> {app.job.location}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button onClick={handleApply} disabled={isApplying} className="flex-1"><Send className="w-4 h-4 mr-2"/>Apply Now</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="outline" className="flex-1"><Trash2 className="w-4 h-4 mr-2"/>Unsave</Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will remove the job from your saved list.</AlertDialogDescription></AlertDialogHeader>
                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => onUnsave(app._id)}>Confirm</AlertDialogAction></AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

const EmployerApplications = () => {
    const [activeCategory, setActiveCategory] = useState<ApplicationCategory>('applied');
    const { data: applications = [], isLoading, isError, refetch } = useGetMyApplicationsQuery(activeCategory);
    const [updateApplication, { isLoading: isUpdating }] = useUpdateApplicationMutation();
    const [withdrawApplication, { isLoading: isWithdrawing }] = useWithdrawApplicationMutation();
    const [unsaveJob] = useUnsaveJobMutation();

    const handleUpdate = async (appId: string, action: 'accept_offer' | 'decline_offer') => {
        try { await updateApplication({ appId, body: { action } }).unwrap(); toast.success(`Offer ${action.includes('accept') ? 'accepted' : 'declined'}!`); } catch { toast.error("Failed to update offer status."); }
    };

    const handleWithdraw = async (appId: string) => {
        try { await withdrawApplication(appId).unwrap(); toast.success('Application has been withdrawn.'); } catch { toast.error("Failed to withdraw application."); }
    };
    
    const handleUnsave = async (appId: string) => {
        try { await unsaveJob(appId).unwrap(); toast.success('Job unsaved.'); } catch { toast.error("Failed to unsave job."); }
    };

    const categories = [ { key: 'applied' as const, label: 'Applied', icon: Send }, { key: 'interviews' as const, label: 'Interviews', icon: Calendar }, { key: 'offers' as const, label: 'Offers', icon: FileText }, { key: 'hired' as const, label: 'Hired', icon: CheckCircle }, { key: 'saved' as const, label: 'Saved', icon: Bookmark } ];

    const renderContent = () => {
        if (isLoading) return <div className="flex justify-center items-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
        if (isError) return <div className="text-center p-12 text-red-600"><Button onClick={() => refetch()} variant="link">Failed to load applications. Click to retry.</Button></div>;
        if (!applications || applications.length === 0) return (
            <Card className="flex flex-col items-center justify-center p-12 text-center bg-muted/30 border-dashed">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border"><Briefcase className="w-8 h-8 text-muted-foreground" /></div>
                <h3 className="text-lg font-medium text-foreground mb-1">No Applications Here</h3>
                <p className="text-muted-foreground text-sm max-w-xs">Applications in the '{activeCategory}' stage will appear here.</p>
            </Card>
        );
        return (
            <div className="space-y-6">
                {applications.map((app) => {
                    if (activeCategory === 'saved') {
                        return <SavedJobCard key={app._id} app={app} onUnsave={handleUnsave} />;
                    }
                    const status = getApplicationStatus(app);
                    return (
                        <Card key={app._id} className="overflow-hidden">
                            <CardHeader className="p-4 bg-muted/30 border-b"><div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2"><div><CardTitle className="text-lg">{app.job.title}</CardTitle><CardDescription className="flex items-center gap-2"><Building size={14} /> {app.job.schoolName}</CardDescription></div><Badge className={`gap-1.5 ${status.color}`}>{status.icon}{status.text}</Badge></div></CardHeader>
                            <CardContent className="p-4 space-y-4">
                                {app.interviewDetails?.confirmedByAdmin && (
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-2">
                                        <p className="font-semibold text-blue-800 flex items-center gap-2"><Calendar size={16} />Interview Details</p>
                                        <p><strong>Date & Time:</strong> {new Date(app.interviewDetails.scheduledOn!).toLocaleString()}</p>
                                        <p><strong>Type:</strong> {app.interviewDetails.interviewType}</p>
                                        <div className="flex items-start gap-2"><strong>Link:</strong><InterviewLink scheduledOn={app.interviewDetails.scheduledOn} meetingLink={app.interviewDetails.meetingLink} /></div>
                                        {app.interviewDetails.notes && <p><strong>Notes from College:</strong> {app.interviewDetails.notes}</p>}
                                    </div>
                                )}
                                {app.offerLetter?.forwardedByAdmin && (
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm space-y-1">
                                        <p className="font-semibold text-green-800 flex items-center gap-2"><FileText size={16} />Offer Details</p>
                                        <p><strong>Salary:</strong> {app.offerDetails?.salary}</p>
                                        <p><strong>Joining Date:</strong> {new Date(app.offerDetails?.joiningDate!).toLocaleDateString()}</p>
                                        {app.offerDetails?.offerText && <p><strong>Message:</strong> {app.offerDetails.offerText}</p>}
                                        {app.offerLetter.url && <a href={app.offerLetter.url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 font-medium"><LinkIcon size={14} />View Official Offer Letter</a>}
                                    </div>
                                )}
                                <div className="pt-2 overflow-x-auto"><ApplicationProgress app={app} /></div>
                            </CardContent>
                            <CardFooter className="p-4 bg-muted/30 flex justify-end gap-2">
                                {app.category === 'offers' && app.status === 'offer_extended' && (<><Button onClick={() => handleUpdate(app._id, 'accept_offer')} disabled={isUpdating} className="bg-green-600 hover:bg-green-700"><Check className="w-4 h-4 mr-2" />Accept Offer</Button><AlertDialog><AlertDialogTrigger asChild><Button variant="destructive" disabled={isUpdating}><X className="w-4 h-4 mr-2" />Decline Offer</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will decline the offer and move the application to your archive.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleUpdate(app._id, 'decline_offer')} className="bg-destructive hover:bg-destructive/90">Confirm Decline</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>)}
                                {(app.category === 'applied' || app.category === 'interviews') && (<AlertDialog><AlertDialogTrigger asChild><Button variant="outline" disabled={isWithdrawing}><X className="w-4 h-4 mr-2" />Withdraw Application</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>You can re-apply for this job later if it is still open.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleWithdraw(app._id)} className="bg-destructive hover:bg-destructive/90">Confirm Withdraw</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>)}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div><h1 className="text-3xl font-bold text-foreground">My Applications</h1><p className="text-muted-foreground mt-1">Track the status of all your job applications.</p></div>
            </div>
            <div className="bg-background p-1 rounded-lg border inline-flex flex-wrap gap-1">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Button key={category.key} onClick={() => setActiveCategory(category.key)} variant={activeCategory === category.key ? "default" : "ghost"} className="flex items-center justify-center gap-2"><Icon className="w-4 h-4" /><span>{category.label}</span></Button>
                    );
                })}
            </div>
            {renderContent()}
        </div>
    );
};

export default EmployerApplications;