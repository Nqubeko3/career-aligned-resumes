
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalModernTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-gray-50 font-sans text-sm">
      {/* Modern Header with Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
        {/* Left Sidebar */}
        <div className="bg-gray-800 text-white p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">{personalInfo.fullName}</h1>
            <p className="text-gray-300">{resumeData.profession.replace('-', ' ').toUpperCase()}</p>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">CONTACT</h2>
            <div className="space-y-2 text-gray-300 text-sm">
              {personalInfo.email && <div>{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">SKILLS</h2>
              {skills.map((skillCategory) => (
                <div key={skillCategory.id} className="mb-4">
                  <h3 className="font-medium text-white mb-2">{skillCategory.category}</h3>
                  <div className="space-y-1">
                    {skillCategory.items.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">EDUCATION</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-medium text-white text-sm">{edu.degree}</h3>
                  <p className="text-gray-300 text-sm">{edu.institution}</p>
                  <p className="text-gray-400 text-xs">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-200">REFERENCES</h2>
              {references.slice(0, 2).map((ref) => (
                <div key={ref.id} className="mb-4">
                  <h3 className="font-medium text-white text-sm">{ref.name}</h3>
                  <p className="text-gray-300 text-xs">{ref.position}</p>
                  <p className="text-gray-300 text-xs">{ref.company}</p>
                  <p className="text-gray-400 text-xs">{ref.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 p-8 bg-white">
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">PROFESSIONAL SUMMARY</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">EXPERIENCE</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 relative">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div className="ml-8">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700">
                        {exp.description.split('\n').map((line, index) => (
                          <p key={index} className="mb-1">• {line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">CERTIFICATIONS</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3 flex justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{cert.name}</span>
                    <span className="text-gray-600 ml-2">- {cert.issuer}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
