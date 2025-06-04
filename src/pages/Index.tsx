
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ResumeForm } from '@/components/ResumeForm';
import { TemplateSelector } from '@/components/TemplateSelector';
import { ResumePreview } from '@/components/ResumePreview';
import { ExportOptions } from '@/components/ExportOptions';
import { FileText, Download, Eye, Settings } from 'lucide-react';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    url?: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  references: Array<{
    id: string;
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
  }>;
  profession: string;
  selectedTemplate: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    references: [],
    profession: '',
    selectedTemplate: 'professional-classic'
  });

  const steps = [
    { title: 'Personal Info', icon: FileText },
    { title: 'Choose Template', icon: Settings },
    { title: 'Preview & Edit', icon: Eye },
    { title: 'Export Resume', icon: Download }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('funda-resume-data');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.log('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('funda-resume-data', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Funda Resume Maker</h1>
              <p className="text-gray-600 mt-1">Create ATS-friendly resumes that get you hired</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">Progress</div>
              <Progress value={progress} className="w-48" />
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 py-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    index === currentStep
                      ? 'bg-blue-600 text-white'
                      : index < currentStep
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 0 && (
          <ResumeForm 
            resumeData={resumeData} 
            updateResumeData={updateResumeData}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 1 && (
          <TemplateSelector
            selectedTemplate={resumeData.selectedTemplate}
            onSelectTemplate={(template) => updateResumeData('selectedTemplate', template)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 2 && (
          <ResumePreview
            resumeData={resumeData}
            updateResumeData={updateResumeData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <ExportOptions
            resumeData={resumeData}
            onPrev={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
