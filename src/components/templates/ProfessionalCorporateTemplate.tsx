
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalCorporateTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-sans text-sm">
      {/* Corporate Header */}
      <div className="bg-blue-900 text-white p-6 -mx-8 -mt-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
        <p className="text-blue-200 text-lg mb-3">{resumeData.profession.replace('-', ' ').toUpperCase()}</p>
        <div className="flex flex-wrap gap-6 text-blue-100">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-200">EXECUTIVE SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-200">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillCategory) => (
              <div key={skillCategory.id}>
                <h3 className="font-semibold text-gray-800 mb-2 text-blue-800">{skillCategory.category}</h3>
                <ul className="text-gray-700 space-y-1">
                  {skillCategory.items.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-blue-200">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6 bg-gray-50 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-blue-700 font-semibold">{exp.company}</p>
                </div>
                <div className="text-right bg-blue-100 px-3 py-1 rounded">
                  <p className="text-blue-800 font-medium text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
              {exp.description && (
                <div className="text-gray-700 mt-3">
                  {exp.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 flex items-start">
                      <span className="text-blue-600 mr-2">▶</span>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education and References */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-4 pb-2 border-b border-blue-200">EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4 bg-blue-50 p-3 rounded">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-blue-700">{edu.institution}</p>
                <p className="text-gray-600 text-sm">{formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-4 pb-2 border-b border-blue-200">REFERENCES</h2>
            {references.slice(0, 2).map((ref) => (
              <div key={ref.id} className="mb-4 bg-blue-50 p-3 rounded">
                <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                <p className="text-blue-700 text-sm">{ref.position}</p>
                <p className="text-gray-600 text-sm">{ref.company}</p>
                <p className="text-gray-500 text-xs">{ref.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
