import axios from 'axios';

// API configuration - updated to ensure proper exports
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

// Add request interceptor for debugging and auth
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url, error.response?.data);
    return Promise.reject(error);
  }
);

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

// Professional API Types following Test_save_prediction.ipynb workflow
export interface ProfessionalSegmentationPrediction {
  customer_id: string;
  predicted_cluster: number;
  cluster_description: string;
  confidence: number;
  features_used: string[];
  model_version: string;
}

export interface ProfessionalRetentionPrediction {
  customer_id: string;
  predicted_retention: number;
  retention_status: string;
  confidence: number;
  features_used: string[];
  model_version: string;
}

export interface TopProductsByCluster {
  [clusterName: string]: Array<{
    Product: string;
    Count: number;
  }>;
}

export interface TopProductsByRetentionClass {
  [retentionClass: string]: Array<{
    Product: string;
    Count: number;
  }>;
}

export interface ProfessionalSegmentationResponse {
  predictions: ProfessionalSegmentationPrediction[];
  summary: {
    total_customers: number;
    clusters_found: number;
    cluster_distribution: Record<string, number>;
    features_used: string[];
    model_type: string;
  };
  top_products_by_cluster: TopProductsByCluster;
  model_metrics: {
    accuracy: number;
    status: string;
    last_prediction: string;
  };
  workflow: string;
}

export interface ProfessionalRetentionResponse {
  predictions: ProfessionalRetentionPrediction[];
  summary: {
    total_customers: number;
    retention_distribution: Record<string, number>;
    retention_rate: number;
    features_used: string[];
    model_type: string;
  };
  top_products_by_retention_class: TopProductsByRetentionClass;
  model_metrics: {
    accuracy: number;
    status: string;
    last_prediction: string;
  };
  workflow: string;
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

  // Professional ML Endpoints following Test_save_prediction.ipynb workflow
  
  // Professional Customer Segmentation
  async getProfessionalSegmentation(
    customerIds?: string[],
    batchSize: number = 100
  ): Promise<ProfessionalSegmentationResponse> {
    try {
      const response = await apiClient.post('/api/ml/customer-segmentation', {
        customer_ids: customerIds,
        batch_size: batchSize,
      });
      console.log('Segmentation API response:', response.data);
      
      // Extract data from ResponseModel wrapper
      if (response.data && response.data.data) {
        return response.data.data;
      }
      
      // If response.data itself is the data, return it
      return response.data;
    } catch (error) {
      console.error('Error fetching professional segmentation:', error);
      throw error;
    }
  }

  // Professional Customer Retention
  async getProfessionalRetention(
    customerIds?: string[],
    batchSize: number = 100
  ): Promise<ProfessionalRetentionResponse> {
    try {
      const response = await apiClient.post('/api/ml/customer-retention', {
        customer_ids: customerIds,
        batch_size: batchSize,
      });
      console.log('Retention API response:', response.data);
      
      // Extract data from ResponseModel wrapper
      if (response.data && response.data.data) {
        return response.data.data;
      }
      
      // If response.data itself is the data, return it
      return response.data;
    } catch (error) {
      console.error('Error fetching professional retention:', error);
      throw error;
    }
  }

  // Legacy segmentation endpoint
  async getSegmentationPredictions(
    customerIds?: string[],
    batchSize: number = 100
  ) {
    const response = await apiClient.post('/api/predictions/segmentation', {
      customer_ids: customerIds,
      batch_size: batchSize,
    });
    return response.data.data;
  }

  // Legacy retention endpoint
  async getRetentionPredictions(
    customerIds?: string[],
    batchSize: number = 100
  ) {
    const response = await apiClient.post('/api/predictions/retention', {
      customer_ids: customerIds,
      batch_size: batchSize,
    });
    return response.data.data;
  }

  // Dynamic Insights Generation
  async generateDynamicInsights(
    customerIds?: string[],
    batchSize: number = 100,
    dynamicClusters: boolean = true
  ) {
    const response = await apiClient.post('/api/insights/dynamic', {
      customer_ids: customerIds,
      batch_size: batchSize,
      dynamic_clusters: dynamicClusters,
    });
    return response.data.data;
  }

  // Get customer data (for analytics)
  async getCustomerData(limit: number = 1000): Promise<CustomerData[]> {
    try {
      const response = await apiClient.get(`/api/customers?page_size=${limit}`);
      return response.data.data.map((customer: any) => ({
        customer_id: customer.customer_id,
        name: customer.name,
        email: customer.email,
        age: customer.age,
        income: customer.income,
        location: customer.location,
        purchase_history: customer.purchase_history,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      }));
    } catch (error) {
      console.error('Error fetching customer data:', error);
      // Fallback to mock data if API fails
      return this.getMockCustomerData(limit);
    }
  }

  // Get customers by cluster
  async getCustomersByCluster(clusterName: string, limit: number = 1000): Promise<CustomerData[]> {
    try {
      const response = await apiClient.get(`/api/customers/by-cluster?cluster_name=${encodeURIComponent(clusterName)}&page_size=${limit}`);
      return response.data.data.map((customer: any) => ({
        customer_id: customer.customer_id,
        name: customer.name,
        email: customer.email,
        age: customer.age,
        income: customer.income,
        location: customer.location,
        gender: customer.gender,
        recency: customer.recency,
        avg_order_value: customer.avg_order_value,
        customer_lifetime_days: customer.customer_lifetime_days,
        purchase_rate: customer.purchase_rate,
        total_items_sold: customer.total_items_sold,
        product_purchased: customer.product_purchased,
        purchase_history: customer.purchase_history,
        created_at: customer.created_at,
        updated_at: customer.updated_at,
      }));
    } catch (error) {
      console.error('Error fetching customers by cluster:', error);
      // Fallback to mock data if API fails
      return this.getMockCustomerData(limit);
    }
  }

  // Mock customer data fallback
  private getMockCustomerData(limit: number): CustomerData[] {
    const mockCustomers: CustomerData[] = [];
    for (let i = 1; i <= Math.min(limit, 100); i++) {
      mockCustomers.push({
        customer_id: `CUS_TEST_${i.toString().padStart(4, '0')}`,
        name: `Customer ${i}`,
        email: `customer${i}@afrimash.com`,
        age: Math.floor(Math.random() * 40) + 25,
        income: Math.floor(Math.random() * 50000) + 30000,
        location: ['North', 'South', 'East', 'West', 'Central'][Math.floor(Math.random() * 5)],
        purchase_history: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    return mockCustomers;
  }
}

// Authentication helper functions
export async function login(email: string, password: string) {
  try {
    const response = await apiClient.post('/api/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(email: string, password: string, firstName: string, lastName: string) {
  try {
    const response = await apiClient.post('/api/auth/register', {
      email,
      password,
      firstName,
      lastName
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
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