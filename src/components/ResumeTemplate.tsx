
import { ResumeData } from '@/pages/Index';

interface ResumeTemplateProps {
  resumeData: ResumeData;
  templateId: string;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ResumeTemplate = ({ resumeData, templateId }: ResumeTemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, references } = resumeData;

  // Professional Classic Template
  if (templateId === 'professional-classic') {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 font-sans text-sm">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          {(personalInfo.linkedin || personalInfo.website) && (
            <div className="flex flex-wrap justify-center gap-4 text-gray-600 mt-2">
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">PROFESSIONAL EXPERIENCE</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-gray-600">
                    <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-2">
                    {exp.description.split('\n').map((line, index) => (
                      <p key={index} className="mb-1">• {line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">EDUCATION</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
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

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">SKILLS</h2>
            {skills.map((skillCategory) => (
              <div key={skillCategory.id} className="mb-2">
                <span className="font-semibold text-gray-900">{skillCategory.category}: </span>
                <span className="text-gray-700">{skillCategory.items.join(', ')}</span>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">PROJECTS</h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                {project.technologies && (
                  <p className="text-gray-600 text-xs mb-1">Technologies: {project.technologies}</p>
                )}
                <p className="text-gray-700">{project.description}</p>
                {project.url && (
                  <p className="text-blue-600 text-xs">{project.url}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">CERTIFICATIONS</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">{cert.name}</span>
                  <span className="text-gray-600">{formatDate(cert.date)}</span>
                </div>
                <p className="text-gray-700">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">REFERENCES</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {references.map((ref) => (
                <div key={ref.id} className="mb-3">
                  <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                  <p className="text-gray-700">{ref.position}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-gray-600 text-xs">{ref.email}</p>
                  <p className="text-gray-600 text-xs">{ref.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Executive Template
  if (templateId === 'professional-executive') {
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

        {/* Education & Other Sections */}
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
  }

  // Modern Creative Template
  if (templateId === 'modern-creative') {
    return (
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 p-8 font-sans text-sm">
        {/* Creative Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg mb-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-purple-100 text-lg mb-4">{resumeData.profession.replace('-', ' ').toUpperCase()}</p>
          <div className="flex flex-wrap gap-4">
            {personalInfo.email && <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">{personalInfo.location}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            {personalInfo.summary && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-4 h-4 bg-purple-600 rounded-full mr-3"></div>
                  ABOUT ME
                </h2>
                <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                  <div className="w-4 h-4 bg-purple-600 rounded-full mr-3"></div>
                  EXPERIENCE
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="mb-6 last:mb-0">
                    <div className="flex items-start mb-2">
                      <div className="w-3 h-3 bg-pink-400 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 font-medium">{exp.company}</p>
                        <p className="text-gray-500 text-sm">{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      </div>
                    </div>
                    {exp.description && (
                      <div className="ml-7 text-gray-700">
                        {exp.description.split('\n').map((line, index) => (
                          <p key={index} className="mb-1">• {line}</p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills */}
            {skills.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-purple-600 mb-4">SKILLS</h2>
                {skills.map((skillCategory) => (
                  <div key={skillCategory.id} className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{skillCategory.category}</h3>
                    <div className="flex flex-wrap gap-1">
                      {skillCategory.items.map((skill, index) => (
                        <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-purple-600 mb-4">EDUCATION</h2>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{formatDate(edu.endDate)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold text-purple-600 mb-4">PROJECTS</h2>
                {projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-gray-700 text-sm">{project.description}</p>
                    {project.technologies && (
                      <p className="text-purple-600 text-xs mt-1">{project.technologies}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default to Professional Classic if template not found
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-center">
      <p className="text-gray-500">Template not found. Using default layout.</p>
    </div>
  );
};
