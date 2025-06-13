import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch } from '@/app/hooks';
import { useLoginMutation } from '@/features/auth/authApiService';
import { setCredentials } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    try {
      console.log('Attempting login with:', { email });
      const response = await login({ email, password }).unwrap();
      console.log('Login response:', response);
      
      if (response.success) {
        dispatch(setCredentials({ user: response.user }));
        toast.success('Logged in successfully!');
        
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
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.data?.message || err.message || 'Invalid email or password';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="p-0 font-medium text-primary hover:underline">
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;