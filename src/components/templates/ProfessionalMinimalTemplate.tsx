
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalMinimalTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-sans text-sm">
      {/* Minimal Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light text-gray-900 mb-2">{personalInfo.fullName}</h1>
        <div className="text-gray-600 text-sm space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">Summary</h2>
          <p className="text-gray-800 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-4">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-500">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
              {exp.description && (
                <div className="text-gray-700 text-sm space-y-1">
                  {exp.description.split('\n').map((line, index) => (
                    <p key={index}>• {line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills and Education Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">Skills</h2>
            {skills.map((skillCategory) => (
              <div key={skillCategory.id} className="mb-3">
                <h3 className="font-medium text-gray-800 text-sm mb-1">{skillCategory.category}</h3>
                <p className="text-gray-600 text-sm">{skillCategory.items.join(', ')}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <h3 className="font-medium text-gray-900 text-sm">{edu.degree}</h3>
                <p className="text-gray-600 text-sm">{edu.institution}</p>
                <p className="text-gray-500 text-xs">{formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* References */}
      {references.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <h3 className="font-medium text-gray-900">{ref.name}</h3>
                <p className="text-gray-600">{ref.position}</p>
                <p className="text-gray-600">{ref.company}</p>
                <p className="text-gray-500 text-xs">{ref.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
