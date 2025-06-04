
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { ResumeData } from '@/pages/Index';

interface ATSAnalyzerProps {
  resumeData: ResumeData;
}

const professionKeywords = {
  'software-engineer': [
    'JavaScript', 'Python', 'React', 'Node.js', 'Git', 'API', 'Database', 'Agile', 'Testing', 'Cloud',
    'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Microservices', 'SQL', 'NoSQL', 'REST', 'GraphQL'
  ],
  'data-scientist': [
    'Python', 'R', 'Machine Learning', 'SQL', 'Statistics', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow',
    'Deep Learning', 'Data Visualization', 'Tableau', 'Power BI', 'Big Data', 'Hadoop', 'Spark'
  ],
  'product-manager': [
    'Product Strategy', 'Roadmap', 'Agile', 'Scrum', 'Analytics', 'A/B Testing', 'User Research',
    'Stakeholder Management', 'KPIs', 'Feature Prioritization', 'Market Research', 'Go-to-Market'
  ],
  'marketing-manager': [
    'Digital Marketing', 'SEO', 'SEM', 'Content Marketing', 'Social Media', 'Analytics', 'Campaign Management',
    'Brand Management', 'Lead Generation', 'Marketing Automation', 'CRM', 'ROI', 'Conversion Optimization'
  ],
  'sales-manager': [
    'Sales Strategy', 'Lead Generation', 'CRM', 'Pipeline Management', 'Forecasting', 'Account Management',
    'Relationship Building', 'Negotiation', 'Revenue Growth', 'Team Leadership', 'KPIs', 'Salesforce'
  ],
  'financial-analyst': [
    'Financial Modeling', 'Excel', 'Financial Reporting', 'Budgeting', 'Forecasting', 'Variance Analysis',
    'Investment Analysis', 'Risk Assessment', 'SQL', 'Tableau', 'Bloomberg', 'Financial Planning'
  ],
  'graphic-designer': [
    'Adobe Creative Suite', 'Photoshop', 'Illustrator', 'InDesign', 'Typography', 'Brand Identity',
    'Layout Design', 'Color Theory', 'UI/UX', 'Print Design', 'Digital Design', 'Creative Direction'
  ],
  'project-manager': [
    'Project Management', 'PMP', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Management',
    'Budget Management', 'Timeline Management', 'Process Improvement', 'Team Leadership', 'JIRA', 'MS Project'
  ],
  'hr-manager': [
    'Talent Acquisition', 'Employee Relations', 'Performance Management', 'Compensation', 'Benefits',
    'Training Development', 'HR Analytics', 'Compliance', 'HRIS', 'Organizational Development', 'Change Management'
  ],
  'business-analyst': [
    'Business Analysis', 'Requirements Gathering', 'Process Mapping', 'Data Analysis', 'SQL', 'Stakeholder Management',
    'Documentation', 'Systems Analysis', 'Project Management', 'Process Improvement', 'Visio', 'JIRA'
  ]
};

export const ATSAnalyzer = ({ resumeData }: ATSAnalyzerProps) => {
  const relevantKeywords = professionKeywords[resumeData.profession as keyof typeof professionKeywords] || [];
  
  // Extract all text from resume
  const resumeText = [
    resumeData.personalInfo.summary,
    ...resumeData.experience.map(exp => `${exp.position} ${exp.company} ${exp.description}`),
    ...resumeData.education.map(edu => `${edu.degree} ${edu.field} ${edu.institution}`),
    ...resumeData.skills.flatMap(skill => skill.items),
    ...resumeData.projects.map(project => `${project.name} ${project.description} ${project.technologies}`),
    ...resumeData.certifications.map(cert => `${cert.name} ${cert.issuer}`)
  ].join(' ').toLowerCase();

  // Check which keywords are present
  const foundKeywords = relevantKeywords.filter(keyword => 
    resumeText.includes(keyword.toLowerCase())
  );

  const keywordScore = relevantKeywords.length > 0 ? (foundKeywords.length / relevantKeywords.length) * 100 : 0;

  // ATS Compatibility Checks
  const atsChecks = [
    {
      label: 'Contact Information',
      passed: resumeData.personalInfo.fullName && resumeData.personalInfo.email,
      description: 'Name and email are required'
    },
    {
      label: 'Professional Summary',
      passed: resumeData.personalInfo.summary && resumeData.personalInfo.summary.length > 50,
      description: 'Summary should be 50+ characters'
    },
    {
      label: 'Work Experience',
      passed: resumeData.experience.length > 0,
      description: 'At least one work experience entry'
    },
    {
      label: 'Skills Section',
      passed: resumeData.skills.length > 0 && resumeData.skills.some(s => s.items.length > 0),
      description: 'Skills section with relevant keywords'
    },
    {
      label: 'Education',
      passed: resumeData.education.length > 0,
      description: 'Education information included'
    },
    {
      label: 'Standard Format',
      passed: true, // Our templates are ATS-friendly
      description: 'Uses ATS-compatible formatting'
    }
  ];

  const passedChecks = atsChecks.filter(check => check.passed).length;
  const atsScore = (passedChecks / atsChecks.length) * 100;

  const overallScore = (atsScore + keywordScore) / 2;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-lg">ATS Analysis</h3>
      </div>

      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall ATS Score</span>
          <Badge variant={overallScore >= 80 ? 'default' : overallScore >= 60 ? 'secondary' : 'destructive'}>
            {getScoreBadge(overallScore)}
          </Badge>
        </div>
        <Progress value={overallScore} className="mb-2" />
        <p className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
          {Math.round(overallScore)}%
        </p>
      </div>

      {/* Keyword Matching */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Keyword Analysis</h4>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">Industry Keywords Found</span>
          <span className="text-sm font-medium">{foundKeywords.length}/{relevantKeywords.length}</span>
        </div>
        <Progress value={keywordScore} className="mb-3" />
        
        {foundKeywords.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-600 mb-2">Found Keywords:</p>
            <div className="flex flex-wrap gap-1">
              {foundKeywords.slice(0, 6).map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
              {foundKeywords.length > 6 && (
                <Badge variant="secondary" className="text-xs">
                  +{foundKeywords.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {relevantKeywords.length > foundKeywords.length && (
          <div>
            <p className="text-xs text-gray-600 mb-2">Suggested Keywords:</p>
            <div className="flex flex-wrap gap-1">
              {relevantKeywords
                .filter(keyword => !foundKeywords.includes(keyword))
                .slice(0, 4)
                .map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* ATS Compatibility Checks */}
      <div>
        <h4 className="font-medium mb-3">ATS Compatibility</h4>
        <div className="space-y-2">
          {atsChecks.map((check, index) => (
            <div key={index} className="flex items-start space-x-2">
              {check.passed ? (
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium">{check.label}</p>
                <p className="text-xs text-gray-600">{check.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
