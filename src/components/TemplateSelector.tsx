
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const templates = [
  // Professional Templates
  {
    id: 'professional-classic',
    name: 'Classic Professional',
    category: 'Professional',
    description: 'Clean, traditional layout perfect for corporate environments',
    preview: 'bg-white border-2 border-gray-300'
  },
  {
    id: 'professional-executive',
    name: 'Executive',
    category: 'Professional',
    description: 'Sophisticated design for senior leadership positions',
    preview: 'bg-gray-50 border-2 border-gray-400'
  },
  {
    id: 'professional-corporate',
    name: 'Corporate',
    category: 'Professional',
    description: 'Business-focused template with emphasis on achievements',
    preview: 'bg-blue-50 border-2 border-blue-300'
  },
  {
    id: 'professional-minimal',
    name: 'Minimal Professional',
    category: 'Professional',
    description: 'Simple, elegant design that highlights content',
    preview: 'bg-gray-100 border-2 border-gray-300'
  },
  {
    id: 'professional-traditional',
    name: 'Traditional',
    category: 'Professional',
    description: 'Time-tested format favored by traditional industries',
    preview: 'bg-white border-2 border-black'
  },
  {
    id: 'professional-academic',
    name: 'Academic',
    category: 'Professional',
    description: 'Structured format ideal for research and academic positions',
    preview: 'bg-blue-25 border-2 border-blue-200'
  },
  {
    id: 'professional-modern',
    name: 'Modern Professional',
    category: 'Professional',
    description: 'Contemporary sidebar layout with clean sections',
    preview: 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-400'
  },
  // Modern Templates
  {
    id: 'modern-creative',
    name: 'Creative Modern',
    category: 'Modern',
    description: 'Innovative design for creative professionals',
    preview: 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300'
  },
  {
    id: 'modern-tech',
    name: 'Tech Forward',
    category: 'Modern',
    description: 'Dark theme perfect for tech and development roles',
    preview: 'bg-gradient-to-br from-gray-800 to-blue-900 border-2 border-cyan-400'
  },
  {
    id: 'modern-designer',
    name: 'Designer Portfolio',
    category: 'Modern',
    description: 'Visual-first approach for design professionals',
    preview: 'bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300'
  },
  {
    id: 'modern-minimalist',
    name: 'Ultra Minimalist',
    category: 'Modern',
    description: 'Clean, spacious design with maximum white space',
    preview: 'bg-white border border-gray-200'
  }
];

export const TemplateSelector = ({ selectedTemplate, onSelectTemplate, onNext, onPrev }: TemplateSelectorProps) => {
  const professionalTemplates = templates.filter(t => t.category === 'Professional');
  const modernTemplates = templates.filter(t => t.category === 'Modern');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
        <p className="text-lg text-gray-600">Select from our collection of ATS-optimized templates designed for different industries</p>
      </div>

      {/* Professional Templates */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Professional Templates</h3>
          <Badge variant="secondary">ATS-Optimized</Badge>
          <Badge variant="outline">{professionalTemplates.length} Options</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {professionalTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                selectedTemplate === template.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className={`w-full h-40 rounded-lg mb-3 ${template.preview} flex items-center justify-center relative overflow-hidden`}>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="text-center p-3 w-full">
                    <div className="w-full h-2 bg-gray-300 rounded mb-2"></div>
                    <div className="w-3/4 h-1.5 bg-gray-200 rounded mb-1 mx-auto"></div>
                    <div className="w-2/3 h-1.5 bg-gray-200 rounded mb-2 mx-auto"></div>
                    <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                    <div className="w-5/6 h-1 bg-gray-200 rounded mx-auto"></div>
                  </div>
                </div>
                <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                <p className="text-gray-600 text-xs">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modern Templates */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-6">
          <h3 className="text-2xl font-semibold text-gray-800">Modern Templates</h3>
          <Badge variant="outline">Creative Industries</Badge>
          <Badge variant="outline">{modernTemplates.length} Options</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modernTemplates.map((template) => (
            <Card 
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                selectedTemplate === template.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className={`w-full h-40 rounded-lg mb-3 ${template.preview} flex items-center justify-center relative overflow-hidden`}>
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  <div className="text-center p-3 w-full">
                    <div className="w-full h-2 bg-white bg-opacity-60 rounded mb-2"></div>
                    <div className="w-3/4 h-1.5 bg-white bg-opacity-50 rounded mb-1 mx-auto"></div>
                    <div className="w-2/3 h-1.5 bg-white bg-opacity-50 rounded mb-2 mx-auto"></div>
                    <div className="w-full h-1 bg-white bg-opacity-40 rounded mb-1"></div>
                    <div className="w-5/6 h-1 bg-white bg-opacity-40 rounded mx-auto"></div>
                  </div>
                </div>
                <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                <p className="text-gray-600 text-xs">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} size="lg">
          Back to Form
        </Button>
        <Button onClick={onNext} size="lg" className="px-8">
          Preview Resume
        </Button>
      </div>
    </div>
  );
};
