import axios from 'axios';

// API configuration
export const API_BASE_URL = 'http://localhost:8000';
const API_KEY = 'agrox-api-key-2024'; // Default API key

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Types for API responses
export interface CustomerData {
  customer_id: string;
  name: string;
  email: string;
  age?: number;
  income?: number;
  location?: string;
  purchase_history: any[];
  created_at: string;
  updated_at: string;
}

export interface ModelTraining {
  training_id: string;
  model_name: string;
  model_type: 'clustering' | 'classification' | 'regression';
  status: 'training' | 'completed' | 'failed';
  accuracy?: number;
  created_at: string;
  completed_at?: string;
}

export interface Prediction {
  prediction_id: string;
  customer_id: string;
  model_id: string;
  prediction_type: string;
  prediction_value: any;
  confidence?: number;
  features_used: string[];
  created_at: string;
}

export interface DataUploadResponse {
  upload_id: string;
  filename: string;
  status: string;
  message: string;
  records_processed?: number;
}

export interface ModelTrainingResponse {
  training_id: string;
  model_name: string;
  model_type: string;
  status: string;
  message: string;
}

export interface PredictionResponse {
  predictions: Prediction[];
  total_count: number;
  model_info?: {
    model_id: string;
    model_name: string;
  };
}

export interface ExportResponse {
  download_url: string;
  filename: string;
  file_size: number;
  expires_at: string;
}

// API service class
export class AgroXApiService {
  // Health check
  async healthCheck() {
    const response = await apiClient.get('/health');
    return response.data;
  }

  // Upload CSV data
  async uploadData(file: File): Promise<DataUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/api/upload-data', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Train ML model
  async trainModel(
    modelName: string,
    modelType: 'clustering' | 'classification' | 'regression',
    parameters?: Record<string, any>
  ): Promise<ModelTrainingResponse> {
    const response = await apiClient.post('/api/train-model', {
      model_name: modelName,
      model_type: modelType,
      parameters: parameters || {},
    });
    return response.data;
  }

  // Get predictions
  async getPredictions(
    customerIds?: string[],
    modelId?: string,
    modelName?: string,
    limit: number = 100
  ): Promise<PredictionResponse> {
    const params = new URLSearchParams();
    
    if (customerIds) {
      customerIds.forEach(id => params.append('customer_ids', id));
    }
    if (modelId) params.append('model_id', modelId);
    if (modelName) params.append('model_name', modelName);
    params.append('limit', limit.toString());

    const response = await apiClient.get(`/api/get-predictions?${params}`);
    return response.data;
  }

  // Generate predictions
  async generatePredictions(modelId: string) {
    const response = await apiClient.post(`/api/generate-predictions/${modelId}`);
    return response.data;
  }

  // Export predictions to CSV
  async exportPredictions(
    predictionIds?: string[],
    modelId?: string,
    dateFrom?: string,
    dateTo?: string
  ): Promise<ExportResponse> {
    const response = await apiClient.post('/api/export-csv', {
      prediction_ids: predictionIds,
      model_id: modelId,
      date_from: dateFrom,
      date_to: dateTo,
    });
    return response.data;
  }

  // Download exported file
  async downloadFile(filename: string): Promise<Blob> {
    const response = await apiClient.get(`/api/download/${filename}`, {
      responseType: 'blob',
    });
    return response.data;
  }

  // List trained models
  async listModels() {
    const response = await apiClient.get('/api/models');
    return response.data;
  }

  // Get customer data (for analytics)
  async getCustomerData(limit: number = 1000): Promise<CustomerData[]> {
    // This would need to be implemented in the backend
    // For now, we'll use predictions data
    const predictions = await this.getPredictions(undefined, undefined, undefined, limit);
    return predictions.predictions.map(pred => ({
      customer_id: pred.customer_id,
      name: `Customer ${pred.customer_id}`,
      email: `${pred.customer_id}@example.com`,
      age: Math.floor(Math.random() * 40) + 25,
      income: Math.floor(Math.random() * 50000) + 30000,
      location: ['New York', 'California', 'Texas', 'Florida'][Math.floor(Math.random() * 4)],
      purchase_history: [],
      created_at: pred.created_at,
      updated_at: pred.created_at,
    }));
  }
}

// Create singleton instance
export const apiService = new AgroXApiService();

// Error handling utility
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.detail || error.response.data?.error || 'Server error',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error - please check your connection',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'Unknown error occurred',
      status: -1,
    };
  }
};
