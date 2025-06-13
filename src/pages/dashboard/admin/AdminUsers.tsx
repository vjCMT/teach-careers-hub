import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye, Edit, Ban, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+91 9876543210',
      role: 'employee',
      location: 'New Delhi',
      joinDate: '2024-01-15',
      status: 'active',
      applications: 5,
      profileComplete: 85
    },
    {
      id: 2,
      name: 'Delhi Public School',
      email: 'admin@dpsdelhi.edu.in',
      phone: '+91 11 2634 5678',
      role: 'college',
      location: 'New Delhi',
      joinDate: '2023-12-10',
      status: 'active',
      jobsPosted: 12,
      profileComplete: 95
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      phone: '+91 9876543211',
      role: 'employee',
      location: 'Mumbai',
      joinDate: '2024-01-05',
      status: 'inactive',
      applications: 0,
      profileComplete: 60
    },
    {
      id: 4,
      name: 'St. Mary\'s School',
      email: 'hr@stmarys.edu.in',
      phone: '+91 22 2345 6789',
      role: 'college',
      location: 'Mumbai',
      joinDate: '2023-11-20',
      status: 'active',
      jobsPosted: 8,
      profileComplete: 90
    }
  ];

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === 'active' ? 'default' : 'secondary'} 
             className={status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      'employee': { label: 'Teacher', className: 'bg-blue-100 text-blue-800' },
      'college': { label: 'College', className: 'bg-purple-100 text-purple-800' },
      'admin': { label: 'Admin', className: 'bg-red-100 text-red-800' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig];
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const filterUsersByRole = (role?: string) => {
    const filtered = role ? users.filter(user => user.role === role) : users;
    return filtered.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const UserCard = ({ user }: { user: typeof users[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              {getRoleBadge(user.role)}
              {getStatusBadge(user.status)}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {user.phone}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined: {new Date(user.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">
              Profile: {user.profileComplete}% complete
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${user.profileComplete}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {user.role === 'employee' ? (
              <span>{user.applications} applications submitted</span>
            ) : user.role === 'college' ? (
              <span>{user.jobsPosted} jobs posted</span>
            ) : null}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              View Profile
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              Message
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Ban className="h-4 w-4" />
              {user.status === 'active' ? 'Suspend' : 'Activate'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
        <div className="flex gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{users.filter(u => u.role === 'employee').length}</div>
            <div className="text-gray-600">Teachers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'college').length}</div>
            <div className="text-gray-600">Colleges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</div>
            <div className="text-gray-600">Active Users</div>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
          <TabsTrigger value="employee">Teachers ({users.filter(u => u.role === 'employee').length})</TabsTrigger>
          <TabsTrigger value="college">Colleges ({users.filter(u => u.role === 'college').length})</TabsTrigger>
          <TabsTrigger value="admin">Admins ({users.filter(u => u.role === 'admin').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filterUsersByRole().map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </TabsContent>

        <TabsContent value="employee" className="space-y-4">
          {filterUsersByRole('employee').map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </TabsContent>

        <TabsContent value="college" className="space-y-4">
          {filterUsersByRole('college').map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          {filterUsersByRole('admin').map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUsers;
