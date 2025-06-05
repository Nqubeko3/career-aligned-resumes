
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalClassicTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, projects, certifications, references } = resumeData;

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
};
