import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppDispatch } from '@/app/hooks';
import { useSignupMutation } from '@/features/auth/authApiService';
import { setCredentials } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'employer' | 'employee' | 'admin' | 'college' | ''>('');
  const [error, setError] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword || !role) {
      const errorMessage = 'Please fill in all fields';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      const errorMessage = 'Passwords do not match';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    if (password.length < 6) {
      const errorMessage = 'Password must be at least 6 characters long';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    try {
      const response = await signup({ fullName, email, password, confirmPassword, role }).unwrap();
      
      dispatch(setCredentials({ user: response.user }));
      toast.success('Account created and logged in successfully!');

      switch (response.user.role) {
        case 'employer':
          navigate('/my-profile');
          break;
        case 'college':
          navigate('/college-profile');
          break;
        case 'admin':
          navigate('/admin-profile');
          break;
        case 'employee':
          navigate('/employee-profile');
          break;
        default:
          navigate('/');
      }
    } catch (err: any) {
      const errorMessage = err.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employer">Teacher / Candidate</SelectItem>
                  <SelectItem value="college">School / College</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="p-0 font-medium text-primary hover:underline">
              Login
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;