
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalExecutiveTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 p-8 font-serif text-sm">
      {/* Header with sophisticated styling */}
      <div className="text-center bg-white p-6 shadow-sm mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">{personalInfo.fullName}</h1>
        <div className="w-20 h-1 bg-gray-800 mx-auto mb-4"></div>
        <div className="flex flex-wrap justify-center gap-6 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="mb-6 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">EXECUTIVE SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-center italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Core Competencies */}
      {skills.length > 0 && (
        <div className="mb-6 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">CORE COMPETENCIES</h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skillCategory) => (
              <div key={skillCategory.id}>
                <h3 className="font-semibold text-gray-800 mb-2">{skillCategory.category}</h3>
                <ul className="text-gray-700 space-y-1">
                  {skillCategory.items.map((skill, index) => (
                    <li key={index}>• {skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-6 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6 border-l-4 border-gray-300 pl-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 font-semibold">{exp.company}</p>
                </div>
                <div className="text-right text-gray-600 font-medium">
                  <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
              </div>
              {exp.description && (
                <div className="text-gray-700 mt-3">
                  {exp.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">• {line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education & References */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        {education.length > 0 && (
          <div className="bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-gray-700">{edu.field}</p>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-600 text-xs">{formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div className="bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">REFERENCES</h2>
            {references.slice(0, 2).map((ref) => (
              <div key={ref.id} className="mb-4">
                <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                <p className="text-gray-700 text-sm">{ref.position}</p>
                <p className="text-gray-700 text-sm">{ref.company}</p>
                <p className="text-gray-600 text-xs">{ref.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
