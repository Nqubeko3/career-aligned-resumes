
import { ResumeData } from '@/pages/Index';
import { lazy, Suspense } from 'react';

interface ResumeTemplateProps {
  resumeData: ResumeData;
  templateId: string;
}

// Lazy load template components - Professional Templates
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

const ProfessionalMinimalTemplate = lazy(() => 
  import('./templates/ProfessionalMinimalTemplate').then(module => ({ 
    default: module.ProfessionalMinimalTemplate 
  }))
);

const ProfessionalCorporateTemplate = lazy(() => 
  import('./templates/ProfessionalCorporateTemplate').then(module => ({ 
    default: module.ProfessionalCorporateTemplate 
  }))
);

const ProfessionalTraditionalTemplate = lazy(() => 
  import('./templates/ProfessionalTraditionalTemplate').then(module => ({ 
    default: module.ProfessionalTraditionalTemplate 
  }))
);

const ProfessionalAcademicTemplate = lazy(() => 
  import('./templates/ProfessionalAcademicTemplate').then(module => ({ 
    default: module.ProfessionalAcademicTemplate 
  }))
);

const ProfessionalModernTemplate = lazy(() => 
  import('./templates/ProfessionalModernTemplate').then(module => ({ 
    default: module.ProfessionalModernTemplate 
  }))
);

// Modern Templates
const ModernCreativeTemplate = lazy(() => 
  import('./templates/ModernCreativeTemplate').then(module => ({ 
    default: module.ModernCreativeTemplate 
  }))
);

const ModernTechTemplate = lazy(() => 
  import('./templates/ModernTechTemplate').then(module => ({ 
    default: module.ModernTechTemplate 
  }))
);

const ModernDesignerTemplate = lazy(() => 
  import('./templates/ModernDesignerTemplate').then(module => ({ 
    default: module.ModernDesignerTemplate 
  }))
);

const ModernMinimalistTemplate = lazy(() => 
  import('./templates/ModernMinimalistTemplate').then(module => ({ 
    default: module.ModernMinimalistTemplate 
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
      case 'professional-minimal':
        return <ProfessionalMinimalTemplate resumeData={resumeData} />;
      case 'professional-corporate':
        return <ProfessionalCorporateTemplate resumeData={resumeData} />;
      case 'professional-traditional':
        return <ProfessionalTraditionalTemplate resumeData={resumeData} />;
      case 'professional-academic':
        return <ProfessionalAcademicTemplate resumeData={resumeData} />;
      case 'professional-modern':
        return <ProfessionalModernTemplate resumeData={resumeData} />;
      case 'modern-creative':
        return <ModernCreativeTemplate resumeData={resumeData} />;
      case 'modern-tech':
        return <ModernTechTemplate resumeData={resumeData} />;
      case 'modern-designer':
        return <ModernDesignerTemplate resumeData={resumeData} />;
      case 'modern-minimalist':
        return <ModernMinimalistTemplate resumeData={resumeData} />;
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
