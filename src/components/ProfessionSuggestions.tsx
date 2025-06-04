
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface ProfessionSuggestionsProps {
  profession: string;
  onSuggestionClick: (suggestion: string) => void;
}

const professionSuggestions = {
  'software-engineer': [
    "Experienced software engineer with 5+ years developing scalable web applications using modern technologies. Proven track record of delivering high-quality code, optimizing system performance, and collaborating effectively in agile environments.",
    "Full-stack software engineer specializing in React, Node.js, and cloud technologies. Passionate about building user-centric applications with clean, maintainable code and strong focus on performance optimization.",
    "Results-driven software engineer with expertise in microservices architecture, containerization, and CI/CD pipelines. Committed to writing efficient, testable code and mentoring junior developers."
  ],
  'data-scientist': [
    "Data scientist with 4+ years of experience in machine learning, statistical analysis, and data visualization. Skilled in Python, R, and SQL with a track record of delivering actionable insights that drive business decisions.",
    "Experienced data scientist specializing in predictive modeling, deep learning, and big data analytics. Proven ability to translate complex data into clear business recommendations and implement scalable ML solutions.",
    "Results-oriented data scientist with expertise in NLP, computer vision, and time series analysis. Strong background in statistics and programming with experience deploying ML models in production environments."
  ],
  'product-manager': [
    "Strategic product manager with 5+ years driving product vision and roadmap execution. Proven track record of launching successful products, conducting market research, and collaborating cross-functionally to deliver user-centered solutions.",
    "Data-driven product manager with expertise in agile methodologies, user research, and product analytics. Skilled at identifying market opportunities and translating them into innovative product features that drive growth.",
    "Customer-focused product manager experienced in B2B and B2C products. Strong analytical skills with proven ability to prioritize features, manage stakeholder expectations, and lead products from conception to launch."
  ],
  'marketing-manager': [
    "Creative marketing manager with 4+ years developing and executing integrated marketing campaigns. Proven track record of increasing brand awareness, generating qualified leads, and driving revenue growth across digital channels.",
    "Digital marketing manager specializing in content strategy, social media, and performance marketing. Data-driven approach with expertise in SEO, PPC, and marketing automation platforms.",
    "Strategic marketing manager with experience in brand positioning, campaign development, and market analysis. Skilled at building cross-functional relationships and delivering measurable results that exceed targets."
  ],
  'sales-manager': [
    "Results-driven sales manager with 6+ years leading high-performing teams to exceed revenue targets. Proven expertise in consultative selling, relationship building, and developing strategic sales processes.",
    "Dynamic sales manager with track record of growing territories by 40%+ annually. Strong background in B2B sales, pipeline management, and coaching sales representatives to achieve peak performance.",
    "Customer-focused sales manager experienced in solution selling and account management. Skilled at identifying opportunities, negotiating contracts, and building long-term client relationships."
  ],
  'financial-analyst': [
    "Detail-oriented financial analyst with 3+ years of experience in financial modeling, budgeting, and variance analysis. Strong analytical skills with proven ability to provide insights that support strategic decision-making.",
    "CPA-certified financial analyst specializing in investment analysis, risk assessment, and performance reporting. Proficient in advanced Excel, SQL, and financial planning software.",
    "Results-driven financial analyst with expertise in corporate finance, financial reporting, and business intelligence. Strong communication skills with experience presenting complex financial data to stakeholders."
  ],
  'graphic-designer': [
    "Creative graphic designer with 5+ years creating compelling visual content for digital and print media. Expertise in Adobe Creative Suite, brand development, and translating client concepts into effective design solutions.",
    "Versatile graphic designer specializing in web design, marketing materials, and brand identity. Strong understanding of design principles, typography, and color theory with focus on user experience.",
    "Innovative graphic designer with experience in packaging design, advertising campaigns, and digital illustrations. Collaborative approach with ability to manage multiple projects while meeting tight deadlines."
  ],
  'project-manager': [
    "Certified PMP project manager with 6+ years successfully delivering complex projects on time and within budget. Expertise in agile and waterfall methodologies, risk management, and stakeholder communication.",
    "Strategic project manager with proven track record of leading cross-functional teams and driving process improvements. Strong analytical skills with experience in project portfolio management and resource optimization.",
    "Results-oriented project manager specializing in technology implementations and organizational change management. Skilled at facilitating collaboration and ensuring project objectives align with business goals."
  ],
  'hr-manager': [
    "Strategic HR manager with 7+ years developing talent acquisition, employee engagement, and performance management programs. Proven track record of reducing turnover and implementing HR best practices.",
    "People-focused HR manager with expertise in organizational development, training programs, and employee relations. Strong communication skills with experience supporting company culture and change initiatives.",
    "Compliance-oriented HR manager with deep knowledge of employment law, benefits administration, and HRIS systems. Skilled at developing policies and procedures that support both employees and business objectives."
  ],
  'business-analyst': [
    "Analytical business analyst with 4+ years translating business requirements into technical solutions. Expertise in process mapping, data analysis, and stakeholder management with strong problem-solving skills.",
    "Detail-oriented business analyst specializing in systems analysis, requirements gathering, and process improvement. Proven ability to bridge communication between business users and technical teams.",
    "Strategic business analyst with experience in project management, data visualization, and change management. Strong analytical mindset with focus on delivering solutions that drive operational efficiency."
  ]
};

export const ProfessionSuggestions = ({ profession, onSuggestionClick }: ProfessionSuggestionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const suggestions = professionSuggestions[profession as keyof typeof professionSuggestions] || [];

  if (suggestions.length === 0) return null;

  return (
    <Card className="mt-4 p-4 bg-blue-50 border-blue-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-800">AI-Powered Summary Suggestions</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-3">
          <p className="text-sm text-blue-700 mb-3">
            Click on any suggestion below to use it as your professional summary:
          </p>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 bg-white border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => onSuggestionClick(suggestion)}
            >
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
