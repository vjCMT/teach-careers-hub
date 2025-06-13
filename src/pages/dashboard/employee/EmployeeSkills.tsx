
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X, BookOpen, Award, Briefcase } from 'lucide-react';

const EmployeeSkills = () => {
  const [skills, setSkills] = useState(['English Literature', 'Classroom Management', 'Curriculum Development']);
  const [qualifications, setQualifications] = useState([
    { degree: 'M.A. English Literature', institution: 'Delhi University', year: '2018' },
    { degree: 'B.Ed.', institution: 'IGNOU', year: '2019' }
  ]);
  const [experience, setExperience] = useState([
    { position: 'English Teacher', school: 'ABC Public School', duration: '2019-2024', description: 'Taught English to grades 6-10' }
  ]);

  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState({ degree: '', institution: '', year: '' });
  const [newExperience, setNewExperience] = useState({ position: '', school: '', duration: '', description: '' });

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addQualification = () => {
    if (newQualification.degree && newQualification.institution && newQualification.year) {
      setQualifications([...qualifications, newQualification]);
      setNewQualification({ degree: '', institution: '', year: '' });
    }
  };

  const addExperience = () => {
    if (newExperience.position && newExperience.school && newExperience.duration) {
      setExperience([...experience, newExperience]);
      setNewExperience({ position: '', school: '', duration: '', description: '' });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Skills & Experience</h1>

      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Teaching Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                  onClick={() => removeSkill(index)}
                />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Qualifications Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {qualifications.map((qual, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{qual.degree}</h3>
                <p className="text-gray-600">{qual.institution}</p>
                <p className="text-sm text-gray-500">Year: {qual.year}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <Input
              placeholder="Degree/Certification"
              value={newQualification.degree}
              onChange={(e) => setNewQualification({...newQualification, degree: e.target.value})}
            />
            <Input
              placeholder="Institution"
              value={newQualification.institution}
              onChange={(e) => setNewQualification({...newQualification, institution: e.target.value})}
            />
            <div className="flex gap-2">
              <Input
                placeholder="Year"
                value={newQualification.year}
                onChange={(e) => setNewQualification({...newQualification, year: e.target.value})}
              />
              <Button onClick={addQualification}>Add</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Teaching Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-gray-600">{exp.school}</p>
                <p className="text-sm text-gray-500">{exp.duration}</p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
          <div className="space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Position/Role"
                value={newExperience.position}
                onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
              />
              <Input
                placeholder="School/Institution"
                value={newExperience.school}
                onChange={(e) => setNewExperience({...newExperience, school: e.target.value})}
              />
              <Input
                placeholder="Duration (e.g., 2019-2024)"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
              />
              <Input
                placeholder="Brief Description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
              />
            </div>
            <Button onClick={addExperience}>Add Experience</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeSkills;
