
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ModernCreativeTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

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
};
