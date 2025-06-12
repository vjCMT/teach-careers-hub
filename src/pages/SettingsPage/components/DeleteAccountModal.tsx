
import { useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { useDeleteAccountMutation, useLogoutMutation } from '../../../features/auth/authApiService';
import { logOut } from '../../../features/auth/authSlice';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface DeleteAccountModalProps {
  onClose: () => void;
}

const DeleteAccountModal = ({ onClose }: DeleteAccountModalProps) => {
  const [password, setPassword] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAccountMutation();
  const [logout] = useLogoutMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!password) {
      setError('Password is required to delete your account.');
      return;
    }

    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm account deletion.');
      return;
    }

    try {
      await deleteAccount({ password }).unwrap();
      
      // Log out the user and clear session
      try {
        await logout().unwrap();
      } catch (logoutErr) {
        // Even if logout API fails, we'll clear local state
        console.warn('Logout API failed, but proceeding with local cleanup');
      }
      
      dispatch(logOut());
      toast.success('Account deleted successfully.');
      navigate('/');
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Failed to delete account. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all your data.
          </DialogDescription>
        </DialogHeader>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Warning:</strong> Deleting your account is permanent and irreversible.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isDeleting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmText">
              Type <strong>DELETE</strong> to confirm
            </Label>
            <Input
              id="confirmText"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE"
              disabled={isDeleting}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive" 
              disabled={isDeleting || confirmText !== 'DELETE'}
            >
              {isDeleting ? 'Deleting...' : 'Delete Account'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
