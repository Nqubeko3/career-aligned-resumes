
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ModernTechTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, projects, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 font-mono text-sm">
      {/* Tech Header */}
      <div className="border-2 border-cyan-400 p-6 mb-8 bg-black bg-opacity-30">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
          <div className="w-3 h-3 bg-red-400 rounded-full mr-4"></div>
          <span className="text-cyan-400 text-xs">~/resume/</span>
        </div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">{personalInfo.fullName}</h1>
        <p className="text-blue-300 text-lg mb-4">$ {resumeData.profession.replace('-', '_').toLowerCase()}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <span className="text-green-400 mr-2">></span>
              <span className="text-gray-300">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <span className="text-green-400 mr-2">></span>
              <span className="text-gray-300">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <span className="text-green-400 mr-2">></span>
              <span className="text-gray-300">{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-8 bg-gray-800 bg-opacity-50 p-6 rounded border-l-4 border-cyan-400">
          <h2 className="text-lg font-bold text-cyan-400 mb-3">// ABOUT</h2>
          <p className="text-gray-300 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded">
              <h2 className="text-lg font-bold text-cyan-400 mb-4">// EXPERIENCE</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-6 border-l-2 border-blue-400 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-white">{exp.position}</h3>
                      <p className="text-blue-300">{exp.company}</p>
                    </div>
                    <span className="text-gray-400 text-xs bg-gray-700 px-2 py-1 rounded">
                      {formatDate(exp.startDate)} - {exp.current ? 'current' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-gray-300 text-sm">
                      {exp.description.split('\n').map((line, index) => (
                        <p key={index} className="mb-1">
                          <span className="text-green-400">&gt;</span> {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded">
              <h2 className="text-lg font-bold text-cyan-400 mb-4">// PROJECTS</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4 border border-gray-600 p-4 rounded">
                  <h3 className="font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech, index) => (
                        <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded">
              <h2 className="text-lg font-bold text-cyan-400 mb-4">// STACK</h2>
              {skills.map((skillCategory) => (
                <div key={skillCategory.id} className="mb-4">
                  <h3 className="font-semibold text-blue-300 mb-2">{skillCategory.category}</h3>
                  <div className="space-y-1">
                    {skillCategory.items.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-green-400 mr-2">●</span>
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
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded">
              <h2 className="text-lg font-bold text-cyan-400 mb-4">// EDUCATION</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-semibold text-white text-sm">{edu.degree}</h3>
                  <p className="text-blue-300 text-sm">{edu.institution}</p>
                  <p className="text-gray-400 text-xs">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="bg-gray-800 bg-opacity-50 p-6 rounded">
              <h2 className="text-lg font-bold text-cyan-400 mb-4">// REFS</h2>
              {references.slice(0, 2).map((ref) => (
                <div key={ref.id} className="mb-4 text-sm">
                  <h3 className="font-semibold text-white">{ref.name}</h3>
                  <p className="text-blue-300">{ref.position}</p>
                  <p className="text-gray-400 text-xs">{ref.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
