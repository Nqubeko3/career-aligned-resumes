
import { toast } from "sonner";

export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface APIResponse<T> {
  data: T;
  status: number;
  message?: string;
  errors?: string[];
}

export enum APIErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR'
}

export class APIError extends Error {
  constructor(
    public type: APIErrorType,
    public message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export abstract class BaseAPIService {
  protected abstract baseURL: string;
  protected abstract serviceName: string;

  protected async request<T>(config: RequestConfig): Promise<APIResponse<T>> {
    const startTime = Date.now();
    
    try {
      const url = `${this.baseURL}${config.path}`;
      const options: RequestInit = {
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
        signal: AbortSignal.timeout(config.timeout || 30000),
      };

      if (config.data && config.method !== 'GET') {
        options.body = JSON.stringify(config.data);
      }

      const response = await fetch(url, options);
      const responseData = await response.json();

      if (!response.ok) {
        throw this.createAPIError(response.status, responseData);
      }

      const duration = Date.now() - startTime;
      this.logRequest(config.path, duration);

      return {
        data: responseData,
        status: response.status,
        message: 'Success'
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logError(error, config, duration);
      throw error;
    }
  }

  protected createAPIError(status: number, responseData: any): APIError {
    let errorType: APIErrorType;
    let message: string;

    switch (status) {
      case 401:
        errorType = APIErrorType.AUTHENTICATION_ERROR;
        message = 'Authentication failed';
        break;
      case 403:
        errorType = APIErrorType.AUTHORIZATION_ERROR;
        message = 'Access denied';
        break;
      case 429:
        errorType = APIErrorType.RATE_LIMIT_ERROR;
        message = 'Rate limit exceeded';
        break;
      case 500:
      case 502:
      case 503:
        errorType = APIErrorType.SERVER_ERROR;
        message = 'Server error occurred';
        break;
      default:
        errorType = APIErrorType.VALIDATION_ERROR;
        message = responseData.message || 'Request failed';
    }

    return new APIError(errorType, message, status, responseData);
  }

  protected async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    backoffMs: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxRetries) break;
        if (!this.isRetryableError(error)) break;
        
        const delay = backoffMs * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  private isRetryableError(error: any): boolean {
    if (error instanceof APIError) {
      return error.type === APIErrorType.NETWORK_ERROR || 
             error.type === APIErrorType.SERVER_ERROR ||
             (error.statusCode && error.statusCode >= 500);
    }
    return false;
  }

  private logRequest(path: string, duration: number): void {
    console.log(`[${this.serviceName}] ${path} - ${duration}ms`);
  }

  private logError(error: any, config: RequestConfig, duration: number): void {
    console.error(`[${this.serviceName}] Error in ${config.path}:`, {
      error: error.message,
      duration,
      config
    });

    if (error instanceof APIError) {
      toast.error(`${this.serviceName}: ${error.message}`);
    } else {
      toast.error(`${this.serviceName}: Request failed`);
    }
  }

  protected handleError(error: APIError): void {
    console.error(`[${this.serviceName}] API Error:`, error);
    
    // Global error handling logic
    switch (error.type) {
      case APIErrorType.AUTHENTICATION_ERROR:
        // Redirect to login or refresh token
        break;
      case APIErrorType.RATE_LIMIT_ERROR:
        toast.error('Too many requests. Please try again later.');
        break;
      default:
        toast.error(error.message);
    }
  }
}
