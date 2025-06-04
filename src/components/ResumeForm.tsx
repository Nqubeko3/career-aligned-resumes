import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Briefcase, User, Calendar, Edit } from 'lucide-react';
import { ResumeData } from '@/pages/Index';
import { ProfessionSuggestions } from '@/components/ProfessionSuggestions';

interface ResumeFormProps {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  onNext: () => void;
}

export const ResumeForm = ({ resumeData, updateResumeData, onNext }: ResumeFormProps) => {
  const [activeTab, setActiveTab] = useState('personal');

  const updatePersonalInfo = (field: string, value: string) => {
    updateResumeData('personalInfo', {
      ...resumeData.personalInfo,
      [field]: value
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateResumeData('experience', [...resumeData.experience, newExp]);
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = resumeData.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateResumeData('experience', updated);
  };

  const removeExperience = (id: string) => {
    updateResumeData('experience', resumeData.experience.filter(exp => exp.id !== id));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    updateResumeData('education', [...resumeData.education, newEdu]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = resumeData.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateResumeData('education', updated);
  };

  const removeEducation = (id: string) => {
    updateResumeData('education', resumeData.education.filter(edu => edu.id !== id));
  };

  const addSkillCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      category: 'Technical Skills',
      items: []
    };
    updateResumeData('skills', [...resumeData.skills, newCategory]);
  };

  const updateSkillCategory = (id: string, field: string, value: any) => {
    const updated = resumeData.skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    );
    updateResumeData('skills', updated);
  };

  const addSkillItem = (categoryId: string, skill: string) => {
    if (!skill.trim()) return;
    
    const updated = resumeData.skills.map(category =>
      category.id === categoryId
        ? { ...category, items: [...category.items, skill.trim()] }
        : category
    );
    updateResumeData('skills', updated);
  };

  const removeSkillItem = (categoryId: string, skillIndex: number) => {
    const updated = resumeData.skills.map(category =>
      category.id === categoryId
        ? { ...category, items: category.items.filter((_, index) => index !== skillIndex) }
        : category
    );
    updateResumeData('skills', updated);
  };

  const addReference = () => {
    const newRef = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
      email: '',
      phone: ''
    };
    updateResumeData('references', [...resumeData.references, newRef]);
  };

  const updateReference = (id: string, field: string, value: string) => {
    const updated = resumeData.references.map(ref =>
      ref.id === id ? { ...ref, [field]: value } : ref
    );
    updateResumeData('references', updated);
  };

  const removeReference = (id: string) => {
    updateResumeData('references', resumeData.references.filter(ref => ref.id !== id));
  };

  const isFormValid = () => {
    return resumeData.personalInfo.fullName && 
           resumeData.personalInfo.email && 
           resumeData.profession;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Edit className="w-6 h-6 text-blue-600" />
            <span>Build Your Resume</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="references">References</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website/Portfolio</Label>
                  <Input
                    id="website"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    placeholder="www.johndoe.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="profession">Profession/Industry *</Label>
                <Select
                  value={resumeData.profession}
                  onValueChange={(value) => updateResumeData('profession', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent className="max-h-96 overflow-y-auto">
                    {/* Technology & Engineering */}
                    <SelectItem value="software-engineer">Software Engineer</SelectItem>
                    <SelectItem value="data-scientist">Data Scientist</SelectItem>
                    <SelectItem value="web-developer">Web Developer</SelectItem>
                    <SelectItem value="mobile-developer">Mobile Developer</SelectItem>
                    <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                    <SelectItem value="cybersecurity-analyst">Cybersecurity Analyst</SelectItem>
                    <SelectItem value="cloud-architect">Cloud Architect</SelectItem>
                    <SelectItem value="ai-engineer">AI/ML Engineer</SelectItem>
                    <SelectItem value="systems-administrator">Systems Administrator</SelectItem>
                    <SelectItem value="network-engineer">Network Engineer</SelectItem>
                    <SelectItem value="qa-engineer">QA Engineer</SelectItem>
                    <SelectItem value="technical-writer">Technical Writer</SelectItem>
                    
                    {/* Business & Management */}
                    <SelectItem value="product-manager">Product Manager</SelectItem>
                    <SelectItem value="project-manager">Project Manager</SelectItem>
                    <SelectItem value="business-analyst">Business Analyst</SelectItem>
                    <SelectItem value="operations-manager">Operations Manager</SelectItem>
                    <SelectItem value="general-manager">General Manager</SelectItem>
                    <SelectItem value="ceo">CEO/Executive</SelectItem>
                    <SelectItem value="consultant">Management Consultant</SelectItem>
                    <SelectItem value="strategy-manager">Strategy Manager</SelectItem>
                    <SelectItem value="program-manager">Program Manager</SelectItem>
                    
                    {/* Marketing & Sales */}
                    <SelectItem value="marketing-manager">Marketing Manager</SelectItem>
                    <SelectItem value="digital-marketer">Digital Marketing Specialist</SelectItem>
                    <SelectItem value="content-marketer">Content Marketing Manager</SelectItem>
                    <SelectItem value="seo-specialist">SEO Specialist</SelectItem>
                    <SelectItem value="social-media-manager">Social Media Manager</SelectItem>
                    <SelectItem value="sales-manager">Sales Manager</SelectItem>
                    <SelectItem value="sales-representative">Sales Representative</SelectItem>
                    <SelectItem value="account-manager">Account Manager</SelectItem>
                    <SelectItem value="business-development">Business Development</SelectItem>
                    <SelectItem value="brand-manager">Brand Manager</SelectItem>
                    <SelectItem value="public-relations">Public Relations Specialist</SelectItem>
                    
                    {/* Finance & Accounting */}
                    <SelectItem value="financial-analyst">Financial Analyst</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="investment-banker">Investment Banker</SelectItem>
                    <SelectItem value="financial-advisor">Financial Advisor</SelectItem>
                    <SelectItem value="treasury-analyst">Treasury Analyst</SelectItem>
                    <SelectItem value="risk-analyst">Risk Analyst</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="tax-specialist">Tax Specialist</SelectItem>
                    <SelectItem value="budget-analyst">Budget Analyst</SelectItem>
                    <SelectItem value="credit-analyst">Credit Analyst</SelectItem>
                    
                    {/* Healthcare & Medical */}
                    <SelectItem value="physician">Physician</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="pharmacist">Pharmacist</SelectItem>
                    <SelectItem value="physical-therapist">Physical Therapist</SelectItem>
                    <SelectItem value="medical-technician">Medical Technician</SelectItem>
                    <SelectItem value="healthcare-administrator">Healthcare Administrator</SelectItem>
                    <SelectItem value="medical-researcher">Medical Researcher</SelectItem>
                    <SelectItem value="dentist">Dentist</SelectItem>
                    <SelectItem value="veterinarian">Veterinarian</SelectItem>
                    <SelectItem value="psychologist">Psychologist</SelectItem>
                    
                    {/* Education */}
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="principal">Principal/Administrator</SelectItem>
                    <SelectItem value="curriculum-developer">Curriculum Developer</SelectItem>
                    <SelectItem value="education-coordinator">Education Coordinator</SelectItem>
                    <SelectItem value="librarian">Librarian</SelectItem>
                    <SelectItem value="student-counselor">Student Counselor</SelectItem>
                    <SelectItem value="training-specialist">Training Specialist</SelectItem>
                    
                    {/* Creative & Design */}
                    <SelectItem value="graphic-designer">Graphic Designer</SelectItem>
                    <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
                    <SelectItem value="web-designer">Web Designer</SelectItem>
                    <SelectItem value="interior-designer">Interior Designer</SelectItem>
                    <SelectItem value="artist">Artist</SelectItem>
                    <SelectItem value="photographer">Photographer</SelectItem>
                    <SelectItem value="videographer">Videographer</SelectItem>
                    <SelectItem value="animator">Animator</SelectItem>
                    <SelectItem value="creative-director">Creative Director</SelectItem>
                    <SelectItem value="copywriter">Copywriter</SelectItem>
                    
                    {/* Human Resources */}
                    <SelectItem value="hr-manager">HR Manager</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="hr-generalist">HR Generalist</SelectItem>
                    <SelectItem value="compensation-analyst">Compensation Analyst</SelectItem>
                    <SelectItem value="employee-relations">Employee Relations Specialist</SelectItem>
                    <SelectItem value="training-manager">Training Manager</SelectItem>
                    <SelectItem value="talent-acquisition">Talent Acquisition Specialist</SelectItem>
                    
                    {/* Legal */}
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                    <SelectItem value="paralegal">Paralegal</SelectItem>
                    <SelectItem value="legal-assistant">Legal Assistant</SelectItem>
                    <SelectItem value="compliance-officer">Compliance Officer</SelectItem>
                    <SelectItem value="contract-specialist">Contract Specialist</SelectItem>
                    <SelectItem value="legal-counsel">Legal Counsel</SelectItem>
                    
                    {/* Manufacturing & Operations */}
                    <SelectItem value="manufacturing-engineer">Manufacturing Engineer</SelectItem>
                    <SelectItem value="quality-assurance">Quality Assurance Specialist</SelectItem>
                    <SelectItem value="production-manager">Production Manager</SelectItem>
                    <SelectItem value="supply-chain-manager">Supply Chain Manager</SelectItem>
                    <SelectItem value="logistics-coordinator">Logistics Coordinator</SelectItem>
                    <SelectItem value="warehouse-manager">Warehouse Manager</SelectItem>
                    <SelectItem value="procurement-specialist">Procurement Specialist</SelectItem>
                    
                    {/* Customer Service & Support */}
                    <SelectItem value="customer-service-representative">Customer Service Representative</SelectItem>
                    <SelectItem value="customer-success-manager">Customer Success Manager</SelectItem>
                    <SelectItem value="support-specialist">Support Specialist</SelectItem>
                    <SelectItem value="call-center-manager">Call Center Manager</SelectItem>
                    <SelectItem value="client-relations">Client Relations Manager</SelectItem>
                    
                    {/* Real Estate & Construction */}
                    <SelectItem value="real-estate-agent">Real Estate Agent</SelectItem>
                    <SelectItem value="property-manager">Property Manager</SelectItem>
                    <SelectItem value="construction-manager">Construction Manager</SelectItem>
                    <SelectItem value="architect">Architect</SelectItem>
                    <SelectItem value="civil-engineer">Civil Engineer</SelectItem>
                    <SelectItem value="electrical-engineer">Electrical Engineer</SelectItem>
                    <SelectItem value="mechanical-engineer">Mechanical Engineer</SelectItem>
                    
                    {/* Media & Communications */}
                    <SelectItem value="journalist">Journalist</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="communications-specialist">Communications Specialist</SelectItem>
                    <SelectItem value="broadcast-technician">Broadcast Technician</SelectItem>
                    <SelectItem value="media-producer">Media Producer</SelectItem>
                    
                    {/* Research & Science */}
                    <SelectItem value="research-scientist">Research Scientist</SelectItem>
                    <SelectItem value="lab-technician">Lab Technician</SelectItem>
                    <SelectItem value="environmental-scientist">Environmental Scientist</SelectItem>
                    <SelectItem value="biomedical-researcher">Biomedical Researcher</SelectItem>
                    <SelectItem value="chemist">Chemist</SelectItem>
                    <SelectItem value="physicist">Physicist</SelectItem>
                    
                    {/* Hospitality & Tourism */}
                    <SelectItem value="hotel-manager">Hotel Manager</SelectItem>
                    <SelectItem value="event-planner">Event Planner</SelectItem>
                    <SelectItem value="travel-agent">Travel Agent</SelectItem>
                    <SelectItem value="restaurant-manager">Restaurant Manager</SelectItem>
                    <SelectItem value="chef">Chef</SelectItem>
                    <SelectItem value="concierge">Concierge</SelectItem>
                    
                    {/* Transportation & Logistics */}
                    <SelectItem value="pilot">Pilot</SelectItem>
                    <SelectItem value="truck-driver">Truck Driver</SelectItem>
                    <SelectItem value="logistics-manager">Logistics Manager</SelectItem>
                    <SelectItem value="fleet-manager">Fleet Manager</SelectItem>
                    <SelectItem value="transportation-coordinator">Transportation Coordinator</SelectItem>
                    
                    {/* Non-Profit & Social Services */}
                    <SelectItem value="social-worker">Social Worker</SelectItem>
                    <SelectItem value="program-coordinator">Program Coordinator</SelectItem>
                    <SelectItem value="fundraising-coordinator">Fundraising Coordinator</SelectItem>
                    <SelectItem value="community-outreach">Community Outreach Specialist</SelectItem>
                    <SelectItem value="case-manager">Case Manager</SelectItem>
                    
                    {/* Government & Public Service */}
                    <SelectItem value="policy-analyst">Policy Analyst</SelectItem>
                    <SelectItem value="government-administrator">Government Administrator</SelectItem>
                    <SelectItem value="public-affairs">Public Affairs Specialist</SelectItem>
                    <SelectItem value="urban-planner">Urban Planner</SelectItem>
                    <SelectItem value="law-enforcement">Law Enforcement Officer</SelectItem>
                    
                    {/* Other */}
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  placeholder="Write a compelling summary of your professional background..."
                  rows={4}
                />
                {resumeData.profession && (
                  <ProfessionSuggestions 
                    profession={resumeData.profession}
                    onSuggestionClick={(suggestion) => updatePersonalInfo('summary', suggestion)}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Work Experience</h3>
                <Button onClick={addExperience} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              
              {resumeData.experience.map((exp, index) => (
                <Card key={exp.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Experience #{index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        disabled={exp.current}
                      />
                      <label className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm">Currently working here</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements..."
                      rows={3}
                    />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education</h3>
                <Button onClick={addEducation} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
              
              {resumeData.education.map((edu, index) => (
                <Card key={edu.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Education #{index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <Label>Degree</Label>
                      <Input
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    <div>
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                        placeholder="Computer Science, Business, etc."
                      />
                    </div>
                    <div>
                      <Label>GPA (Optional)</Label>
                      <Input
                        value={edu.gpa}
                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                        placeholder="3.8/4.0"
                      />
                    </div>
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="skills" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Skills</h3>
                <Button onClick={addSkillCategory} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
              
              {resumeData.skills.map((skillCategory) => (
                <Card key={skillCategory.id} className="p-4">
                  <div className="mb-4">
                    <Label>Category Name</Label>
                    <Input
                      value={skillCategory.category}
                      onChange={(e) => updateSkillCategory(skillCategory.id, 'category', e.target.value)}
                      placeholder="e.g., Technical Skills, Languages"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skillCategory.items.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{skill}</span>
                          <button
                            onClick={() => removeSkillItem(skillCategory.id, index)}
                            className="ml-1 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a skill and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkillItem(skillCategory.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Projects (Optional)</h3>
                <Button onClick={() => {
                  const newProject = {
                    id: Date.now().toString(),
                    name: '',
                    description: '',
                    technologies: '',
                    url: ''
                  };
                  updateResumeData('projects', [...resumeData.projects, newProject]);
                }} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </div>
              
              {resumeData.projects.map((project, index) => (
                <Card key={project.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Project #{index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateResumeData('projects', resumeData.projects.filter(p => p.id !== project.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input
                        value={project.name}
                        onChange={(e) => {
                          const updated = resumeData.projects.map(p =>
                            p.id === project.id ? { ...p, name: e.target.value } : p
                          );
                          updateResumeData('projects', updated);
                        }}
                        placeholder="Project Name"
                      />
                    </div>
                    <div>
                      <Label>Project URL (Optional)</Label>
                      <Input
                        value={project.url}
                        onChange={(e) => {
                          const updated = resumeData.projects.map(p =>
                            p.id === project.id ? { ...p, url: e.target.value } : p
                          );
                          updateResumeData('projects', updated);
                        }}
                        placeholder="https://github.com/user/project"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label>Technologies Used</Label>
                    <Input
                      value={project.technologies}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(p =>
                          p.id === project.id ? { ...p, technologies: e.target.value } : p
                        );
                        updateResumeData('projects', updated);
                      }}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(p =>
                          p.id === project.id ? { ...p, description: e.target.value } : p
                        );
                        updateResumeData('projects', updated);
                      }}
                      placeholder="Describe what the project does and your role..."
                      rows={3}
                    />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="references" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">References</h3>
                <Button onClick={addReference} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reference
                </Button>
              </div>
              
              {resumeData.references.map((ref, index) => (
                <Card key={ref.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Reference #{index + 1}</h4>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeReference(ref.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                        placeholder="Reference Name"
                      />
                    </div>
                    <div>
                      <Label>Position</Label>
                      <Input
                        value={ref.position}
                        onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                    <div>
                      <Label>Company</Label>
                      <Input
                        value={ref.company}
                        onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={ref.email}
                        onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                        placeholder="reference@company.com"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={ref.phone}
                        onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <Button 
              onClick={onNext} 
              disabled={!isFormValid()}
              size="lg"
              className="px-8"
            >
              Continue to Templates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
