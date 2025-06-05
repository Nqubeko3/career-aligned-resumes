
import { ResumeData } from '@/pages/Index';
import { lazy, Suspense } from 'react';

interface ResumeTemplateProps {
  resumeData: ResumeData;
  templateId: string;
}

// Lazy load template components
const ProfessionalClassicTemplate = lazy(() => 
  import('./templates/ProfessionalClassicTemplate').then(module => ({ 
    default: module.ProfessionalClassicTemplate 
  }))
);

const ProfessionalExecutiveTemplate = lazy(() => 
  import('./templates/ProfessionalExecutiveTemplate').then(module => ({ 
    default: module.ProfessionalExecutiveTemplate 
  }))
);

const ModernCreativeTemplate = lazy(() => 
  import('./templates/ModernCreativeTemplate').then(module => ({ 
    default: module.ModernCreativeTemplate 
  }))
);

const TemplateLoader = () => (
  <div className="max-w-4xl mx-auto bg-white p-8 text-center">
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
);

export const ResumeTemplate = ({ resumeData, templateId }: ResumeTemplateProps) => {
  const renderTemplate = () => {
    switch (templateId) {
      case 'professional-classic':
        return <ProfessionalClassicTemplate resumeData={resumeData} />;
      case 'professional-executive':
        return <ProfessionalExecutiveTemplate resumeData={resumeData} />;
      case 'modern-creative':
        return <ModernCreativeTemplate resumeData={resumeData} />;
      default:
        return <ProfessionalClassicTemplate resumeData={resumeData} />;
    }
  };

  return (
    <Suspense fallback={<TemplateLoader />}>
      {renderTemplate()}
    </Suspense>
  );
};
