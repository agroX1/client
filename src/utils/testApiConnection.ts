import { apiService } from '../services/api';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    // Test health check
    const health = await apiService.healthCheck();
    console.log('✅ Health check passed:', health);
    
    // Test professional segmentation
    console.log('Testing professional segmentation...');
    const segmentation = await apiService.getProfessionalSegmentation();
    console.log('✅ Segmentation data loaded:', {
      totalCustomers: segmentation.summary.total_customers,
      clustersFound: segmentation.summary.clusters_found,
      modelAccuracy: segmentation.model_metrics.accuracy
    });
    
    // Test professional retention
    console.log('Testing professional retention...');
    const retention = await apiService.getProfessionalRetention();
    console.log('✅ Retention data loaded:', {
      totalCustomers: retention.summary.total_customers,
      retentionRate: retention.summary.retention_rate,
      modelAccuracy: retention.model_metrics.accuracy
    });
    
    return {
      success: true,
      message: 'All API endpoints working correctly',
      data: {
        segmentation,
        retention
      }
    };
  } catch (error) {
    console.error('❌ API connection failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
};

// Auto-test on module load (for development)
if (process.env.NODE_ENV === 'development') {
  testApiConnection().then(result => {
    if (result.success) {
      console.log('🎉 API connection test completed successfully!');
    } else {
      console.error('💥 API connection test failed:', result.message);
    }
  });
}
