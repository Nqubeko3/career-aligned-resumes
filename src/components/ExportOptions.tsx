import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Globe, File, CheckCircle } from 'lucide-react';
import { ResumeData } from '@/pages/Index';
import { ResumeTemplate } from '@/components/ResumeTemplate';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportOptionsProps {
  resumeData: ResumeData;
  onPrev: () => void;
}

export const ExportOptions = ({ resumeData, onPrev }: ExportOptionsProps) => {
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const exportToPDF = async () => {
    setExportStatus('pdf');
    try {
      const resumeElement = document.getElementById('resume-for-export');
      if (resumeElement) {
        // Create canvas from HTML element
        const canvas = await html2canvas(resumeElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        let position = 0;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add additional pages if needed
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        
        pdf.save(`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setExportStatus(null);
    }
  };

  const exportToHTML = () => {
    setExportStatus('html');
    setTimeout(() => {
      const resumeElement = document.getElementById('resume-for-export');
      if (resumeElement) {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .resume { max-width: 800px; margin: 0 auto; }
        @media print {
          body { margin: 0; padding: 0; }
          .resume { max-width: none; }
        }
    </style>
</head>
<body>
    <div class="resume">
        ${resumeElement.innerHTML}
    </div>
</body>
</html>`;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      setExportStatus(null);
    }, 1500);
  };

  const exportToDOCX = () => {
    setExportStatus('docx');
    setTimeout(() => {
      const resumeElement = document.getElementById('resume-for-export');
      if (resumeElement) {
        // Create a basic Word-compatible HTML structure
        const docxContent = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
  <meta charset="utf-8">
  <title>${resumeData.personalInfo.fullName} Resume</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; }
    h1, h2, h3 { color: #333; }
    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
  </style>
</head>
<body>
  ${resumeElement.innerHTML}
</body>
</html>`;
        
        const blob = new Blob([docxContent], { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      setExportStatus(null);
    }, 2000);
  };

  const exportOptions = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Perfect for online applications and ATS systems',
      icon: FileText,
      popular: true,
      action: exportToPDF
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'Interactive web version for online portfolios',
      icon: Globe,
      popular: false,
      action: exportToHTML
    },
    {
      id: 'docx',
      name: 'DOCX',
      description: 'Microsoft Word format for easy editing',
      icon: File,
      popular: true,
      action: exportToDOCX
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Export Your Resume</h2>
        <p className="text-lg text-gray-600">Choose your preferred format and download your professional resume</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="w-6 h-6 text-blue-600" />
                <span>Export Formats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exportOptions.map((option) => {
                const Icon = option.icon;
                const isExporting = exportStatus === option.id;
                
                return (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{option.name}</h3>
                          {option.popular && <Badge variant="secondary">Popular</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <Button
                      onClick={option.action}
                      disabled={isExporting}
                      className="min-w-[100px]"
                    >
                      {isExporting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Exporting...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </>
                      )}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Resume Tips for Success</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Tailor your resume for each job application</li>
                    <li>• Use keywords from the job description</li>
                    <li>• Keep your resume to 1-2 pages maximum</li>
                    <li>• Proofread carefully for spelling and grammar</li>
                    <li>• Save as PDF to preserve formatting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-center">Final Preview</h3>
          <div className="border rounded-lg overflow-hidden" style={{ transform: 'scale(0.6)', transformOrigin: 'top center' }}>
            <div id="resume-for-export">
              <ResumeTemplate 
                resumeData={resumeData} 
                templateId={resumeData.selectedTemplate}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev} size="lg">
          Back to Preview
        </Button>
        <div className="flex space-x-4">
          <Button variant="outline" size="lg">
            Save & Continue Later
          </Button>
          <Button onClick={() => window.location.reload()} size="lg">
            Create New Resume
          </Button>
        </div>
      </div>
    </div>
  );
};
