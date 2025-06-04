
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Edit } from 'lucide-react';
import { ResumeData } from '@/pages/Index';
import { ResumeTemplate } from '@/components/ResumeTemplate';
import { ATSAnalyzer } from '@/components/ATSAnalyzer';

interface ResumePreviewProps {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ResumePreview = ({ resumeData, updateResumeData, onNext, onPrev }: ResumePreviewProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resume Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Eye className="w-6 h-6 text-blue-600" />
                <span>Resume Preview</span>
              </h2>
              <div className="flex space-x-2">
                <Badge variant="secondary">ATS-Friendly</Badge>
                <Badge variant="outline">{resumeData.selectedTemplate}</Badge>
              </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <ResumeTemplate 
                resumeData={resumeData} 
                templateId={resumeData.selectedTemplate}
              />
            </div>
          </div>
        </div>

        {/* ATS Analysis Sidebar */}
        <div className="space-y-6">
          <ATSAnalyzer resumeData={resumeData} />
          
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={onPrev}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Content
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => updateResumeData('selectedTemplate', 'professional-classic')}
              >
                Change Template
              </Button>
              <Button 
                className="w-full justify-start"
                onClick={onNext}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Resume
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">✓ Resume Quality Check</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Contact Information</span>
                <span className="text-green-600 font-medium">Complete</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Professional Summary</span>
                <span className="text-green-600 font-medium">
                  {resumeData.personalInfo.summary ? 'Complete' : 'Missing'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Work Experience</span>
                <span className="text-green-600 font-medium">
                  {resumeData.experience.length} entries
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Skills Section</span>
                <span className="text-green-600 font-medium">
                  {resumeData.skills.length} categories
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev} size="lg">
          Back to Templates
        </Button>
        <Button onClick={onNext} size="lg" className="px-8">
          Export Resume
        </Button>
      </div>
    </div>
  );
};
