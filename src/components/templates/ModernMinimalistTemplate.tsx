
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ModernMinimalistTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, projects, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-light text-sm">
      {/* Ultra Minimal Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-thin text-gray-900 mb-3 tracking-wide">{personalInfo.fullName}</h1>
        <div className="w-24 h-px bg-gray-300 mx-auto mb-4"></div>
        <div className="text-gray-600 space-x-6 text-sm">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-12 text-center">
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto italic">
            "{personalInfo.summary}"
          </p>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-medium">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-8">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-normal text-gray-900">{exp.position}</h3>
                    <span className="text-xs text-gray-500 font-light">
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 font-light">{exp.company}</p>
                  {exp.description && (
                    <div className="text-gray-700 space-y-2 font-light">
                      {exp.description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-medium">Selected Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-6">
                  <h3 className="font-normal text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-gray-700 mb-2 font-light">{project.description}</p>
                  {project.technologies && (
                    <p className="text-gray-500 text-xs font-light">
                      Technologies: {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">Skills</h2>
              {skills.map((skillCategory) => (
                <div key={skillCategory.id} className="mb-4">
                  <h3 className="font-normal text-gray-800 mb-2 text-sm">{skillCategory.category}</h3>
                  <div className="text-gray-600 text-sm font-light">
                    {skillCategory.items.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-4">
                  <h3 className="font-normal text-gray-900 text-sm">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm font-light">{edu.institution}</p>
                  <p className="text-gray-500 text-xs font-light">{formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          {/* References */}
          {references.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-medium">References</h2>
              {references.slice(0, 2).map((ref) => (
                <div key={ref.id} className="mb-4">
                  <h3 className="font-normal text-gray-900 text-sm">{ref.name}</h3>
                  <p className="text-gray-600 text-xs font-light">{ref.position}</p>
                  <p className="text-gray-600 text-xs font-light">{ref.company}</p>
                  <p className="text-gray-500 text-xs font-light">{ref.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
