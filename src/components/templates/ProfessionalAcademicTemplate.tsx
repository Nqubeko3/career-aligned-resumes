
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalAcademicTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-serif text-sm">
      {/* Academic Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <div className="w-32 h-0.5 bg-gray-400 mx-auto mb-4"></div>
        <div className="text-gray-600 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
        </div>
      </div>

      {/* Research Interests / Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3">RESEARCH INTERESTS</h2>
          <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education - Priority in Academic CV */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700 italic">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-gray-600">
                  <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700 italic">{exp.company}</p>
                </div>
                <div className="text-right text-gray-600">
                  <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
              </div>
              {exp.description && (
                <div className="text-gray-700 mt-2 text-justify">
                  {exp.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-1">• {line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Research Skills & Technical Competencies */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">TECHNICAL COMPETENCIES</h2>
          {skills.map((skillCategory) => (
            <div key={skillCategory.id} className="mb-3">
              <h3 className="font-medium text-gray-800 mb-1">{skillCategory.category}:</h3>
              <p className="text-gray-700 ml-4">{skillCategory.items.join(', ')}</p>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">CERTIFICATIONS & LICENSES</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2 flex justify-between">
              <div>
                <span className="font-medium text-gray-900">{cert.name}</span>
                <span className="text-gray-700 ml-2">({cert.issuer})</span>
              </div>
              <span className="text-gray-600">{formatDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Professional References */}
      {references.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-4">PROFESSIONAL REFERENCES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {references.map((ref) => (
              <div key={ref.id} className="border-l-2 border-gray-300 pl-4">
                <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                <p className="text-gray-700">{ref.position}</p>
                <p className="text-gray-700 italic">{ref.company}</p>
                <p className="text-gray-600 text-xs mt-1">{ref.email}</p>
                <p className="text-gray-600 text-xs">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
