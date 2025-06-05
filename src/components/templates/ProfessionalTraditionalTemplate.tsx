
import { ResumeData } from '@/pages/Index';

interface TemplateProps {
  resumeData: ResumeData;
}

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

export const ProfessionalTraditionalTemplate = ({ resumeData }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = resumeData;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-serif text-sm">
      {/* Traditional Header */}
      <div className="text-center border-4 border-black p-6 mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">{personalInfo.fullName}</h1>
        <div className="border-t-2 border-black pt-3 mt-3">
          <div className="flex flex-wrap justify-center gap-4 text-black">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>•</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {/* Objective */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-3 text-center border-b-2 border-black pb-2">OBJECTIVE</h2>
          <p className="text-black leading-relaxed text-center italic">{personalInfo.summary}</p>
        </div>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 text-center border-b-2 border-black pb-2">PROFESSIONAL EXPERIENCE</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="text-center mb-2">
                <h3 className="font-bold text-black">{exp.position}</h3>
                <p className="font-semibold text-black">{exp.company}</p>
                <p className="text-black italic">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
              {exp.description && (
                <div className="text-black text-center">
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
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 text-center border-b-2 border-black pb-2">EDUCATION</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <h3 className="font-bold text-black">{edu.degree} in {edu.field}</h3>
              <p className="text-black font-semibold">{edu.institution}</p>
              <p className="text-black italic">{formatDate(edu.endDate)}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-black mb-4 text-center border-b-2 border-black pb-2">SKILLS</h2>
          {skills.map((skillCategory) => (
            <div key={skillCategory.id} className="mb-3 text-center">
              <span className="font-bold text-black">{skillCategory.category}: </span>
              <span className="text-black">{skillCategory.items.join(' • ')}</span>
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-black mb-4 text-center border-b-2 border-black pb-2">REFERENCES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {references.map((ref) => (
              <div key={ref.id} className="text-center border border-black p-3">
                <h3 className="font-bold text-black">{ref.name}</h3>
                <p className="text-black">{ref.position}</p>
                <p className="text-black">{ref.company}</p>
                <p className="text-black text-xs">{ref.email}</p>
                <p className="text-black text-xs">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
