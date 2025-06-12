
import { useState } from 'react';
import { User } from '../../../features/auth/authSlice';
import { useGetEmployerProfileQuery, useUpdateEmployerProfileDetailsMutation } from '../../../features/profile/employerProfileApiService';
import { useGetCollegeProfileQuery, useUpdateCollegeProfileDetailsMutation } from '../../../features/profile/collegeProfileApiService';
import { useGetAdminProfileQuery, useUpdateAdminProfileDetailsMutation } from '../../../features/profile/adminProfileApiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Separator } from '../../../components/ui/separator';
import ChangePasswordModal from './ChangePasswordModal';
import DeleteAccountModal from './DeleteAccountModal';
import { Mail, Lock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AccountSettingsProps {
  user: User;
}

const AccountSettings = ({ user }: AccountSettingsProps) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Common Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>Basic account details and login information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input value={user.email} disabled className="bg-muted" />
            <p className="text-sm text-muted-foreground">
              Your email address cannot be changed. Contact support if needed.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Account Type</Label>
            <Input value={user.role} disabled className="bg-muted capitalize" />
          </div>

          <Separator />

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Change Password
            </Button>
            
            <Button
              variant="destructive"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Role-specific fields */}
      {user.role === 'employer' && <EmployerAccountFields />}
      {user.role === 'college' && <CollegeAccountFields />}
      {user.role === 'admin' && <AdminAccountFields />}

      {/* Modals */}
      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
};

const EmployerAccountFields = () => {
  const { data: profile, isLoading, error } = useGetEmployerProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateEmployerProfileDetailsMutation();
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');

  React.useEffect(() => {
    if (profile) {
      setPhone(profile.phone || '');
      setCompanyName(profile.companyName || '');
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({ phone, companyName }).unwrap();
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  if (isLoading) return <div>Loading employer profile...</div>;
  if (error) return <div>Error loading profile.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employer Details</CardTitle>
        <CardDescription>Manage your company information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <Button onClick={handleSave} disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

const CollegeAccountFields = () => {
  const { data: profile, isLoading, error } = useGetCollegeProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateCollegeProfileDetailsMutation();
  const [phone, setPhone] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [address, setAddress] = useState('');

  React.useEffect(() => {
    if (profile) {
      setPhone(profile.phone || '');
      setCollegeName(profile.collegeName || '');
      setAddress(profile.address || '');
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      await updateProfile({ phone, collegeName, address }).unwrap();
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  if (isLoading) return <div>Loading college profile...</div>;
  if (error) return <div>Error loading profile.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>College Details</CardTitle>
        <CardDescription>Manage your institution information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="collegeName">College Name</Label>
          <Input
            id="collegeName"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            placeholder="Enter college name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter college address"
          />
        </div>

        <Button onClick={handleSave} disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

const AdminAccountFields = () => {
  const { data: profile, isLoading, error } = useGetAdminProfileQuery();

  if (isLoading) return <div>Loading admin profile...</div>;
  if (error) return <div>Error loading profile.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Details</CardTitle>
        <CardDescription>View your administrative information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={profile?.role || ''} disabled className="bg-muted" />
        </div>
        
        <div className="space-y-2">
          <Label>Permissions</Label>
          <div className="space-y-1">
            {profile?.permissions?.map((permission, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                • {permission}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
