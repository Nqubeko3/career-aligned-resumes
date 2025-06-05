
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ModernDesignerTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, projects, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-red-50 p-8 font-sans text-sm">
      {/* Designer Header */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-2xl mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 bg-opacity-20 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
          <p className="text-orange-100 text-xl mb-4">{resumeData.profession.replace('-', ' ').toUpperCase()}</p>
          <div className="flex flex-wrap gap-6">
            {personalInfo.email && (
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {personalInfo.email}
              </div>
            )}
            {personalInfo.phone && (
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {personalInfo.phone}
              </div>
            )}
            {personalInfo.location && (
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                {personalInfo.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Creative Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          {personalInfo.summary && (
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3"></div>
                CREATIVE VISION
              </h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3"></div>
                EXPERIENCE
              </h2>
              {experience.map((exp, index) => (
                <div key={exp.id} className="mb-6 relative">
                  <div className="absolute left-0 top-3 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                  <div className="ml-8">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-orange-600 font-semibold">{exp.company}</p>
                      </div>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700">
                        {exp.description.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="mb-2 flex items-start">
                            <span className="text-orange-500 mr-2">◆</span>
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  {index < experience.length - 1 && (
                    <div className="absolute left-2 top-8 w-0.5 h-16 bg-gradient-to-b from-orange-400 to-red-400"></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3"></div>
                PORTFOLIO
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gradient-to-br from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-bold text-gray-900 mb-2">{project.name}</h3>
                    <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech, index) => (
                          <span key={index} className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">SKILLS</h2>
              {skills.map((skillCategory) => (
                <div key={skillCategory.id} className="mb-4">
                  <h3 className="font-semibold text-orange-600 mb-2">{skillCategory.category}</h3>
                  <div className="space-y-2">
                    {skillCategory.items.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3"></div>
                        <span className="text-gray-700 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">EDUCATION</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-orange-600 text-sm">{edu.institution}</p>
                  <p className="text-gray-500 text-xs">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">REFERENCES</h2>
              {references.slice(0, 2).map((ref) => (
                <div key={ref.id} className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 text-sm">{ref.name}</h3>
                  <p className="text-orange-600 text-xs">{ref.position}</p>
                  <p className="text-gray-600 text-xs">{ref.company}</p>
                  <p className="text-gray-500 text-xs">{ref.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
