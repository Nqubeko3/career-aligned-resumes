
import { BaseAPIService, RequestConfig, APIResponse } from './BaseAPIService';

interface ResumeAnalysisResult {
  score: number;
  suggestions: string[];
  keywords: string[];
  improvements: {
    category: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

interface ResumeData {
  content: string;
  jobDescription?: string;
}

export class ResumeAnalysisService extends BaseAPIService {
  protected baseURL = 'https://api.example.com/v1';
  protected serviceName = 'ResumeAnalysis';

  async analyzeResume(resumeData: ResumeData): Promise<ResumeAnalysisResult> {
    const config: RequestConfig = {
      method: 'POST',
      path: '/analyze',
      data: resumeData,
      headers: {
        'Authorization': `Bearer ${this.getAPIKey()}`
      }
    };

    const response = await this.withRetry(() => this.request<ResumeAnalysisResult>(config));
    return response.data;
  }

  async getResumeScore(resumeId: string): Promise<number> {
    const config: RequestConfig = {
      method: 'GET',
      path: `/resume/${resumeId}/score`,
      headers: {
        'Authorization': `Bearer ${this.getAPIKey()}`
      }
    };

    const response = await this.request<{ score: number }>(config);
    return response.data.score;
  }

  private getAPIKey(): string {
    // In production, this should come from Supabase secrets
    const apiKey = process.env.VITE_RESUME_ANALYSIS_API_KEY;
    if (!apiKey) {
      throw new Error('Resume Analysis API key not configured');
    }
    return apiKey;
  }
}

// Usage example with React Query
export const useResumeAnalysis = () => {
  const service = new ResumeAnalysisService();

  return {
    analyzeResume: (resumeData: ResumeData) => 
      service.analyzeResume(resumeData),
    getScore: (resumeId: string) => 
      service.getResumeScore(resumeId)
  };
};
